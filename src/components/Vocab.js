import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addVocab } from '../store/actions/profile.js'
import { Card, CardHeader } from '@material-ui/core'
import { Translate, Done } from '@material-ui/icons'

const styles = {
  card: {
    position: 'relative',
    backgroundColor: '#f1ccfc'
  },
  translateIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    opacity: 0.6,
    fontSize: '1rem'
  },
  markCompleteIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    opacity: 0.6,
  }
}

function Vocab(props) {
  let [showMeaning, setShowMeaning] = useState(false)

  useEffect(() => {
    setShowMeaning(props.defaultToEnglish)
  }, [props.defaultToEnglish])

  const vocab = props.vocab;
  
  return (
    <Card style={styles.card}>
      <Translate style={styles.translateIcon} onClick={e => {
        setShowMeaning(!showMeaning)
      }} />

      <CardHeader 
        title={showMeaning ? vocab.Meaning : (vocab.Kanji || vocab.Kana)}
        subheader={props.showFurigana && vocab.Kana}
      />

      <Done style={styles.markCompleteIcon} onClick={() => {
        props.addVocab(vocab)
      }}/>
    </Card>
  )
}
const mapStateToProps = state => {
  return {
    showFurigana: state.config.showFurigana,
    defaultToEnglish: state.config.defaultToEnglish,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addVocab: vocab => {
      dispatch(addVocab(vocab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vocab)

/** Vocab Model
 * {
 *    Lesson: 0,
 *    Kanji: "",
 *    Kana: "",
 *    Meaning: ""
 * }
*/