import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './langs';

Vue.use(VueI18n);

const tempLocale = (localStorage.alphacar_lang === undefined
  || localStorage.alphacar_lang === null
  || localStorage.alphacar_lang === '') ? 'cn' : localStorage.alphacar_lang;

const i18n = new VueI18n({
  locale: tempLocale,
  silentTranslationWarn: process.env.NODE_ENV === 'production',
  messages,
});

export default i18n;
