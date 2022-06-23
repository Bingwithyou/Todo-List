<template>
  <!-- 
    1，v-show隐藏则是为该元素添加css--display:none，v-show只是简单的基于css切换
    2，v-if显示隐藏是将dom元素整个添加或删除，v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件； 
     
    当没有代做事项时，隐藏 footer
  -->
  <div class="todo-footer" v-show="total">
    <label>
      <!-- 利用  v-model 省略了 methods 里的 checkAll 方法 -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}</span
    >
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    total() {
      return this.todos.length;
    },
    doneTotal() {
      // 1，利用数组的 reduce() 函数，接收两个值分别为'previousValue'和'currentValue'，以及一个初始值
      // 2，语法：reduce((previousValue, currentValue) => (previousValue + currentValue, initialValue)
      // 3，里边的箭头函数会执行‘数组的长度’次，并将最新的 previousValue 值作为下一次循环使用

      // 注：若不指定初始值，则将数组 index 0 的值作为初始值，循环从 index 1 开始

      // 首先初始值 0 作为 previousValue 值开始循环，currentValue代表当前遍历的元素
      // 判断 done 若为真，则 previousValue + 1，最后返回 previousValue 值（遍历时传递的）
      return this.todos.reduce(
        (previousValue, currentValue) =>
          previousValue + (currentValue.done ? 1 : 0),
        0
      );
    },

    // isAll 函数利用到了上边 total 和 doneTotal 两个计算属性
    // 1，首先利用 get 返回的值，自动调用 set 函数
    isAll: {
      get() {
        return this.doneTotal === this.total && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value); 下边用自定义事件改写
        this.$emit("checkAllTodo", value);
      },
    },
  },
  methods: {
    //   checkAll() {
    //     return this.checkAllTodo(event.target.checked);
    //   },
    clearAll() {
      //   this.clearAllTodo();
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style lang="less" scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
  label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    input {
      position: relative;
      top: -1px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  button {
    float: right;
    margin-top: 5px;
  }
}
</style>W