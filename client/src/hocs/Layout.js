import React from 'react'
import { connect } from 'redux-bundler-react'
import { Box, Button } from 'rebass'
import navHelper from 'internal-nav-helper'

const Layout = ({ doUpdateUrl, route }) => {
  const Page = route

  return (
    <Box
      onClick={navHelper(doUpdateUrl)}
    >
      <Page />
    </Box>
  )
}

export default connect('doUpdateUrl', 'selectRoute', Layout)
