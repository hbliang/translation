const STORAGE_HISTORY_KEY = 'translate-history-vue';
const STORAGE_RECENT_LANGUAGES_KEY = 'translate-recent-languages-vue';

export default {
  history: {
    fetch() {
      return JSON.parse(window.localStorage.getItem(STORAGE_HISTORY_KEY) || '[]');
    },
    save(value) {
      return window.localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(value));
    }
  },
  recentLanguages: {
    fetch() {
      return JSON.parse(window.localStorage.getItem(STORAGE_RECENT_LANGUAGES_KEY) || '[]');
    },
    save(value) {
      return window.localStorage.setItem(STORAGE_RECENT_LANGUAGES_KEY, JSON.stringify(value));
    }
  }
}
