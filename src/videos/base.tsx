import React, { useState } from 'react'
import { Text, Box, Spacer } from 'ink'
import { useAsync } from 'react-use'

import { useAuth } from '../auth'
import { useRouter, useRoute } from '../router'
import { List, Loading } from '../util'
import { theme } from '../theme'


export const BaseVideos = ({ fetch }) => {
  const { meta, path } = useRoute()
  const { route, history, rewrite } = useRouter()
  const { token } = useAuth()
  const [videos, setVideos] = useState<any[]>(meta?.videos || [])

  const { loading } = useAsync(async () => {
    if (meta && meta.videos) {
      setVideos(meta.videos)
    } else {
      const l = (await fetch(token))
      setVideos(l)
      route(path, true, { videos: l })
    }
  }, [token])

  const open = (video, index) => {
    const _history = [...history]
    _history[_history.length - 1] = {
      url: _history[_history.length - 1]!.url,
      meta: {
        videos, index
      }
    }

    _history.push({
      url: `videos/single/${video.token}`,
      meta: { video }
    })

    rewrite(_history)
  }

  return (
    <>
      <List items={videos}
        startIndex={meta?.index || 0}
        each={(video, focused) =>
          <Box width='75%'>
            <Text color={focused ? theme.accent : 'white'}>{video.owner.email}</Text>
            <Spacer/>
            <Text color={focused ? theme.accent : 'gray'}>
              {new Date(video.uploaded).toLocaleString()}
            </Text>
          </Box>
        }
        onSelect={open}
        showCounter={true}
      />
      {loading && <Loading>Loading videos ...</Loading>}
    </>
  )
}
