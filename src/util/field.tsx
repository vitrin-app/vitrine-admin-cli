import React from 'react'
import { Box } from 'ink'

import { Faded } from '../theme'


export const Field = ({ label, children }) => (
  <Box>
    <Box width={'33%'}>
      <Faded>{label}:</Faded>
    </Box>
    <Box>
      {children}
    </Box>
  </Box>
)
