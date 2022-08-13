<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        <a class="hn-title" href="https://news.ycombinator.com" target="_blank"
          >Hacker News</a
        >
      </h5>
    </div>
    <ul class="card-list">
      <li class="card-list-item" v-if="loading"></li>
      <li class="card-list-item" v-for="i in pageSize" :key="i">
        <a
          v-if="stories[i - 1]"
          class="list-item"
          :href="`https://news.ycombinator.com/item?id=${stories[i - 1].id}`"
          target="_blank"
        >
          <div class="list-item__content">
            <div class="list-item__title">{{ stories[i - 1].title }}</div>
            <div class="list-item__subtitle">
              {{ stories[i - 1].score }} points by {{ stories[i - 1].by }} |
              Comments:
              {{ stories[i - 1].descendants }}
            </div>
          </div>
          <div class="list-item__action">
            <span class="list-item__action-text"
              >{{ getElapsedTime(stories[i - 1].time) }} hr</span
            >
          </div>
        </a>
        <div v-else class="list-item">
          <div class="list-item__content">
            <skeleton-loader :loading="loading" :width="100" />
            <skeleton-loader :loading="loading" :width="70" />
          </div>
        </div>
      </li>
    </ul>
    <!-- <div class="card-action">
      <a @click="fetchTopStories">FETCH</a>
    </div>-->
  </div>
</template>

<script>
import SkeletonLoader from '../SkeletonLoaders';

export default {
  components: {
    SkeletonLoader,
  },
  computed: {
    pageSize() {
      return this.$store.state.hackerNews.display.itemsPerPage;
    },
    stories() {
      return this.$store.getters['hackerNews/pageTopStories'];
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    getElapsedTime(time) {
      return new Date(Date.now() - time * 1000).getHours();
    },
    fetchStory(id) {
      return this.$store.dispatch('hackerNews/fetchItem', { id });
    },
    fetchTopStories() {
      return this.$store.dispatch('hackerNews/fetchTopStories');
    },
  },
  mounted() {
    this.fetchTopStories();
    window.addEventListener('focus', this.fetchTopStories);
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.fetchTopStories);
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #393939;
  transition: box-shadow 0.25s;
  border-radius: 8px;
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
    overflow: scroll;
    &-item {
      position: relative;
      display: block;
      border-top: 1px solid rgba(160, 160, 160, 0.125);
    }
  }

  &-action {
    background-color: inherit;
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    position: relative;
    padding: 16px 24px;

    a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {
      cursor: pointer;
      color: #ff6600;
      margin-right: 24px;
      transition: color 0.3s ease;
      text-transform: uppercase;
      &:hover {
        color: #ff9900;
      }
    }
  }
}

.list-item {
  position: relative;
  min-height: 3rem;
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: inherit;
  outline: none;
  text-decoration: none;
  letter-spacing: normal;
  transition: background-color 0.25s;

  &:hover {
    color: inherit;
    background-color: rgba(160, 160, 160, 0.125);
  }

  &__content {
    display: flex;
    align-items: center;
    align-self: center;
    flex-wrap: wrap;
    flex: 1 1;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    overflow: hidden;
  }

  &__action {
    align-items: flex-end;
    align-self: stretch;
    justify-content: space-between;
    white-space: nowrap;
    flex-direction: column;
    display: inline-flex;
    min-width: 1.5rem;
    margin: 0.75rem 0;

    &-text {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.75rem;
      //
    }
  }

  &__title,
  &__subtitle {
    flex: 1 1 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__title {
    align-self: center;
    font-size: 1rem;
    line-height: 1.2;
  }
  &__subtitle {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
  }

  > :not(:last-child) {
    margin-bottom: 2px;
  }
}

.hn-title {
  color: #ff6600;
  text-decoration: none;
}
</style>
