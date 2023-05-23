<template>
  <div id="BulletinBoards" class="container">
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
