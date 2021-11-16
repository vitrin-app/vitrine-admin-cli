import React from 'react'
import { Text } from 'ink'


export const theme = {
  primary: '#3DB2FF',
  accent: '#FFB830',
  error: '#FF2442'
}


export const Primary = ({ children }) => <Text color={theme.primary}>{children}</Text>
export const Accent = ({ children }) => <Text color={theme.accent}>{children}</Text>
export const Error = ({ children }) => <Text color={theme.error}>{children}</Text>
export const Faded = ({ children }) => <Text color='gray'>{children}</Text>
