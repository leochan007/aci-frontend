import { Module, GetterTree, MutationTree, ActionTree, Plugin } from 'vuex';
import { State } from './state';
import Mutations from './mutations';
import Getters from './getters';
import Actions from './actions';

class AcarStore implements Module<State, any> {

  public namespaced: boolean = true;

  public state: State;
  public mutations = Mutations;
  public getters = Getters;
  public actions = Actions;
  private plugins: Array<Plugin<State>> = new Array<Plugin<State>>();

  // create everything
  constructor(plugins?: Array<Plugin<State>>) {
    this.state = new State();
    if (plugins !== undefined) {
      this.plugins = plugins;
    }
  }
}

import Vue from 'vue';
import * as Vuex from 'vuex';
Vue.use(Vuex);

const store: Vuex.Store<State> = new Vuex.Store({
  modules: { acarStore: new AcarStore() },
});

export default store;
