import React from 'react'
import { Text } from 'ink'
import Link from 'ink-link'
import open from 'open'

import { purge } from '../api/videos'
import { useAuth } from '../auth'
import { Title, Field, Actions } from '../util'
import { Faded } from '../theme'
import { useRoute, useRouter } from '../router'


export const Video = () => {
  const { meta } = useRoute()
  const { back } = useRouter()
  const { token } = useAuth()
  const video = meta.video

  return (
    <>
      <Title>Video</Title>

      <Field label='⚡ Token'>
        <Link fallback={false} url={video.url}>
          <Faded>{ video.token }</Faded>
        </Link>
      </Field>
      <Field label='🤡 Uploader'>
        <Faded>{ video.owner.email }</Faded>
      </Field>
      <Field label='⏱️  Upload time'>
        <Text>
          { new Date(video.uploaded).toLocaleString() }
        </Text>
      </Field>
      <Field label='🔗 Listing'>{
        video.listing ?
          <Link fallback={false} url={`https://web.vitrin.cloud/listing/${video.listing}`}>
            { video.listing }
          </Link>
          : <Text>❌ Not Linked</Text>
      }
      </Field>

      <Actions actions={[
        {
          label: 'Open',
          hint: 'opens the video in a browser',
          action: async () => {
            open(video.url)
          }
        },
        {
          label: 'Open Listing',
          hint: 'opens the listing of this video.',
          action: async () => {
            open(`https://web.vitrin.cloud/listing/${video.listing}`)
          }
        },
        {
          label: 'Purge',
          hint: 'removes the listing and its video.',
          action: async () => {
            await purge(video.token, token)
            back()
          }
        },
      ]}/>
    </>
  )
}
