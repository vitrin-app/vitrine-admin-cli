import React from 'react'
import { Newline } from 'ink'

import { Authenticated } from './auth'
import { Route } from './router'
import { Title, Menu } from './util'
import { Listings } from './listings'
import { Videos } from './videos'
import { About } from './about'


export const App = () => {
  return (
    <Authenticated>
      <Route path='home'>
        <Title>Vitrine Admin CLI 🚀</Title>
        <Menu
          routes={[
            { title: '⚡ Listings', path: 'listings/home' },
            { title: '🎬 Videos', path: 'videos/home' },
            { title: '❓ About this CLI', path: 'about'}
          ]}
        />
      </Route>
      <Route path='listings/**'><Listings/></Route>
      <Route path='videos/**'><Videos/></Route>
      <Route path='about'><About/></Route>
      <Newline/>
    </Authenticated>
  )
}
