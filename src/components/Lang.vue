<template>
  <div class="lang">
    <header-view :title="title" :showBackButton="true" v-show="!showSearchBox">
      <span slot="left">
        <a class="button" @click="back"><i class="fa fa-arrow-left"></i></a>
      </span>
      <span slot="right">
        <a class="button" @click="showSearchBox = true; search = '';"><i class="fa fa-search"></i></a>
      </span>
    </header-view>

    <div class="search-wrap" v-show="showSearchBox">
      <div class="search-box">
        <a class="button" @click="showSearchBox = false; showSearchResult = false; searchResult = [];"><i class="fa fa-arrow-left"></i></a>
        <span style="align-text:center;">
        <input class="search-input" type="search" @keyup="searchLang(search)" placeholder="Search Languages" v-model.trim="search">
        </span>
      </div>
      <div style="padding-top: 45px;"></div>
    </div>

    <div class="list" v-show="!showSearchResult">
      <div class="list-section-header">Recent language</div>
      <div class="item" v-for="lang in recentLanguages">
        <span class="check fa fa-check" :class="{'hidden-check': currentLang.value !== lang.value}"></span>
        <span class="item-name" @click="choosed(lang.name, lang.value)">{{ lang.name }}</span>
      </div>
      <hr>
      <div class="list-section-header">All languages</div>
      <div class="item" v-for="(name, value) in langs">
        <span class="check fa fa-check" :class="{'hidden-check': currentLang.value !== value}"></span>
        <span class="item-name" @click="choosed(name, value)">{{ name }}</span>
      </div>
    </div>

    <div class="list" v-show="showSearchResult">
      <div class="item" v-for="(name, value) in searchResult">
        <span class="check fa fa-check" :class="{'hidden-check': currentLang.value !== value}"></span>
        <span class="item-name" @click="choosed(name, value)">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import languages from 'google-translate-api/languages.js';
import store from 'utils/store.js';
export default {
  name: 'Lang',
  data() {
    return {
      recentLanguages: store.recentLanguages.fetch(),
      showSearchBox: false,
      search: '',
      showSearchResult: false,
      searchResult: []
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String
    },
    currentLang: {
      type: Object
    }
  },
  methods: {
    back() {
      this.$emit('hiddenLangView', {});
      this.cleanSearch();
      this.showSearchBox = false;
    },
    choosed(name, value) {
      this.$emit('choosed', this.type, {name, value});

      // avoid the same lang existting in the array
      let recentLanguages = this.recentLanguages.filter((lang) => {
        return lang.value !== value;
      });

      // recent languages length is only less than 5
      if (recentLanguages.length === 5) {
        recentLanguages.pop();
      }
      recentLanguages.unshift({name, value});
      this.recentLanguages = recentLanguages;

      this.back();
      this.showSearchResult = false;
      this.searchResult = [];
    },
    searchLang(filter) {
      if (filter) {
        this.searchResult = [];
        filter = filter.toUpperCase();
        for (let key in this.langs) {
          if (this.langs.hasOwnProperty(key)) {
            if (this.langs[key].toUpperCase().indexOf(filter) > -1) {
              this.searchResult.push(this.langs[key]);
            }
          }
        }
        this.showSearchResult = true;
      } else {
        this.cleanSearch();
      }
    },
    cleanSearch() {
      this.showSearchResult = false;
      this.searchResult = [];
    }
  },
  computed: {
    langs() {
      var data = {};
      for (let key in languages) {
        if (typeof languages[key] === 'string') {
          data[key] = languages[key];
        }
      }
      return data;
    }
  },
  watch: {
    recentLanguages: {
      handler(value, oldValue) {
        store.recentLanguages.save(value);
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  color: #FFFFFF;
  font-size: 25px;
  line-height: 1.8;
  padding: 0 5px;
}

.search-box {
  height: 45px;
  color: #000000;
  background: #FFFFFF;
  position: fixed;
  z-index: 50;
  width: 100%;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid #E6E6E6;

  .search-input {
    padding: 10px 0 0 50px;
    font-size: 22px;
    outline: none;
    border: none;
  }

  .button {
    color: #000000;
  }
}

.list {
  list-style: none;

  .list-section-header {
    color: #777;
    background: white;
    font-size: 14px;
    font-weight: bold;
    line-height: 48px;
    padding: 0 10px 0 16px;
    vertical-align: middle;
    overflow: hidden;
  }
  .item {
    font-size: 20px;
    margin: 5px 0;
    line-height: 48px;
    vertical-align: center;

    .check {
      padding: 0 30px;
    }

    .hidden-check {
      visibility: hidden;
    }

    .item-name {
      padding-left: 15px;
    }
  }
}
</style>
