import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'

import { theme } from '../theme'
import { Divider } from './divider'
import { Padding } from './padding'
import { Spinner } from './spinner'


export interface ActionsProps {
  actions: {
    label: string,
    action: () => Promise<void>
  }[]
}

export const Actions = ({ actions }: ActionsProps) => {
  const [index, setIndex] = useState(-1)
  const [loading, setLoading] = useState(false)

  useInput(async (_, key) => {
    if (!loading) {
      if (key.leftArrow && index > 0) {
        setIndex(index - 1)
      } else if (key.rightArrow && index < actions.length - 1) {
        setIndex(index + 1)
      } else if (key.return && !!actions[index]) {
        setLoading(true)
        await actions[index]!.action()
        setLoading(false)
      }
    }
  })

  return (
    <>
      <Divider/>
      <Box>
        <Padding/>
        {
          actions.map((action, i) => (
            <Box key={i} marginRight={1}>
              <Text color={loading ? 'gray' : theme.accent} inverse={i === index && !loading}>
                {loading && i === index ? <Spinner/> : <Text> </Text>}
                <Text> {action.label}  </Text>
              </Text>
            </Box>
          ))
        }
      </Box>
    </>
  )
}
