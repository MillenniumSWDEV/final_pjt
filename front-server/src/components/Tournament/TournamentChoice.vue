<template>
  <div v-if="!!prdt" style="min-width: 500px" @click="select">
    <div class="d-flex justify-content-center">
      <b-card
        border-variant="primary"
        :header="prdt.fin_prdt_nm"
        header-bg-variant="primary"
        header-text-variant="white"
      >
        <b-card-text>
          {{ prdt.id }}
          <p>{{ prdt.kor_co_nm }}</p>
          <p>{{ prdt.etc_note }}</p>
          <p>{{ prdt.spcl_cnd }}</p>
          <div v-if="prdt.depositoptions_set">
            <p v-for="option in prdt.depositoptions_set" :key="option.id">
              최대 금리 {{ option.intr_rate2 }} - {{ option.save_trm }}개월
            </p>
          </div>
          <div v-else>
            <p v-for="option in prdt.savingoptions_set" :key="option.id">
              최대 금리 {{ option.intr_rate2 }} - {{ option.save_trm }}개월
            </p>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  props: {
    prdt: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      disabled: false,
      openDelay: "0",
      closeDelay: "0",
      value: false,
    };
  },
  methods: {
    select() {
      this.$emit("choice-event", true);
    },
  },
};
</script>

<style></style>
