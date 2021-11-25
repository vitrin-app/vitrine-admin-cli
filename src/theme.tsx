import React from 'react'
import { Text } from 'ink'


export const theme = {
  primary: '#45EBA5',
  accent: '#FFB830',
  error: '#FF2442',
  padding: '#',
  divider: ' '
}


export const Primary = ({ children }) => <Text color={theme.primary}>{children}</Text>
export const Accent = ({ children }) => <Text color={theme.accent}>{children}</Text>
export const Error = ({ children }) => <Text color={theme.error}>{theme.padding}  {children}</Text>
export const Faded = ({ children }) => <Text color='gray'>{children}</Text>
