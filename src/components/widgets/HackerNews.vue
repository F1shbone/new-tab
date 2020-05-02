<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Hacker News</h5>
    </div>
    <ul class="card-list">
      <li class="card-list-item">Cras justo odio</li>
      <li class="card-list-item">Dapibus ac facilisis in</li>
      <li class="card-list-item">Vestibulum at eros</li>
    </ul>
    <div class="card-action">
      <a @click="fetchTopStories">FETCH</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async fetchTopStories() {
      const ids = await axios.get('/v0/topstories');
      const stories = await ids.map(id => axios.get(`/v0/item/${id}.json`));

      console.log(stories);
    },
  },
  mounted() {
    axios.defaults.baseURL = 'https://hacker-news.firebaseio.com';
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
  color: #fff;
  background-color: #393939;
  transition: box-shadow 0.25s;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  &-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
  }

  &-title {
    display: block;
    line-height: 2rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 300;
  }

  &-list {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    &-item {
      position: relative;
      display: block;
      padding: 0.75rem 1.25rem;
      border-top: 1px solid rgba(160, 160, 160, 0.125);

      // &:last-child {
      //   border-bottom: 1px solid rgba(160, 160, 160, 0.125);
      // }
    }
  }

  &-action {
    background-color: inherit;
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    position: relative;
    padding: 16px 24px;

    a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {
      cursor: pointer;
      color: #ffab40;
      margin-right: 24px;
      transition: color 0.3s ease;
      text-transform: uppercase;
      &:hover {
        color: #ffd8a6;
      }
    }
  }
}
</style>
