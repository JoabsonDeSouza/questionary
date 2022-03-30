import React from 'react'
import * as DS from '@material-ui/core'

interface LoadingProps {
  message?: string
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <DS.Box
      display="flex"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <DS.CircularProgress size={50} color="secondary" />
      <DS.Box marginTop={2}>
        {!!message && (
          <DS.Typography variant="h4" color="textSecondary">
            {message}
          </DS.Typography>
        )}
      </DS.Box>
    </DS.Box>
  )
}

export default Loading
