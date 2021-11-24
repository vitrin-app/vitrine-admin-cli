import React, { useState, useCallback, useEffect } from 'react'
import { Text } from 'ink'
import TextInput from 'ink-text-input'
import { useDebounce } from 'react-use'

import { useRouter, useRoute } from '../router'
import { getUser } from '../api/listings'
import { BaseListing } from './base'
import { Accent } from '../theme'
import { Title, Line, Divider } from '../util'


export const UserListings = () => {
  const { route } = useRouter()
  const { path, meta } = useRoute()
  const [email, setEmail] = useState('')
  const [debouncedEmail, setDebouncedEmail] = useState('')

  const [_, cancel] = useDebounce(() => {
    route(path, true, { email })
    setDebouncedEmail(email)
  }, 500, [email])

  useEffect(() => {
    if (meta && meta.email) {
      setEmail(meta.email)
      setTimeout(() => cancel(), 1)
    }
  }, [])

  const fetch = useCallback((token) => getUser(debouncedEmail, token), [debouncedEmail])

  return (
    <>
      <Title>😎 User Listings</Title>
      <Line>
        <Text>
          Enter the email address of the user whose listings you want to see
        </Text>
      </Line>
      <Line>
        <Accent>
        🔍
          <TextInput placeholder="User's email address ..."
            showCursor={true}
            value={email}
            onChange={setEmail}
          />
        </Accent>
      </Line>
      <Divider/>
      <BaseListing fetch={fetch}/>
    </>
  )
}
