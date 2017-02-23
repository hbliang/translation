<template>
  <div class="nav">
    <header class="navbar">
      <div class="item left">
        <slot name="left">
          <a v-show="showBackButton" class="back-button fa fa-arrow-left"><i></i></a>
        </slot>
      </div>

      <div class="nav-header">{{ title }}</div>

      <div class="item right">
        <slot name="right"></slot>
      </div>
    </header>
    <div style="padding-top: 45px;"></div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    title: {
      type: String,
      default: 'Translate'
    },
    showBackButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 45px;
  color: #fff;
  background: #06c1ae;
  position: fixed;
  z-index: 20;
  width: 100%;
  padding: 0;
  margin: 0;

  .nav-header {
    display: block;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    line-height: 1.8;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  } 

  .item {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;

    .back-button {
      color: #FFFFFF;
      font-size: 25px;
      line-height: 1.8;
      padding-left: 5px;
    }
  }

  .left {
    left: 10px;
  }

  .right {
    right: 10px;
  }
}

</style>
