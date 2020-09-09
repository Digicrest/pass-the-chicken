import * as Types from '../types/profile'

export const addKanji = kanji => {
  return {
    type: Types.ADD_KANJI,
    payload: kanji
  }
}

export const removeKanji = kanji => {
  return {
    type: Types.REMOVE_KANJI,
    payload: kanji
  }
}

export const addVocab = vocab => {
  return {
    type: Types.ADD_VOCAB,
    payload: vocab
  }
}

export const removeVocab = vocab => {
  return {
    type: Types.REMOVE_VOCAB,
    payload: vocab
  }
}

export const removeAllKanji = () => {
  return {
    type: Types.REMOVE_ALL_KANJI
  }
}

export const removeAllVocab = () => {
  return {
    type: Types.REMOVE_ALL_VOCAB
  }
}