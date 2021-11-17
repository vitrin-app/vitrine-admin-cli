import { get, put, del } from './base'


const BASE_URL = process.env['LISTS_URL'] || 'https://list.vitrin.cloud'


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
