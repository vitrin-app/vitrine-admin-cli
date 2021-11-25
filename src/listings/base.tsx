import React, { useCallback } from 'react'
import { Text, Box, Spacer } from 'ink'

import { useAuth } from '../auth'
import { List, Loading, useCachedList } from '../util'
import { theme } from '../theme'


export const BaseListing = ({ fetch }) => {
  const { token } = useAuth()

  const doFetch = useCallback(
    async () => (await fetch(token)).listings,
    [fetch, token]
  )

  const listings = useCachedList<any>(doFetch, listing => `listings/single/${listing.id}`)

  return (
    <>
      <List items={listings.items}
        startIndex={listings.index}
        each={(listing, focused) =>
          <Box width='75%'>
            <Text color={focused ? theme.accent : 'white'}>{listing.title}</Text>
            <Spacer/>
            <Text color={focused ? theme.accent : 'gray'}>
              {new Date(listing.submit_time).toLocaleString()}
            </Text>
          </Box>
        }
        onSelect={listings.open}
        showCounter={true}
      />
      {listings.loading && <Loading>Loading listings ...</Loading>}
    </>
  )
}
