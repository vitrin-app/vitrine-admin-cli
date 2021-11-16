import { get, post } from './base'


const BASE_URL = process.env['AUTH_URL'] || 'https://auth.vitrin.cloud'


export const verifyEmail = async (email: string) => {
  await post(BASE_URL, { email })
}


export const confirm = async (code: string) => {
  return await get(BASE_URL + `?code=${code}`)
}
