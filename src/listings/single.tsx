import React from 'react'
import { Text } from 'ink'
import Link from 'ink-link'

import { approve, hide, unhide, purge } from '../api/listings'
import { useAuth } from '../auth'
import { Title, Field, Actions } from '../util'
import { Faded } from '../theme'
import { useRoute, useRouter } from '../router'


export const Listing = () => {
  const { meta } = useRoute()
  const { path, route, back } = useRouter()
  const { token } = useAuth()
  const listing = meta.listing

  return (
    <>
      <Title>{ listing.title }</Title>

      <Field label='✅ Approved'>
        <Text>{ listing.approved ? 'Yes' : 'No' }</Text>
      </Field>
      <Field label='⚡ Id'>
        <Link url={`https://web.vitrin.cloud/listing/${listing.id}`}>
          <Faded>{ listing.id }</Faded>
        </Link>
      </Field>
      <Field label='⏱️  Submit time'>
        <Text>
          { new Date(listing.submit_time).toLocaleString() }
        </Text>
      </Field>
      <Field label='📍 Location'>
        <Link url={`https://maps.google.com?q=${listing.location.lat},${listing.location.long}`}>
          { listing.location.address }
        </Link>
      </Field>
      <Field label='🎬 Video'>
        <Link url={listing.video.url}>
          { listing.video.token }
        </Link>
      </Field>
      <Field label='✉️  Email'>
        <Text>{listing.contact.email}</Text>
      </Field>
      <Field label='📞 Phone Number'>
        <Text>{listing.contact.phone_number}</Text>
      </Field>

      <Actions actions={[
        { label: 'Approve', action: async () => {
          await approve(listing.id, token)
          route(path.url, true, { listing: { ...listing, approved: true } })
        } },
        { label: 'Hide', action: async () => {
          await hide(listing.id, token)
        } },
        { label: 'Unhide', action: async () => {
          await unhide(listing.id, token)
        } },
        { label: 'Purge', action: async () => {
          await purge(listing.id, token)
          back()
        } },
      ]}/>
    </>
  )
}
