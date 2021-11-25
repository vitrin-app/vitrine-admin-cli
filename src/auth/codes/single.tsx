import React from 'react'
import { Text } from 'ink'

import { purgeCode, resendCode } from '../../api/auth'
import { useAuth } from '..'
import { Title, Field, Actions } from '../../util'
import { Faded } from '../../theme'
import { useRoute, useRouter } from '../../router'


export const AuthCode = () => {
  const { meta } = useRoute()
  const { back } = useRouter()
  const { token } = useAuth()
  const code = meta.item

  return (
    <>
      <Title>Authentication Code</Title>

      <Field label='✉️  Email'>
        <Faded>{ code.email }</Faded>
      </Field>
      <Field label='#️⃣  Value'>
        <Faded>{ code.code }</Faded>
      </Field>
      <Field label='⏱️  Created At'>
        <Text>
          { new Date(code.created_at).toLocaleString() }
        </Text>
      </Field>

      <Actions actions={[
        {
          label: 'Resend',
          hint: 'resends the email containing the code.',
          action: async () => {
            await resendCode(code.code, code.email, token)
          }
        },
        {
          label: 'Purge',
          hint: 'deletes the authentication code, making it invalid.',
          action: async () => {
            await purgeCode(code.code, code.email, token)
            back()
          }
        },
      ]}/>
    </>
  )
}
