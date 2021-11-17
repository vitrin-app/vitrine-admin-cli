import React from 'react'
import { Text } from 'ink'
import Spin from 'ink-spinner'

import { theme } from '../theme'


export const Spinner = () => <Text bold color={theme.primary}><Spin/></Text>
