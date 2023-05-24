<template>
  <div
    class="SignupView"
    style="height: 90vh; display: flex; align-items: center"
  >
    <SignUp />
  </div>
</template>

<script>
import SignUp from "@/components/Accounts/Signup.vue";

export default {
  name: "SignupView",
  components: { SignUp },
};
</script>

<style></style>
