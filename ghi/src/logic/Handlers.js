function updated(state, val) {
  state.value[val.payload[0]] = val.payload[1];
}

export { updated };
