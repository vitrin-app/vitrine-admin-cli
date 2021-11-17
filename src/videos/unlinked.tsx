import React from 'react'

import { BaseVideos } from './base'
import { Title } from '../util'
import { getUnlinked } from '../api/videos'


export const UnlinkedVideos = () => (
  <>
    <Title>🖇️  Unlinked Videos</Title>
    <BaseVideos fetch={getUnlinked} />
  </>
)
