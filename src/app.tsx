import React from 'react'
import { Text } from 'ink'
import { Authenticated } from './login'


export const App = () => {
  return (
    <Authenticated><Text>Hellow There!</Text></Authenticated>
  )
}
