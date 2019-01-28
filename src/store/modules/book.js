const book = {
  state: {
    fileName: '',
    menuVisible: true
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_VISIBLE': (state, menuVisible) => {
      state.menuVisible = menuVisible
    }
  }
}
export default book
