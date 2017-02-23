<template>
  <div class="bottom">
    <div style="height: 56px;"></div>
    <div class="bottom-bar">
      <ul class="bottom-tab">
        <li>
          <router-link :to="{name: 'home'}" :class="{active: currentRouteName === 'home'}"><i class="fa fa-home fa-2x"></i></router-link>
        </li>
        <li>
          <router-link :to="{name: 'star'}" :class="{active: currentRouteName === 'star'}"><i class="fa fa-star fa-2x"></i></router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'bottom-bar',
  data() {
    return {
      currentRouteName: 'home'
    }
  },
  created() {
    this.currentRouteName = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.currentRouteName = to.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-bar {
background-color: #F5F5F5;
position: fixed;
bottom: 0;
width: 100%;
height: 56px;

  ul.bottom-tab {
    list-style: none;
    li {
      width: 50%;
      padding: 0;
      margin: 0;
      float: left;
      text-align: center;
      text-decoration: none;

      a.active {
        color: #06c1ae
      }
    }
  }
}
</style>
