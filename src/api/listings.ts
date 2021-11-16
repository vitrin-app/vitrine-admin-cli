import { get } from './base'


const BASE_URL = process.env['LISTS_URL'] || 'https://list.vitrin.cloud'


export const getAllListings = async (token: string) => {
  return await get(BASE_URL + '/admin/all', token)
}
