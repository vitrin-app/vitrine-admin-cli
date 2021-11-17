import React from 'react'

import { BaseVideos } from './base'
import { Title } from '../util'
import { getAll } from '../api/videos'


export const AllVideos = () => (
  <>
    <Title>🎦 All Videos</Title>
    <BaseVideos fetch={getAll} />
  </>
)
