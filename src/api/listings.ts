import { get, put, del } from './base'


export const BASE_URL = process.env['API_LISTS_URL'] || 'https://list.vitrine.cloud'


export const getAll = async (token: string) => {
  return await get(BASE_URL + '/admin/all', token)
}


export const getApproved = async (token: string) => {
  return await get(BASE_URL + '/admin/approved', token)
}


export const getUnapproved = async (token: string) => {
  return await get(BASE_URL + '/admin/unapproved', token)
}


export const getHidden = async (token: string) => {
  return await get(BASE_URL + '/admin/hidden', token)
}


export const getUser = async (email: string, token: string) => {
  return await get(BASE_URL + '/admin/user/?email=' + email, token)
}


export const approve = async (listing: string, token: string) => {
  await put(BASE_URL + '/admin/approve/' + listing, undefined, token)
}


export const hide = async (listing: string, token: string) => {
  await put(BASE_URL + '/admin/hide/' + listing, undefined, token)
}


export const unhide = async (listing: string, token: string) => {
  await put(BASE_URL + '/admin/unhide/' + listing, undefined, token)
}


export const purge = async (listing: string, token: string) => {
  await del(BASE_URL + '/admin/purge/' + listing, token)
}


export const bump = async (listing: string, token: string) => {
  await put(BASE_URL + '/admin/bump/' + listing, undefined, token)
}
