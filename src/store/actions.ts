import { Store, ActionTree, ActionContext } from 'vuex';
import { State } from './state';

// increment a person type by one if possible
export function setLang(store: ActionContext<State, any>, lang: string) {
  localStorage.setItem('alphacar_lang', lang);
  store.commit('setLang', lang);
}

// export everything compliant to the vuex specification for actions
export default <ActionTree<State, any>> {
    setLang,
};
