import React from 'react'
import { Text } from 'ink'


export const theme = {
  primary: '#0084FF',
  error: '#FF4848'
}


export const Primary = ({ children }) => <Text color={theme.primary}>{children}</Text>
export const Error = ({ children }) => <Text color={theme.error}>{children}</Text>
export const Faded = ({ children }) => <Text color='gray'>{children}</Text>
