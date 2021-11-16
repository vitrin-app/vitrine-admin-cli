import React, { createContext, useContext } from 'react'
import match from 'minimatch'

import { useRouter } from './router'

export const RouteContext = createContext({ path: '', params: {} as any, meta: undefined as any})


export const Route = ({ path, children }) => {
  const router = useRouter()
  const { matched, params } = process(path, router.path.url)

  return <RouteContext.Provider value={{ path, params, meta: router.path.meta }}>
    {matched && children}
  </RouteContext.Provider>
}


export const useRoute = () => useContext(RouteContext)


const process = (pattern: string, path: string) => {
  const matched = match(path, pattern.replace(/:[a-zA-Z0-9]+/g, '*'))
  const params = {}

  if (matched) {
    const split = pattern.split('/')
    const pathsplit = path.split('/')

    split.forEach((step, index) => {
      if (step.startsWith(':')) {
        params[step.slice(1)] = pathsplit[index]
      }
    })
  }

  return { matched, params }
}
