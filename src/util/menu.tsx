import React from 'react'
import { Text } from 'ink'

import { List } from './list'
import { useRouter } from '../router'
import { theme } from '../theme'


export interface MenuProps {
  routes: {title: string, path: string}[]
}


export const Menu = ({ routes }: MenuProps) => {
  const { route } = useRouter()

  return (
    <List
      items={routes}
      each={(item, focused) => (
        <Text color={focused ? theme.accent : 'white'}>{item.title}</Text>
      )}
      onSelect={item => route(item.path)}
    />
  )
}
