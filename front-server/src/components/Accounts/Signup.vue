<template>
  <div
    id="SignUp"
    style="
      width: 400px;
      height: 800px;
      background-color: #fff;
      border-radius: 20px;
      padding-left: 20px;
      padding-right: 20px;
      box-shadow: 2px 2px 20px 3px #f6f1f1;
      align-items: center;
    "
    class="container d-flex flex-column"
  >
    <h1 style="font-weight: 900" class="text-center mt-5 mb-4">회원가입</h1>

    <b-form-group
      id="fieldset-1"
      label="ID"
      label-for="username"
      valid-feedback="올바른 아이디 형식입니다"
      :invalid-feedback="usernameInvalidFeedback"
      :state="usernameState"
      @submit.prevent="signUp"
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
      label="EMAIL"
      label-for="email"
      valid-feedback="올바른 이메일 형식입니다"
      :invalid-feedback="emailInvalidFeedback"
      :state="emailState"
      @submit.prevent="signUp"
    >
      <b-form-input
        id="email"
        v-model="email"
        type="email"
        :state="emailState"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-2"
      label="NICKNAME"
      label-for="nickname"
      valid-feedback="올바른 닉네임 형식입니다"
      :invalid-feedback="nicknameInvalidFeedback"
      :state="nicknameState"
      @submit.prevent="signUp"
    >
      <b-form-input
        id="nickname"
        v-model="nickname"
        type="text"
        :state="nicknameState"
        trim
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-2"
      label="PASSWORD"
      label-for="password1"
      valid-feedback="올바른 패스워드 형식입니다"
      :invalid-feedback="passwordInvalidFeedback"
      :state="passwordState"
      @submit.prevent="signUp"
    >
      <b-form-input
        id="password1"
        v-model="password1"
        :state="passwordState"
        type="password"
        trim
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="fieldset-2"
      label="PASSWORD CONFIRMATION"
      label-for="password2"
      valid-feedback="패스워드가 일치합니다"
      :invalid-feedback="passwordConfirmInvalidFeedback"
      :state="passwordConfirmState"
      @submit.prevent="signUp"
    >
      <b-form-input
        id="password2"
        v-model="password2"
        type="password"
        :state="passwordConfirmState"
        trim
      ></b-form-input>
    </b-form-group>

    <br />

    <b-button
      :disabled="buttonActiveState"
      variant="success"
      type="submit"
      class="mt-4"
      style="width: 245px"
      @click="signUp()"
    >
      회원가입
    </b-button>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      email: "",
      nickname: "",
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
      return this.password1.length >= 8;
    },
    passwordInvalidFeedback() {
      if (this.password1.length > 0) {
        return "패스워드는 최소 8글자 이상입니다";
      }
      return "패스워드를 입력해주세요";
    },
    passwordConfirmState() {
      return this.password2 === "" ? false : this.password1 === this.password2;
    },
    passwordConfirmInvalidFeedback() {
      if (this.password1 !== this.password2) {
        return "패스워드와 일치하지 않습니다";
      }
      return "패스워드와 동일한 문자를 입력해주세요";
    },
    emailState() {
      return this.email.length >= 8;
    },
    emailInvalidFeedback() {
      if (this.email.length > 0) {
        return "이메일 형식에 맞춰주세요";
      }
      return "이메일을 입력해주세요";
    },
    nicknameState() {
      return this.nickname.length >= 2;
    },
    nicknameInvalidFeedback() {
      if (this.nickname.length > 0) {
        return "닉네임은 최소 2글자 이상입니다";
      }
      return "닉네임을 입력해주세요";
    },
    buttonActiveState() {
      if (
        this.username.length >= 4 &&
        this.password1 === this.password2 &&
        this.email.length >= 8 &&
        this.nickname.length >= 2
      ) {
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
    signUp() {
      const username = this.username;
      const password1 = this.password1;
      const password2 = this.password2;
      const email = this.email;
      const nickname = this.nickname;
      if (this.password1 !== this.password2) {
        alert("비밀번호와 확인이 틀립니다.");
      } else {
        const payload = {
          username,
          password1,
          password2,
          email,
          nickname,
        };
        this.$store.dispatch("signUp", payload);
      }
    },
  },
};
</script>
