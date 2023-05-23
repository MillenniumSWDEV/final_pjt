<template>
  <div id="ExchangeRate" class="container" style="width: 400px">
    <b-card-group deck>
      <b-card
        header="ExchangeRate"
        header-tag="header"
        style="border-radius: 10px; box-shadow: 2px 2px 20px 3px #f6f1f1"
      >
        <template #header>
          <h3 class="mb-0">환율</h3>
        </template>
        <div class="pb-3">
          <b-form-select v-model="cur">
            <option>화폐를 선택하세요</option>
            <option
              v-for="er in exchangeRates"
              :key="er.cur_unit"
              :value="[er.cur_nm, er.ttb, er.tts]"
            >
              {{ er.cur_nm }}({{ er.cur_unit }})
            </option>
          </b-form-select>
        </div>
        <b-button-toolbar
          class="pb-3"
          aria-label="Toolbar with button groups and input groups"
        >
          <b-input-group size="sm" prepend="$" type="number">
            <b-form-input v-model="curN" class="text-right"></b-form-input>
          </b-input-group>
          <b-button-group size="sm" class="mr-1 ml-3">
            <b-button @click="CtoW">변환</b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-button-toolbar
          aria-label="Toolbar with button groups and input groups"
        >
          <b-input-group size="sm" prepend="￦" type="number">
            <b-form-input v-model="WN" class="text-right"></b-form-input>
          </b-input-group>
          <b-button-group size="sm" class="mr-1 ml-3">
            <b-button @click="WtoC">변환</b-button>
          </b-button-group>
        </b-button-toolbar>
        <b-card-text class="pt-3"
          >(소숫점 둘째 자리까지 변환됩니다)</b-card-text
        >
        <br />
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "ExchangeRate",
  data() {
    return {
      cur: "화폐를 선택하세요",
      curN: 0,
      WN: 0,
    };
  },
  computed: {
    exchangeRates() {
      return this.$store.state.finlife.exchangeRates;
    },
  },
  created() {
    this.getExRates();
  },
  methods: {
    getExRates() {
      this.$store.dispatch("getExRates");
    },
    CtoW() {
      if (typeof this.cur === "object") {
        this.WN = (this.curN * this.cur[2].replace(",", "")).toFixed(2);
      } else {
        alert("화폐 단위를 선택해주세요");
      }
    },
    WtoC() {
      if (typeof this.cur === "object") {
        this.curN = (this.WN / this.cur[1].replace(",", "")).toFixed(2);
      } else {
        alert("화폐 단위를 선택해주세요");
      }
    },
  },
};
</script>

<style></style>
