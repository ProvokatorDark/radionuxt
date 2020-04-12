
export default function ({ store, route }) {
  store.commit('SET_RUBRIKA', route.params);
  store.commit('SET_SELECTED_TRACK', 0);
  store.commit('SET_SEO', route.params);
}
