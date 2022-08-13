<template>
  <div class="bookmarks">
    <!-- <p>Placeholder 1</p> -->
    <div
      class="bookmark__item"
      v-for="(bookmark, i) in bookmarks"
      :key="`bookmark-${i}`"
    >
      <a :href="bookmark.url">
        <img :src="bookmark.icon" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks.items;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bookmarks {
  display: flex;
}
.bookmark {
  &__item {
    position: relative;
    display: flex;
    width: 80px;
    height: 80px;
    background-color: #393939;
    user-select: none;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 6px 2px;
    font-size: 38px;
    z-index: 3;
    cursor: grab;
    margin: 6px;
    border-radius: 8px;

    // display: block;
    // flex: 0 0 auto;
    // padding: 0.25rem;
    // background-color: #393939;
    // border-radius: 0.25rem;
    // margin: 0.25rem;
    img {
      // width: 64px;
      // height: 64px;
      display: block;
      height: 72px;
      object-fit: contain;
      padding: 16px;
    }
  }
}
</style>
