import React from 'react'

import { BaseListing } from './base'
import { Title } from '../util'
import { getHidden } from '../api/listings'


export const HiddenListings = () => (
  <>
    <Title>👺 Hidden Listings</Title>
    <BaseListing fetch={getHidden} />
  </>
)
