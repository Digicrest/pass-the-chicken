import React from 'react'
import Kanji from './Kanji'
import Vocab from './Vocab'

function ItemCard({ item, type = 'Kanji' }) {
  switch(type) {
    case 'Kanji':
      return <Kanji kanji={item} />
    case 'Vocab':
      return <Vocab vocab={item} />
    default:
      return <h2>Unknown Item Card Type!</h2>
  }
}

export default ItemCard