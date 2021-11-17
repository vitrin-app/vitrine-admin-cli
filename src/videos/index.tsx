import React from 'react'

import { Title, Menu } from '../util'
import { Route } from '../router'
import { AllVideos } from './all'
import { UnlinkedVideos } from './unlinked'
import { Video } from './single'


export const Videos = () => {

  return (
    <>
      <Route path='videos/home'>
        <Title>🎬 Videos</Title>
        <Menu
          routes={[
            { title: '🎦 All Videos', path: 'videos/all' },
            { title: '🖇️  Unlinked Videos', path: 'videos/unlinked' },
          ]}
        />
      </Route>
      <Route path='videos/all'>
        <AllVideos/>
      </Route>
      <Route path='videos/unlinked'>
        <UnlinkedVideos/>
      </Route>
      <Route path='videos/single/:id'>
        <Video/>
      </Route>
    </>
  )
}
