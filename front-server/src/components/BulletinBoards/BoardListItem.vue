<template>
  <div>

    <h5>{{ article.id }}</h5>
    <p>{{ article.title }}</p>
    <p>{{ article.content }}</p>
    <router-link :to="{ name: 'DetailView', params: { id: article.id } }">
      [DETAIL]</router-link
    >
    <hr />
  </div>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    article: Object,
  },
  data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ]
      }
    },
};
</script>

<style></style>
