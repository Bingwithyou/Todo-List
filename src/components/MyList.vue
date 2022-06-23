<template>
  <ul class="todo-main">
    <!-- 将 todo 对象传递给 MyItem -->
    <my-item
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
    ></my-item>
  </ul>
</template>

<script>
import MyItem from "./MyItem.vue";

export default {
  name: "MyList",
  components: { MyItem },
  // 传递的是':'后边的名字属性，例如 :todo="xxx"，接收时就要写todo
  props: ["todos"],
};
</script>

<style lang="less" scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}
.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>