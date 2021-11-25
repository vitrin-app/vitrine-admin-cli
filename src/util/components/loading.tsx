import React from 'react'
import { Box } from 'ink'

import { Faded } from '../../theme'
import { Padding } from './padding'
import { Spinner } from './spinner'


export const Loading = ({ children }) => (
  <Box>
    <Padding/>
    <Spinner/>
    <Faded> {children}</Faded>
  </Box>
)
