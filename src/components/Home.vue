<template>
  <div>
    <div class="page" v-show="!showLangView">
      <header-view></header-view>

      <form id="translate-form">
        <div class="language">
          <div class="lang-list fl">
            <a class="selector" @click="selectLang('from', from)" v-text="from.name"></a>
          </div>
          <div class="swap-wrap fl">
            <a @click="swapLang"><i class="fa fa-exchange fa-2x"></i></a>
          </div>
          <div class="lang-list fl">
            <a class="selector" @click="selectLang('to', to)" v-text="to.name"></a>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="source-wrap">
          <div class="input-wrap" tabindex="1">
            <textarea id="source" placeholder="please type" class="fl" v-model="source"></textarea>
            <div class="go-wrap">
              <div class="go">
                <a @click="submit"><i class="fa fa-2x" :class="translating ? 'fa-spinner fa-spin' : 'fa-arrow-circle-right'"></i></a>
              </div>
            </div>
          <div class="clearfix"></div>
          </div>
        </div>
      </form>

      <list-view :items="items" @updateItems="updateItems"></list-view>

      <div class="operator" v-show="items.length > 0">
        <a class="clean-history" @click="cleanHistory">Clean History</a>
      </div>

      <bottom-bar-view></bottom-bar-view>
    </div>

    <div class="page" v-show="showLangView">
      <lang-view @hiddenLangView="showLangView = false" @choosed="updateLang" :title="langViewTitle" :type="selectedType" :currentLang="selectedLang"></lang-view>
    </div>
  </div>
</template>

<script>
import languages from 'google-translate-api/languages.js';
import axios from 'axios';
import store from 'utils/store';
import ListView from 'components/List';
import LangView from 'components/Lang';

export default {
  name: 'Home',
  components: {
    ListView,
    LangView
  },
  data() {
    return {
      from: {value: 'auto', name: 'Automatic'},
      to: {value: 'en', name: 'English'},
      source: '',
      items: store.history.fetch(),
      translating: false,
      showLangView: false,
      selectedType: '',
      langViewTitle: '',
      selectedLang: {},
    }
  },
  methods: {
    submit() {
      this.translating = true;
      this.source = this.source.replace(/(^\s*)|(\s*$)/g, '');
      if (!this.source) {
        alert('Please type something instead of nothing');
        return false;
      }

      var params = {
        from: this.from.value, 
        to: this.to.value,
        source: this.source
      };

      axios.get('http://localhost:8080/api/translate', {params}).then(res => {
        var item = {
          source: this.source,
          translation: res.data.text,
          isStar: false
        };
        this.items.unshift(item);

      }).catch(error => {
        alert(error);
      }).then(() => this.translating = false);
    },
    swapLang() {
      var source = this.from,
          target = this.to;
      if (source.value === 'auto') {
        source = target.value === 'en' ? {value: 'zh-cn', name: 'Chinese Simplified'} : target;
      }

      [this.from, this.to] = [target, source];
    },
    selectLang(type, lang) {
      this.showLangView = true;
      this.langViewTitle = 'Translate ' + type;
      this.selectedType = type;
      this.selectedLang = lang;
    },
    updateItems(items) {
      store.history.save(items);
    },
    updateLang(type, lang) {
      // this[type] = lang;
      this.$set(this, type, lang);
    },
    cleanHistory() {
      this.items = [];
      store.history.save(this.items);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page {
  overflow-y: scroll;
}
.input-wrap {
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  position: relative;

  #source {
    width: 92%;
    min-height: 100px;
    color: #555555;
    font-size: 1em;
    line-height: 1.4em;
    border: 0;
    resize: none;

    &:focus {
      outline: none;
    }
  }

  .go-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    .go {
      padding: 5px;
    }
  }
}

.lang-list {
  display: inline-block;
  width: 45%;
  margin: 0;
  word-break: normal;
}
.swap-wrap {
  display: inline-block;
  width: 10%;
}

.selector {
  background: transparent;
  padding: 10px;
  font-size: 20px;
  line-height: 1.5;
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
}

.result {
  background-color: #06c1ae;
  padding: 16px 16px 16px 16px;

  .result-header {
    height: 33px;
  }

  .text-wrap {
    min-height: 18px;
  }

  .result-footer {
    height: 33px;
  }
}


.operator {
  margin: 15px 0;
  text-align: center;
  
  .clean-history {
    color: #0000FF;
  }
}

</style>
