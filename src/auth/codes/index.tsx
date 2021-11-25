import React, { useCallback } from 'react'
import { Text, Box, Spacer } from 'ink'

import { getAllCodes } from '../../api/auth'
import { useAuth } from '..'
import { Route } from '../../router'
import { List, Loading, Title, useCachedList } from '../../util'
import { theme } from '../../theme'

import { AuthCode } from './single'


const Base = () => {
  const { token } = useAuth()

  const doFetch = useCallback(
    async () => await getAllCodes(token),
    [token]
  )

  const codes = useCachedList<any>(doFetch, code => `auth/codes/single/${code.code}_${code.email}`)

  return (
    <>
      <List items={codes.items}
        startIndex={codes.index}
        each={(code, focused) =>
          <Box width='75%'>
            <Text color={focused ? theme.accent : 'white'}>{code.email}</Text>
            <Spacer/>
            <Text color={focused ? theme.accent : 'gray'}>
              {new Date(code.created_at).toLocaleString()}
            </Text>
          </Box>
        }
        onSelect={codes.open}
        showCounter={true}
      />
      {codes.loading && <Loading>Loading auth codes ...</Loading>}
    </>
  )
}


export const AuthCodes = () => (
  <>
    <Route path='auth/codes/home'>
      <Title>🔑 Authentication Codes</Title>
      <Base/>
    </Route>
    <Route path='auth/codes/single/:id'>
      <AuthCode/>
    </Route>
  </>
)
