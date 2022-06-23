<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-warp">
        <my-header @addTodo="addTodo"></my-header>
        <my-list :todos="todos"></my-list>
        <my-footer
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        ></my-footer>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  // 将 App 函数 addTodo 带回的值保存在 todos 数组中，再传给 MyList 组件，之后 MyList 可以再将数据传给子组件 Myitem
  // 数据在哪，方法就定义在哪，props接收的数据不能修改（违反原则）。要把该方法传递给 MyItem 组件，需要通过 MyList 逐层传递
  data() {
    return {
      // 动态读取 localStorage 里的数据，直接读取 todos 的值是 JSON 字符串，需要解析成对象
      // 判断初始是否为空
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },

  methods: {
    // 定义一个 addTodo 方法props传给子组件'Myheader'，子组件调用该函数时可以将值带回给 App 组件
    //   已被改写为自定义事件写法，通过 $emit(function, value) 触发，$off()解绑
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    // 勾选和取消勾选
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    // 删除一个 todo
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    // 全选和取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    // 清除所有已完成的 todo
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    // 更新 todo 内容
    updateTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title;
      });
    },
  },
  watch: {
    todos: {
      // 需要开启深度监视，否则无法保存事项是否已完成(todo.done)
      deep: true,
      handler(value) {
        // 利用本地存储（关闭浏览器不会丢失数据），value直接读取是对象，需要用 stringfy 解析成字符串
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  //   监视 Myitem 组件中是否调用了 checkTodo / deleteTodo，触发之后调用响应函数方法
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
  },
  //   销毁组件前，要解绑事件
  beforeDestroy() {
    this.$bus.off("deleteTodo");
    this.$bus.off("chekcTodo");
    this.$bus.off("updateTodo");
  },
};
</script>

<style lang="less">
body {
  background: #fff;

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 2555, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    &:focus {
      outline: none;
    }
  }
  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
    &:hover {
      background-color: #bd362f;
    }
  }
  .btn-edit {
    color: #fff;
    background-color: rgb(12, 145, 197);
    border: 1px solid rgb(58, 154, 192);
    margin-right: 5px;
    &:hover {
      background-color: rgb(26, 114, 148);
    }
  }
  .todo-container {
    width: 600px;
    margin: 0 auto;
    .todo-warp {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
}
</style>