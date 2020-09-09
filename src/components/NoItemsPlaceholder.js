import React from 'react'
import { Typography } from '@material-ui/core'

function NoItemsPlaceholder(props) {
  return (
    <div>
      <Typography>
        There's no {props.missing} to be found here Q_Q
      </Typography>
    </div>
  )
}

export default NoItemsPlaceholder
