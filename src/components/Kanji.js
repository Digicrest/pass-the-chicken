import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addKanji } from '../store/actions/profile.js'

import { Card, CardHeader } from '@material-ui/core'
import { Translate, Done } from '@material-ui/icons'

const styles = {
  card: {
    position: 'relative',
    backgroundColor: '#f5b8d1'
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

function Kanji(props) {
  let [showDefinition, setShowDefinition] = useState(props.defaultToEnglish)

  useEffect(() => {
    setShowDefinition(props.defaultToEnglish)
  }, [props.defaultToEnglish])

  const kanji = props.kanji;

  return (
    <Card style={{ ...styles.card, opacity: props.alreadyStudied ? 0.5 : 1 }}>
      <Translate style={styles.translateIcon} onClick={() => setShowDefinition(!showDefinition)} />
      <CardHeader
        title={showDefinition ? <h3>{kanji.Definition}</h3> : <h3>{kanji.Kanji}</h3>}
        subheader={props.showFurigana && kanji.Reading}
      />

      <Done style={styles.markCompleteIcon}  onClick={() => {
        props.addKanji(kanji)
      }}/>
    </Card>
  )
}
const mapStateToProps = state => {
  return {
    showFurigana: state.config.showFurigana,
    defaultToEnglish: state.config.defaultToEnglish
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addKanji: kanji => {
      dispatch(addKanji(kanji))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Kanji)

/** Kanji Model
 * {
 *    Definition: "",
 *    Examples: [
 *      { Definition: "", Reading: "", Example: "" } 
 *    ],
 *    Kanji: "",
 *    Lesson: 0,
 *    Reading: ""
 * }
*/