<template>
  <div
    class="LoginView"
    style="height: 80vh; display: flex; align-items: center"
  >
    <Login />
  </div>
</template>

<script>
import Login from "@/components/Accounts/Login.vue";

export default {
  name: "LoginView",
  components: { Login },
};
</script>

<style></style>
