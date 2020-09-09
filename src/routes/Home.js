import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setConfig } from '../store/actions/config.js'
import { Checkbox, Button, FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'

import NoItemsPlaceholder from '../components/NoItemsPlaceholder'
import ItemGrid from '../components/ItemGrid'
import KanjiJSON from '../assets/json/kanji.json'
import vocabJSON from '../assets/json/vocabulary.json'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
}

const LIST_TYPES = {
  kanji: 'Kanji',
  vocab: 'Vocab'
}

function Home(props) {
  const [listType, setListType] = useState(LIST_TYPES.kanji)
  const [itemList, setItemList] = useState([])
  const [lessonFilter, setLessonFilter] = useState([3])

  useEffect(() => {
    let sourceData = listType === LIST_TYPES.kanji ? KanjiJSON : vocabJSON;

    const filteredByLesson = sourceData.filter(datum => 
      lessonFilter.includes(datum.Lesson)
    )
    setItemList(filteredByLesson)
  }, [lessonFilter, listType])

  return (
    <div style={styles.wrapper}>
      <div style={{ marginBottom: 10 }}>
        { new Array(23).fill(0).map((n, i) => i + 1).map(n => {
          return (
            <Button style={{ margin: 3 }} color={lessonFilter.includes(n) ? 'secondary' : 'primary'} variant='contained' onClick={() => setLessonFilter([n])}>
              {n}
            </Button>
          )
        })}
      </div>
      
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox 
              checked={props.showFurigana} 
              onChange={() => props.setConfig('showFurigana', !props.showFurigana)}
              name="showFurigana" 
            />
          }
          label="Show Furigana"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={props.defaultToEnglish} 
              onChange={() => props.setConfig('defaultToEnglish', !props.defaultToEnglish)}
              name="defaultTranslation" 
            />
          }
          label={`Translate All: ${!props.defaultToEnglish ? 'English' : '日本語'}`}
        />

        <RadioGroup style={{ display: 'flex', flexDirection: 'row' }} name="listDataType" value={listType} onChange={e => {
          setListType(e.currentTarget.value)
        }}>
          <FormControlLabel value={LIST_TYPES.kanji} control={<Radio />} label="Kanji" />
          <FormControlLabel value={LIST_TYPES.vocab} control={<Radio />} label="Vocabulary" />
        </RadioGroup>
      </FormControl>

      { itemList.length 
        ? <ItemGrid listData={itemList} type={listType} />
        : <NoItemsPlaceholder missing={listType} />
      }
    </div>
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
    setConfig: (prop, val) => {
      dispatch(setConfig(prop, val))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home) 