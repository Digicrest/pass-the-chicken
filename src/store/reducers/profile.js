import * as Types from '../types/profile'
import cloneDeep from 'lodash.clonedeep'

const init_state = {
  usedKanji: [],
  usedVocab: []
}

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case Types.ADD_KANJI: {
      let new_state = cloneDeep(state)

      if (!new_state.usedKanji.map(k => k.Kanji).includes(action.payload.Kanji)) {
        new_state.usedKanji = new_state.usedKanji.concat(action.payload)
      } else {
        console.warn('Unable to add kanji as already added: ', action.payload)
      }
      return new_state
    }

    case Types.ADD_VOCAB: {
      let new_state = cloneDeep(state)

      if (!new_state.usedVocab
          .map(v => v.Kanji + v.Kana)
          .includes(action.payload.Kanji + action.payload.Kana)
      ) {
        new_state.usedVocab = new_state.usedVocab.concat(action.payload)
      } else {
        console.warn('Unable to add vocab as already added: ', action.payload)
      }

      return new_state
    }
    case Types.REMOVE_KANJI: {
      let new_state = cloneDeep(state)

      const foundIndex = new_state.usedKanji
        .map(k => k.Kanji)
        .indexOf(action.payload.Kanji)

      if (foundIndex !== -1) {
        new_state.usedKanji.splice(foundIndex, 1)
      } else {
        console.error('Unable to REMOVE_KANJI')
      }

      return new_state
    }
    case Types.REMOVE_VOCAB: {
      let new_state = cloneDeep(state)

      const foundIndex = new_state.usedVocab
        .map(v => v.Kanji + v.Kana)
        .indexOf(action.payload.Kanji + action.payload.Kana)
      
      if (foundIndex !== -1) {
        new_state.usedVocab.splice(foundIndex, 1)
      } else {
        console.error('Unable to REMOVE_VOCAB')
      }

      return new_state
    }
    case Types.REMOVE_ALL_KANJI: {
      let new_state = cloneDeep(state)
      new_state.usedKanji = []
      return new_state
    }
    case Types.REMOVE_ALL_VOCAB: {
      let new_state = cloneDeep(state)
      new_state.usedVocab = []
      return new_state
    }
    default: {
      return state
    }
  }
}

export default reducer