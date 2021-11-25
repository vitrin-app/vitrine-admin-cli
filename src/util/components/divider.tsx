import React from 'react'
import { Text } from 'ink'

import { Padding } from './padding'
import { theme } from '../../theme'


const LINE = new Array(16).fill(theme.divider).join('')
export const Divider = () => <Text color='gray'><Padding/>{LINE}</Text>
