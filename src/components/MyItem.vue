<template>
  <transition name="todo" appear>
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="handleCheck(todo.id)"
        />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          v-show="todo.isEdit"
          type="text"
          name="edit"
          :value="todo.title"
          @blur="confirmEdit(todo, $event)"
          ref="inputContent"
        />
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">
        删除
      </button>
      <button
        v-show="!todo.isEdit"
        class="btn btn-edit"
        @click="handleEdit(todo)"
      >
        编辑
      </button>
    </li>
  </transition>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todo"],
  methods: {
    // toggle 勾选
    handleCheck(id) {
      //通知 App 组件将对应的 todo 对象的 done 值取反。（App 组件遍历来找到对应 id 的元素）
      //   this.checkTodo(id);
      // $bus 改写：
      this.$bus.$emit("checkTodo", id);
    },
    // 删除事项
    handleDelete(id) {
      //   this.deleteTodo(id);
      this.$bus.$emit("deleteTodo", id);
    },
    handleEdit(todo) {
      // 给 todo 新建 isEdit 状态属性
      if ("isEdit" in todo) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      //   利用 $nextTick( callback ) 使输入框自动获取焦点，该方法在模板解析完后（DOM 更新结束）执行回调函数
      //   当改变数据后，要基于更新后的 DOM 进行某些操作时，要在 nextTick 所指定回调函数中执行

      this.$nextTick(function () {
        this.$refs.inputContent.focus();
      });
    },
    confirmEdit(todo, event) {
      todo.isEdit = false;
      //   如果为空，则删除该条事项
      if (!event.target.value.trim()) {
        this.$bus.$emit("deleteTodo", todo.id);
      } else {
        this.$bus.$emit("updateTodo", todo.id, event.target.value);
      }
    },
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  &:before {
    content: initial;
  }
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #ddd;
    button {
      display: block;
    }
  }
  label {
    float: left;
    cursor: pointer;
    li input {
      vertical-align: middle;
      margin-right: 6px;
      position: relative;
      top: -1px;
    }
  }
  button {
    float: right;
    display: none;
    margin-top: 3px;
  }
}
@keyframes todoLeaveAnimation {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}
.todo-leave-active {
  animation: todoLeaveAnimation 0.4s linear;
}
.todo-enter-active {
  animation: todoLeaveAnimation 0.3s linear reverse;
}
</style>
