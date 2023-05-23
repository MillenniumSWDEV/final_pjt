<template>
  <div id="ImageSlider" class="ms-5">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      fade
      indicators
      img-width="530"
      img-height="837"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block"
            img-width="530"
            img-height="837"
            src="@/assets/이미지슬라이드1.png"
            alt="image slot"
            @click="goTournament()"
          />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block"
            img-width="530"
            img-height="837"
            src="@/assets/이미지슬라이드2.png"
            alt="image slot"
            @click="goTournament()"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "ImageSlider",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    goTournament() {
      this.$router.push({
        name: "TestView",
      });
    },
  },
};
</script>
<style>
.carousel-control-next > .carousel-control-next-icon, .carousel-control-prev > .carousel-control-prev-icon{
  background-color: rgb(42,169,224);
  width: 50px;
  height: 50px;
  box-sizing: content-box;
  fill: rgb(42,169,224);
  justify-content: center;
}
.carousel-control-next{
  margin-right: 80px;
}
</style>
