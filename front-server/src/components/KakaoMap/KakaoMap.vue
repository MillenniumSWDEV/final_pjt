<template>
  <div id="KakaoMap" class="container">
    <b-card-group deck class="">
      <b-card header="ExchangeRate" header-tag="header">
        <template #header>
          <h3 class="mb-0">카카오맵 검색</h3>
        </template>
        <div class="search-box">
          <b-button-toolbar
            class="pb-3"
            aria-label="Toolbar with button groups and input groups"
          >
            <b-input-group size="md" type="text">
              <b-form-input
                v-model="keyword"
                class="text-right"
                type="text"
                @keyup.enter="searchPlace"
              ></b-form-input>
            </b-input-group>
            <b-button-group size="sm" class="mr-1 ml-3">
              <b-button @click="searchPlace">검색</b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>
        <div id="map" ref="map" class="map"></div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      mapInstance: null,
      keyword: "",
      data: null,
      markers: [],
      infWins: [],
    };
  },
  mounted() {
    // 지도를 찍어보자!
    var container = this.$refs.map;
    var options = {
      center: new window.kakao.maps.LatLng(37.501281, 127.039598),
      level: 3,
    };
    this.mapInstance = new window.kakao.maps.Map(container, options);
    console.log("Ahoi", this.mapInstance);
  },
  methods: {
    // 검색으로 장소를 찾아보자!
    searchPlace() {
      console.log(1, this.keyword);
      // 이미 찍힌 마커가 있다면 없애줘
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(this.keyword, (data, status, pge) => {
        console.log(2, this.data);
        this.data = data;
        console.log(2.5, this.data);

        const positions = this.data.map(
          (place) => new kakao.maps.LatLng(...[place.y, place.x])
        );
        if (positions.length > 0) {
          // 마커 생성
          this.markers = positions.map((position, index) => {
            const marker = new kakao.maps.Marker({
              map: this.mapInstance,
              position,
            });
            var iwContent =
              '<div style="padding:5px;">' +
              this.data[index].place_name +
              "</div>";
            console.log(iwContent);
            const infowindow = new kakao.maps.InfoWindow({
              content: iwContent,
            });
            kakao.maps.event.addListener(marker, "mouseover", () => {
              //마커 position을 출력합니다.
              console.log(this.data[index].place_name);
              infowindow.open(this.mapInstance, marker);
            });
            kakao.maps.event.addListener(marker, "mouseout", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
            });
            return marker;
          });

          const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
          );
          console.log(1, bounds);
          this.mapInstance.setBounds(bounds);
          console.log("owari");
        }
      });
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 700px;
}
</style>
