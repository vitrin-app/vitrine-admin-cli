import React from 'react'
import Spinner from 'ink-spinner'
import { Box } from 'ink'

import { Primary, Faded } from '../theme'


export const Loading = ({ children }) => (
  <Box>
    <Primary><Spinner/></Primary>
    <Faded> {children}</Faded>
  </Box>
)
