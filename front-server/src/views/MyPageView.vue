<template>
  <div>
    <form @submit.prevent="updateUser">
      <label for="username">ID : </label>
      <input id="username" v-model.trim="username" type="text" /><br />

      <label for="nickname">nickname : </label>
      <input id="nickname" v-model.trim="nickname" type="text" /><br />

      <label for="age">age : </label>
      <input id="age" v-model.trim="age" type="number" /><br />

      <label for="job">직업 : </label>
      <select v-model.trim="job" name="job">
        <option value="학생">학생</option>
        <option value="직장인">직장인</option>
        <option value="전업주부">전업주부</option>
        <option value="무직">Music</option>
        <option value="기타">기타</option>
      </select>

      <label for="salary">salary : </label>
      <input id="salary" v-model.trim="salary" type="text" /><br />

      <label for="monthly_expenses">monthly_expenses : </label>
      <input
        id="monthly_expenses"
        v-model.trim="monthly_expenses"
        type="text"
      /><br />

      <label for="financial_goal">financial_goal : </label>
      <input
        id="financial_goal"
        v-model.trim="financial_goal"
        type="text"
      /><br />

      <label for="investment_experience">investment_experience : </label>
      <input
        id="investment_experience"
        v-model.trim="investment_experience"
        type="text"
      /><br />

      <label for="saving_preference">saving_preference : </label>
      <input
        id="saving_preference"
        v-model.trim="saving_preference"
        type="text"
      /><br />

      <label for="preferred_bank">preferred_bank : </label>
      <input
        id="preferred_bank"
        v-model.trim="preferred_bank"
        type="text"
      /><br />

      <input type="submit" value="save" />
      <!-- <form @submit.prevent="deleteUser">
        <input type="submit" value="탈퇴" />
      </form> -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.userData.username,
      nickname: this.$store.state.userData.nickname,
      age: this.$store.state.userData.age,
      job: this.$store.state.userData.job,
      monthly_expenses: this.$store.state.userData.monthly_expenses,
      preferred_bank: this.$store.state.userData.preferred_bank,
      saving_preference: this.$store.state.userData.saving_preference,
      investment_experience: this.$store.state.userData.investment_experience,
      asset_holdings: this.$store.state.userData.asset_holdings,
      financial_goal: this.$store.state.userData.financial_goal,
      salary: this.$store.state.userData.salary,
    };
  },
  created() {
    this.$store.dispatch("userDetail");
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

<style></style>
