import React, { useState } from 'react'
import { Text, Box, Newline, useInput } from 'ink'

import { Title, Loading, Line, Padding } from '../util'
import { theme, Error } from '../theme'
import { confirm } from '../api/auth'


export const Confirm = ({ next, count = 6 }) => {
  const [code, setCode] = useState(new Array(count).fill('*'))
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useInput(async (input, key) => {
    if (input >= '0' && input <= '9') {
      if (index < count) {
        setCode(code.map((c, i) => i === index ? input : c))
        if (index < count - 1) {
          setIndex(index + 1)
        }
      }
    } else if (key.leftArrow && index > 0) {
      setIndex(index - 1)
    } else if (key.rightArrow && index < count - 1) {
      setIndex(index + 1)
    } else if (key.return) {
      setError(undefined)
      setLoading(true)

      try {
        const token = (await confirm(code.join(''))).token
        setLoading(false)
        next(token)
      } catch (err: any) {
        setLoading(false)
        setError(err.message)
      }
    }
  })

  return (
    <>
      <Title>🔑 Confirm Code</Title>
      <Line>
        <Text>👉 We have just emailed you a confirmation code!</Text>
      </Line>
      <Line>
        <Text>Please enter the code here and press <Text bold color={theme.primary}>{'<Enter>'}</Text></Text>
      </Line>
      <Box flexDirection='row'>
        <Padding/>
        {
          code.map((c, i) => (
            <Box key={i} paddingX={1}
              borderStyle='single'
              borderColor={i === index ? theme.accent : 'gray'}
            >
              <Text bold>{c}</Text>
            </Box>
          ))
        }
      </Box>
      { error && <Error>{error}</Error>}
      { loading && <Loading> Verifying code ...</Loading>}
      <Newline/>
    </>
  )
}
