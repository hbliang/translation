<template>
  <div class="history">
    <div class="list-brief">
      <div class="item-wrapper" v-for="item in items">
        <div class="translate-item fl">
          <div>{{ item.source }}</div>
          <small>{{ item.translation }}
        </div>
        <div class="favorite fr">
          <a @click="item.isStar = !item.isStar"><i class="fa" :class="item.isStar ? 'fa-star' : 'fa-star-o'"></i></a>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import store from 'utils/store';
export default {
  name: 'List',
  props: ['items'],
  data() {
    return {

    }
  },
  methods: {
    
  },
  watch: {
    items: {
      handler(value, oldValue) {
        this.$emit('updateItems', value);
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.history {
  .item-wrapper {
    margin: 5px 1px;
    padding: 5px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.07);

    .translate-item {
      width: 88%;
      padding-left: 10px;
    }

    .favorite {
      padding: 11px;
    }
  } 
}
  
</style>

