<template>
<div>
    <header-view title="Stars"></header-view>

    <div class="Star">
      <list @updateItems="storeItems(staredItems)" :items="staredItems"></list>
    </div>
    
    <bottom-bar-view></bottom-bar-view>
</div>
</template>

<script>
import list from 'components/List';
import store from 'utils/store.js';

export default {
  name: 'Star',
  components: {
    list
  },
  data() {
    return {
      items: store.history.fetch()
    }
  },
  methods: {
    storeItems(staredItems) {
      for (let staredItem in staredItems) {
        for (let item in this.items) {
          if (item.from === staredItem.from) {
            item = staredItem;
          }
        }
      }
      store.history.save(this.items);
    }
  },
  computed: {
    staredItems() {
      return this.items.filter((item) => {
        return item.isStar;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
