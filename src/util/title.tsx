import React from 'react'
import { Text, Newline } from 'ink'

import { theme } from '../theme'


export const Title = ({ children }) => (
  <>
    <Text bold color={theme.primary}># {children}</Text>
    <Newline/>
  </>
)

