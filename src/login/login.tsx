import React, { useState } from 'react'
import { Text } from 'ink'
import TextInput from 'ink-text-input'

import { Primary, Error } from '../theme'
import { Loading } from '../util/loading'
import { verifyEmail } from '../api/auth'


const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


export const Login = ({ next }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

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
      <Text>👉 Please enter your email address.</Text>
      <Primary>
        <TextInput placeholder='Your email address ...'
          value={email}
          onChange={setEmail}
          onSubmit={submit}/>
      </Primary>
      { error && <Error>{error}</Error> }
      { loading && <Loading>Sending verification email ...</Loading>}
    </>
  )
}
