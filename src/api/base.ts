import fetch from 'isomorphic-fetch'
import chalk from 'chalk'

import { theme } from '../theme'


export const request = async (method: string, url: string, body?: any, token?: string) => {
  const opts: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (token) {
    opts.headers.Authorization = `Bearer ${token}`
  }

  if (body) {
    opts.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, opts)

    if (!response.ok) {
      let message = await response.text()
      try {
        message = JSON.parse(message).message
      } catch (error) {
        console.log(chalk.hex(theme.error)(error))
      }

      throw new Error(message)
    } else {
      try {
        return await response.json()
      } catch  {
        return
      }
    }
  } catch (error) {
    console.log(chalk.hex(theme.error)(error))
  }
}


export const get = (url: string, token?: string) => request('GET', url, undefined, token)
export const post = (url: string, body?: any, token?: string) => request('POST', url, body, token)
export const put = (url: string, body?: any, token?: string) => request('PUT', url, body, token)
export const del = (url: string, token?: string) => request('DELETE', url, undefined, token)
