import React from 'react'
import { Text } from 'ink'

import { theme } from '../theme'
import { Divider } from './divider'


export const Title = ({ children }) => (
  <>
    <Text bold color={theme.primary}>#  {children}</Text>
    <Divider/>
  </>
)

