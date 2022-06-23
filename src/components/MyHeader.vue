<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入待做任务，回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
// 使用到了 nanoid 来生成唯一 id,次选为 uuid
import { nanoid } from "nanoid";
export default {
  name: "MyHeader",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add() {
      // 校验数据
      if (!this.title.trim()) return null;
      //用户的输入包装为一个 todo 对象
      const todoObj = { id: nanoid(), title: this.title, done: false };
      this.$emit("addTodo", todoObj);
      this.title = "";
    },
  },
};
</script>

<style lang="less" scoped>
.todo-header {
  input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    &:focus {
      outline: none;
      border-color: rgba(80, 168, 236, 0.8);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(82, 168, 236, 0.6);
    }
  }
}
</style>