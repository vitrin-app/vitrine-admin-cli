import React, { useEffect, useState } from 'react'
import { Text, Box, Spacer } from 'ink'

import { useAuth } from '../auth'
import { useRouter } from '../router'
import { getAllListings } from '../api/listings'
import { Title, List, Loading } from '../util'
import { theme } from '../theme'


export const AllListings = () => {
  const { route } = useRouter()
  const { token } = useAuth()
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (
      async () => {
        setLoading(true)
        setListings((await getAllListings(token)).listings)
        setLoading(false)
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
