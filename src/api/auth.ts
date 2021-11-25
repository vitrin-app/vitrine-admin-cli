import { get, post, del } from './base'


const BASE_URL = process.env['API_AUTH_URL'] || 'https://auth.vitrin.cloud'


export const verifyEmail = async (email: string) => {
  await post(BASE_URL, { email })
}


export const confirm = async (code: string, email: string) => {
  return await get(BASE_URL + `?code=${code}&email=${email}`)
}


export const getAllCodes = async (token: string) => {
  return await get(BASE_URL + '/admin/all', token)
}


export const purgeCode = async (code: string, email: string, token: string) => {
  return await del(BASE_URL + `/admin/purge?code=${code}&email=${email}`, token)
}


export const resendCode = async (code: string, email: string, token: string) => {
  return await post(BASE_URL + `/admin/resend?code=${code}&email=${email}`, {}, token)
}
