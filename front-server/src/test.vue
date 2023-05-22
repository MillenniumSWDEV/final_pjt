<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'ArticleView' }">Articles</router-link> |
      <router-link :to="{ name: 'ProductsView' }">ProductsView</router-link> |
      <router-link :to="{ name: 'MapView' }">근처 은행</router-link> |
      <router-link :to="{ name: 'ExchangeRateView' }">환율</router-link> |
      <router-link :to="{ name: 'LogInView' }">LogInPage</router-link> |
      <router-link :to="{ name: 'SignUpView' }">SignUpPage</router-link> |
      <router-link :to="{ name: 'TournamentView' }">BATTLE</router-link> |
      <router-link :to="{ name: 'GBTIView' }">TEST</router-link> |
      <router-link :to="{ name: 'MyPageView' }">MyPage</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
