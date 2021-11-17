import React from 'react'
import { Text, useApp } from 'ink'

import { useRouter } from '../router'
import { Line, Actions, Title } from '../util'


export const Logout = ({ action }) => {
  const { exit } = useApp()
  const { back } = useRouter()

  return (
    <>
      <Title>🔒 Logout</Title>
      <Line>
        <Text>Are you sure you want to log out?</Text>
      </Line>
      <Actions
        actions={[
          {
            label: 'No',
            hint: 'No, I want to stay logged in.',
            action: async () => back(),
          },
          {
            label: 'Yes',
            hint: 'Yes, log me out.',
            action: async () => {
              await action()
              exit()
            },
          },
        ]}/>
    </>
  )
}
