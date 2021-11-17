import React, { useEffect, useState } from 'react'
import { Text, Box, Spacer } from 'ink'

import { useAuth } from '../auth'
import { useRouter, useRoute } from '../router'
import { getAll } from '../api/listings'
import { Title, List, Loading } from '../util'
import { theme } from '../theme'


export const AllListings = () => {
  const { meta, path } = useRoute()
  const { route } = useRouter()
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
          const l = (await getAll(token)).listings
          setListings(l)
          setLoading(false)
          route(path, true, { listings: l })
        }
      }
    )()
  }, [token])

  return (
    <>
      <Title>🔮 All Listings</Title>
      <List items={listings}
        each={(listing, focused) =>
          <Box width='75%'>
            <Text color={focused ? theme.accent : 'white'}>{listing.title}</Text>
            <Spacer/>
            <Text color={focused ? theme.accent : 'gray'}>
              {new Date(listing.submit_time).toLocaleString()}
            </Text>
          </Box>
        }
        onSelect={listing => route(`listings/single/${listing.id}`, false, { listing })}
        showCounter={true}
      />
      {loading && <Loading>Loading listings ...</Loading>}
    </>
  )
}
