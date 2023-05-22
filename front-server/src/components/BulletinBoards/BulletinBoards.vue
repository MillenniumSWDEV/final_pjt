<template>
  <div>
    <h1>Board Page</h1>
    <router-link :to="{ name: 'CreateView' }">[CREATE]</router-link>
    <BoardList />
    <hr />
  </div>
</template>

<script>
import BoardList from "./BoardList.vue";

export default {
  name: "BulletinBoards",
  components: {
    BoardList,
  },
  computed: {},

};
</script>

<style></style>
