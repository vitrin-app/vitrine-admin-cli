import React, { useEffect, useState } from 'react'
import { Text, Box, Spacer } from 'ink'

import { useAuth } from '../auth'
import { useRouter, useRoute } from '../router'
import { List, Loading } from '../util'
import { theme } from '../theme'


export const BaseListing = ({ fetch, process = x => x }) => {
  const { meta, path } = useRoute()
  const { route, history, rewrite } = useRouter()
  const { token } = useAuth()
  const [listings, setListings] = useState<any[]>(meta?.listings || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (
      async () => {
        if (meta && meta.listings) {
          setListings(meta.listings)
          setLoading(false)
        } else {
          setLoading(true)
          const l = (await fetch(token)).listings
          setListings(l)
          setLoading(false)
          route(path, true, { listings: l })
        }
      }
    )()
  }, [token])

  const open = (listing, index) => {
    const _history = [...history]
    _history[_history.length - 1] = {
      url: _history[_history.length - 1]!.url,
      meta: {
        listings, index
      }
    }

    _history.push({
      url: `listings/single/${listing.id}`,
      meta: { listing: process(listing) }
    })

    rewrite(_history)
  }

  return (
    <>
      <List items={listings}
        startIndex={meta?.index || 0}
        each={(listing, focused) =>
          <Box width='75%'>
            <Text color={focused ? theme.accent : 'white'}>{listing.title}</Text>
            <Spacer/>
            <Text color={focused ? theme.accent : 'gray'}>
              {new Date(listing.submit_time).toLocaleString()}
            </Text>
          </Box>
        }
        onSelect={open}
        showCounter={true}
      />
      {loading && <Loading>Loading listings ...</Loading>}
    </>
  )
}
