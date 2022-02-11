import { get, del } from './base'


export const BASE_URL = process.env['API_VIDEOS_URL'] || 'https://video.vitrin.cloud'


export const getAll = async (token: string) => {
  return await get(BASE_URL + '/admin/all', token)
}


export const getUnlinked = async (token: string) => {
  return await get(BASE_URL + '/admin/unlinked', token)
}


export const purge = async (video: string, token: string) => {
  return await del(BASE_URL + '/admin/purge/' + video, token)
}

