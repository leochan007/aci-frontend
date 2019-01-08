import { Getter, GetterTree } from 'vuex';
import { State } from './state';

export function getLang(state: State): string {

  if (state.lang === undefined || state.lang === null || state.lang === '') {
    const localLang = localStorage.getItem('alphacar_lang');
    let lang = 'cn';
    if (localLang !== null && localLang !== undefined && localLang !== '') {
      lang = localLang;
    }
    return lang;
  }

  return state.lang;

}

// export everything compliant to the vuex specification for getters
export default <GetterTree<State, any>> {
    getLang,
};
