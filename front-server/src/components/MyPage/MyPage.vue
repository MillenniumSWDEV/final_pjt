<template>
  <div id="MyPage" class="container w-50">
    <div
      class="container d-flex flex-column bg-white p-5 mt-3 w-100"
      style="border-radius: 20px"
    >
      <h3 style="font-weight: 900">Edit Profile</h3>
      <div class="line my-4"></div>
      <h5 class="mb-4">User Information</h5>
      <form
        class="d-flex flex-column justify-content-between ps-5"
        @submit.prevent="updateUser"
      >
        <div class="mb-3">
          <label for="username" style="padding-right: 16px">아이디 : </label>
          <input
            id="username"
            v-model.trim="username"
            class="updateInput"
            type="text"
          /><br />
        </div>
        <div class="mb-3">
          <label for="nickname" style="padding-right: 16px">닉네임 : </label>
          <input
            id="nickname"
            v-model.trim="nickname"
            class="updateInput"
            type="text"
          /><br />
        </div>
        <div class="mb-3">
          <label for="age" style="padding-right: 32px">나이 : </label>
          <input
            id="age"
            v-model.trim="age"
            class="updateInput"
            type="number"
          /><br />
        </div>
        <div class="mb-3">
          <label for="job" style="padding-right: 42px">직업 : </label>
          <select v-model.trim="job" name="job">
            <option value="학생">학생</option>
            <option value="직장인">직장인</option>
            <option value="전업주부">전업주부</option>
            <option value="무직">Music</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="monthly_expenses" style="padding-right: 16px"
            >월지출 :
          </label>
          <input
            id="monthly_expenses"
            v-model.trim="monthly_expenses"
            type="text"
            class="updateInput"
          /><br />
        </div>
        <div class="mb-3">
          <label for="salary">소득수준 : </label>
          <input
            id="salary"
            v-model.trim="salary"
            class="updateInput"
            type="text"
          /><br />
        </div>

        <div class="mb-3">
          <label for="financial_goal">금융목표 : </label>
          <input
            id="financial_goal"
            v-model.trim="financial_goal"
            type="text"
            class="updateInput"
          /><br />
        </div>
        <div class="mb-3">
          <label for="investment_experience">투자경험 : </label>
          <input
            id="investment_experience"
            v-model.trim="investment_experience"
            type="text"
            class="updateInput"
          /><br />
        </div>
        <div class="mb-3">
          <label for="saving_preference">투자성향 : </label>
          <input
            id="saving_preference"
            v-model.trim="saving_preference"
            type="text"
            class="updateInput"
          /><br />
        </div>
        <div class="mb-3">
          <label for="preferred_bank">선호은행 : </label>
          <input
            id="preferred_bank"
            v-model.trim="preferred_bank"
            type="text"
            class="updateInput"
          /><br />
        </div>
        <b-button class="mt-4" variant="outline-primary" @click="updateUser()"
          >수정하기</b-button
        >
        <!-- <form @submit.prevent="deleteUser">
          <input type="submit" value="탈퇴" />
        </form> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: this.$store.state.user.userData,
      username: this.$store.state.user.userData.username,
      nickname: this.$store.state.user.userData.nickname,
      age: this.$store.state.user.userData.age,
      job: this.$store.state.user.userData.job,
      monthly_expenses: this.$store.state.user.userData.monthly_expenses,
      preferred_bank: this.$store.state.user.userData.preferred_bank,
      saving_preference: this.$store.state.user.userData.saving_preference,
      investment_experience:
        this.$store.state.user.userData.investment_experience,
      asset_holdings: this.$store.state.user.userData.asset_holdings,
      financial_goal: this.$store.state.user.userData.financial_goal,
      salary: this.$store.state.user.userData.salary,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin; //로그인 여부
    },
  },
  created() {
    if (this.isLogin) {
      this.$store.dispatch("userDetail");
    } else {
      alert("로그인이 필요한 페이지입니다.");
      this.$router.push({ name: "LoginView" }); // 로그인 페이지로 이동..
    }
  },
  methods: {
    updateUser() {
      const nickname = this.nickname;
      const job = this.job;
      const age = this.age;
      const monthly_expenses = this.monthly_expenses;
      const preferred_bank = this.preferred_bank;
      const saving_preference = this.saving_preference;
      const investment_experience = this.investment_experience;
      const asset_holdings = this.asset_holdings;
      const financial_goal = this.financial_goal;
      const salary = this.salary;

      const payload = {
        nickname,
        job,
        age,
        monthly_expenses,
        preferred_bank,
        saving_preference,
        investment_experience,
        asset_holdings,
        financial_goal,
        salary,
      };
      this.$store.dispatch("updateUser", payload);
    },
    deleteUser() {
      this.$store.dispatch("deleteUser");
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 900;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #666;
  opacity: 60%;
}

.updateInput {
  width: 80%;
  height: 35px;
  font-size: 16px;
  padding-left: 20px;
  margin-left: 10px;
}
</style>
