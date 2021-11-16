import fetch from 'isomorphic-fetch'


export const request = async (method: string, url: string, body?: any, token?: any) => {
  const opts: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...( token ? { 'Auhtorization': `Bearer ${token}`} : {}),
    },
  }

  if (body) {
    opts.body = JSON.stringify(body)
  }

  const response = await fetch(url, opts)

  if (!response.ok) {
    throw new Error((await response.json()).message)
  } else {
    try {
      return await response.json()
    } catch {
      return
    }
  }
}


export const get = (url: string, token?: any) => request('GET', url, undefined, token)
export const post = (url: string, body?: any, token?: any) => request('POST', url, body, token)
export const put = (url: string, body?: any, token?: any) => request('PUT', url, body, token)
export const del = (url: string, token?: any) => request('DELETE', url, undefined, token)
