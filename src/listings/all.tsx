import React from 'react'

import { BaseListing } from './base'
import { Title } from '../util'
import { getAll } from '../api/listings'


export const AllListings = () => (
  <>
    <Title>🔮 All Listings</Title>
    <BaseListing fetch={getAll} />
  </>
)
