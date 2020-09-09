import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { removeKanji, removeVocab } from '../store/actions/profile.js'

import { GridList, GridListTile, GridListTileBar, Button, Typography } from '@material-ui/core'
import ItemCard from './ItemCard'

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    maxHeight: '70vh',
    marginTop: 5
  }
}

function ItemGrid(props) {
  const unlearnItem = item => {
    switch(props.type) {
      case 'Kanji': {
        props.removeKanji(item)
        break;
      }
      case 'Vocab': {
        props.removeVocab(item)
        break;
      }
      default: {
        console.error('failed to unlearn as unknown item type')
      }
    }
    console.log('Type: ', props.type)
    console.log('Unlearn: ', item)
  }

  return (
    <GridList cols={3} cellHeight={"auto"} spacing={10} style={styles.wrapper}>
      { props.listData.map((listItem, i) => {
          let isUsed = false;

          switch(props.type) {
            case 'Kanji': {
              isUsed = props.usedKanji.map(k => k.Kanji).includes(listItem.Kanji)
              break;
            }  
            case 'Vocab': {
              isUsed = props.usedVocab.map(v => v.Kanji + v.Kana).includes(listItem.Kanji + listItem.Kana)
              break;
            } 
            default: {
              console.error('unknown prop type for item grid')
            }          
          }

          return (
            <GridListTile key={i} style={{ minWidth: 200 }}>
              <ItemCard item={listItem} type={props.type} />
    
              {isUsed && (
                <GridListTileBar 
                  title={(
                    <Button variant='contained' color='secondary' onClick={() => unlearnItem(listItem)}>
                      <Typography style={{ color: '#fff'}}>
                        Unlearn
                      </Typography>
                    </Button>
                  )}
                  style={{ height: '100%' }}
                  
                />
              )}
            </GridListTile>
          )
        })
      }
    </GridList>
  )
}

const mapStateToProps = state => {
  return {
    usedKanji: state.profile.usedKanji,
    usedVocab: state.profile.usedVocab
  }
}


const mapDispatchToProps = dispatch => {
  return {
    removeKanji: kanji => {
      dispatch(removeKanji(kanji))
    },
    removeVocab: vocab => {
      dispatch(removeVocab(vocab))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemGrid)
