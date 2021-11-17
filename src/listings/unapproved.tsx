import React from 'react'

import { BaseListing } from './base'
import { Title } from '../util'
import { getUnapproved } from '../api/listings'


export const UnapprovedListings = () => (
  <>
    <Title>❔ Unapproved Listings</Title>
    <BaseListing fetch={getUnapproved} />
  </>
)
