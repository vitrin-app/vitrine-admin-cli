import React from 'react'
import { Text } from 'ink'
import Link from 'ink-link'
import open from 'open'

import { approve, hide, unhide, purge } from '../api/listings'
import { useAuth } from '../auth'
import { Title, Field, Actions } from '../util'
import { Faded } from '../theme'
import { useRoute, useRouter } from '../router'


export const Listing = () => {
  const { meta } = useRoute()
  const { path, route, back } = useRouter()
  const { token } = useAuth()
  const listing = meta.item

  return (
    <>
      <Title>{ listing.title }</Title>

      <Field label='✅ Approved'>
        <Text>{ listing.approved ? 'Yes' : 'No' }</Text>
      </Field>
      <Field label='⚡ Id'>
        <Link fallback={false} url={`https://web.vitrin.cloud/listing/${listing.id}`}>
          <Faded>{ listing.id }</Faded>
        </Link>
      </Field>
      <Field label='⏱️  Submit time'>
        <Text>
          { new Date(listing.submit_time).toLocaleString() }
        </Text>
      </Field>
      <Field label='📍 Location'>
        <Link fallback={false} url={`https://maps.google.com?q=${listing.location.lat},${listing.location.long}`}>
          { listing.location.address }
        </Link>
      </Field>
      <Field label='🎬 Video'>
        <Link fallback={false} url={listing.video.url}>
          { listing.video.token }
        </Link>
      </Field>
      <Field label='✉️  Email'>
        <Text>{listing.contact.email}</Text>
      </Field>
      <Field label='📞 Phone Number'>
        <Text>{listing.contact.phone_number}</Text>
      </Field>
      <Field label='🌍 Public'>
        <Text>{ listing.public ? 'Yes' : 'No' }</Text>
      </Field>

      <Actions actions={[
        {
          label: 'Open',
          disabled: listing.hidden,
          hint: 'opens the listing in a browser',
          action: async () => {
            open(`https://web.vitrin.cloud/listing/${listing.id}`)
          }
        },
        {
          label: 'Approve',
          disabled: listing.approved,
          hint: 'marks the listing as approved.',
          action: async () => {
            await approve(listing.id, token)
            route(path.url, true, { listing: { ...listing, approved: true } })
          }
        },
        {
          label: 'Hide',
          disabled: listing.hidden,
          hint: 'hides the listing, so it cannot be seen anywhere (even with share link).',
          action: async () => {
            await hide(listing.id, token)
            route(path.url, true, { listing: { ...listing, hidden: true } })
          }
        },
        {
          label: 'Unhide',
          disabled: !listing.hidden,
          hint: 'unhides the listing.',
          action: async () => {
            await unhide(listing.id, token)
            route(path.url, true, { listing: { ...listing, hidden: false } })
          }
        },
        {
          label: 'Purge',
          hint: 'removes the listing and its video.',
          action: async () => {
            await purge(listing.id, token)
            back()
          }
        },
      ]}/>
    </>
  )
}
