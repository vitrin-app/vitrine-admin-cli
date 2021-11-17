import React from 'react'
import { Box } from 'ink'

import { Faded } from '../theme'
import { Padding } from './padding'


export const Field = ({ label, children }) => (
  <Box>
    <Box width={'33%'}>
      <Faded><Padding/>{label}:</Faded>
    </Box>
    <Box>
      {children}
    </Box>
  </Box>
)
