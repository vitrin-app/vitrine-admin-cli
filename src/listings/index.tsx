import React from 'react'

import { Title, Menu } from '../util'
import { Route } from '../router'
import { AllListings } from './all'
import { UnapprovedListings } from './unapproved'
import { ApprovedListings } from './approved'
import { HiddenListings } from './hidden'
import { Listing } from './single'


export const Listings = () => {

  return (
    <>
      <Route path='listings/home'>
        <Title>⚡ Listings</Title>
        <Menu
          routes={[
            { title: '❔ Unapproved Listings', path: 'listings/unapproved' },
            { title: '🔮 All Listings', path: 'listings/all' },
            { title: '✅ Approved Listings', path: 'listings/approved' },
            { title: '👺 Hidden Listings', path: 'listings/hidden' },
          ]}
        />
      </Route>
      <Route path='listings/all'>
        <AllListings/>
      </Route>
      <Route path='listings/approved'>
        <ApprovedListings/>
      </Route>
      <Route path='listings/unapproved'>
        <UnapprovedListings/>
      </Route>
      <Route path='listings/hidden'>
        <HiddenListings/>
      </Route>
      <Route path='listings/single/:id'>
        <Listing/>
      </Route>
    </>
  )
}
