import React, { useCallback } from 'react'
import { Text, Box, Spacer } from 'ink'

import { useAuth } from '../auth'
import { List, Loading, useCachedList } from '../util'
import { theme } from '../theme'


export const BaseVideos = ({ fetch }) => {
  const { token } = useAuth()

  const doFetch = useCallback(
    async () => (await fetch(token)),
    [fetch, token]
  )

  const videos = useCachedList<any>(doFetch, video => `videos/single/${video.id}`)

  return (
    <>
      <List items={videos.items}
        startIndex={videos.index}
        each={(video, focused) =>
          <Box width='75%'>
            <Text color={focused ? theme.accent : 'white'}>{video.owner?.email ?? '??'}</Text>
            <Spacer/>
            <Text color={focused ? theme.accent : 'gray'}>
              {new Date(video.uploaded).toLocaleString()}
            </Text>
          </Box>
        }
        onSelect={videos.open}
        showCounter={true}
      />
      {videos.loading && <Loading>Loading videos ...</Loading>}
    </>
  )
}
