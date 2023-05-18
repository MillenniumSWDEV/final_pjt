<template>
  <div>
    <h1>LogIn Page</h1>
    <form>
      <label for="username">ID : </label>
      <input id="username" type="text" /><br />

      <label for="password">비밀번호 : </label>
      <input id="password" type="password" /><br />

      <input type="submit" value="logIn" />
    </form>
  </div>
</template>

<script>
export default {
  name: "LogInView",
  data() {
    return {};
  },
  methods: {},
};
</script>
