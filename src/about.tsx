import React from 'react'
import { Text } from 'ink'

import { Title, Line, Divider, Field } from './util'
import { theme } from './theme'
import { BASE_URL as BASE_URL_LISTINGS } from './api/listings'
import { BASE_URL as BASE_URL_VIDEOS } from './api/videos'
import { BASE_URL as BASE_URL_AUTH } from './api/auth'


export const About = () => {
  return (
    <>
      <Title>❓ About this CLI</Title>
      <Line><Text>Yeah there was no real reason to do this honestly.</Text></Line>
      <Line><Text>However, I enjoyed building it, and I think thats what counts.</Text></Line>
      <Divider/>
      <Field label='Listings URL'>
        <Text color={theme.primary}>{BASE_URL_LISTINGS}</Text>
      </Field>
      <Field label='Videos URL'>
        <Text color={theme.primary}>{BASE_URL_VIDEOS}</Text>
      </Field>
      <Field label='Auth URL'>
        <Text color={theme.primary}>{BASE_URL_AUTH}</Text>
      </Field>
    </>
  )
}
