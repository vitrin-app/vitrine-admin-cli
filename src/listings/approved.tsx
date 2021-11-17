import React from 'react'

import { BaseListing } from './base'
import { Title } from '../util'
import { getApproved } from '../api/listings'


export const ApprovedListings = () => (
  <>
    <Title>✅ Approved Listings</Title>
    <BaseListing fetch={getApproved} />
  </>
)
