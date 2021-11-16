import React from 'react'

import { Title, Menu } from '../util'
import { Route } from '../router'
import { AllListings } from './all'
import { Listing } from './single'


export const Listings = () => {

  return (
    <>
      <Route path='listings/home'>
        <Title>⚡ Listings</Title>
        <Menu
          routes={[
            { title: '🔮 All Listings', path: 'listings/all' },
          ]}
        />
      </Route>
      <Route path='listings/all'>
        <AllListings/>
      </Route>
      <Route path='listings/single/:id'>
        <Listing/>
      </Route>
    </>
  )
}
