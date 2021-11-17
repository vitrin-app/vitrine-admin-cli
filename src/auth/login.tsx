import React, { useState, useEffect } from 'react'
import { Text } from 'ink'
import TextInput from 'ink-text-input'

import { useHint } from '../hint'
import { Accent, Error } from '../theme'
import { Title, Loading, Line } from '../util'
import { verifyEmail } from '../api/auth'


const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


export const Login = ({ next }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const { hint } = useHint()

  useEffect(() => {
    hint(['↩: submit email'])
  }, [])

  const submit = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
    } else {
      setError(undefined)
      setLoading(true)

      try {
        await verifyEmail(email)
        setLoading(false)
        next(email)
      } catch (err: any) {
        setLoading(false)
        setError(err.message)
      }
    }
  }

  return (
    <>
      <Title>🔑 Login</Title>
      <Line><Text>👉 Please enter your email address.</Text></Line>
      <Line>
        <Accent>
          <TextInput placeholder='Your email address ...'
            showCursor={false}
            value={email}
            onChange={setEmail}
            onSubmit={submit}/>
        </Accent>
      </Line>
      { error && <Error>{error}</Error> }
      { loading && <Loading>Sending verification email ...</Loading>}
      <Line><Text/></Line>
    </>
  )
}
