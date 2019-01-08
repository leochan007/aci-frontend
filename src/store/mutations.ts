import { Mutation, MutationTree } from 'vuex';
import { State } from './state';

export function setLang(state: State, lang: string) {
  state.lang = lang;
}

export default <MutationTree<State>> {
    setLang,
};
