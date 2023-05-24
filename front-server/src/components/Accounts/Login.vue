<template>
  <div
    id="LoginView"
    style="
      width: 400px;
      height: 460px;
      background-color: #fff;
      border-radius: 20px;
      padding-left: 20px;
      padding-right: 20px;
      box-shadow: 2px 2px 20px 3px #f6f1f1;
      align-items: center;
    "
    class="container d-flex flex-column"
  >
    <h1 style="font-weight: 900" class="text-center mt-5 mb-4">로그인</h1>
    <b-form-group
      id="fieldset-1"
      label="ID"
      label-for="username"
      valid-feedback="올바른 아이디 형식입니다"
      :invalid-feedback="usernameInvalidFeedback"
      :state="usernameState"
      @submit.prevent="login"
    >
      <b-form-input
        id="username"
        v-model="username"
        type="text"
        :state="usernameState"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-2"
      label="PASSWORD"
      label-for="password"
      valid-feedback="올바른 패스워드 형식입니다"
      :invalid-feedback="passwordInvalidFeedback"
      :state="passwordState"
      @submit.prevent="login"
    >
      <b-form-input
        id="password"
        v-model="password"
        type="password"
        :state="passwordState"
        trim
      ></b-form-input>
    </b-form-group>
    <b-button
      :disabled="buttonActiveState"
      variant="success"
      type="submit"
      class="mt-4"
      style="width: 245px"
      @click="login()"
    >
      로그인
    </b-button>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin; //로그인 여부
    },
    usernameState() {
      return this.username.length >= 4;
    },
    usernameInvalidFeedback() {
      if (this.username.length > 0) {
        return "아이디는 최소 4글자 이상입니다";
      }
      return "아이디를 입력해주세요";
    },
    passwordState() {
      return this.password.length >= 8;
    },
    passwordInvalidFeedback() {
      if (this.password.length > 0) {
        return "패스워드는 최소 8글자 이상입니다";
      }
      return "패스워드를 입력해주세요";
    },
    buttonActiveState() {
      if (this.username.length >= 4 && this.password.length >= 8) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    if (this.isLogin) {
      alert("로그아웃해주세요");
      this.$router.push({ name: "ArticleView" }); // 로그인 페이지로 이동..
    } else {
    }
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;

      const payload = {
        username,
        password,
      };

      this.$store.dispatch("login", payload);
    },
  },
};
</script>
