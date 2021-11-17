import React, { useState, useEffect } from 'react'
import { Box, Text, useInput } from 'ink'

import { useHint } from '../hint'
import { theme, Error } from '../theme'
import { Divider } from './divider'
import { Padding } from './padding'
import { Spinner } from './spinner'


export interface ActionsProps {
  actions: {
    label: string,
    hint: string,
    action: () => Promise<void>
  }[]
}

export const Actions = ({ actions }: ActionsProps) => {
  const { hint } = useHint()
  const [index, setIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useInput(async (_, key) => {
    if (!loading) {
      if (key.leftArrow && index > 0) {
        setIndex(index - 1)
      } else if (key.rightArrow && index < actions.length - 1) {
        setIndex(index + 1)
      } else if (key.return && !!actions[index]) {
        setLoading(true)
        setError(undefined)

        try {
          await actions[index]!.action()
          setLoading(false)
        } catch (err: any) {
          setLoading(false)
          setError(err.message || err.toString())
        }
      }
    }
  })

  useEffect(() => {
    hint([
      actions[index]?.hint || '',
      '◀,▶: navigate | ↩: select action'
    ])
  }, [index])

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
      { error && <Error>{error}</Error> }
    </>
  )
}
