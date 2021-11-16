import React from 'react'
import match from 'minimatch'
import { useState, createContext, useContext } from 'react'


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

const RouterContext = createContext({ path: '', route: (_: string) => {} })

export const Router = ({children}) => {
  const [path, route] = useState('')

  return <RouterContext.Provider value={{ path, route }}>
    {children}
  </RouterContext.Provider>
}

export const useRouter = () => useContext(RouterContext)

export const RouteContext = createContext({ path: '', params: {} as any })

export const Route = ({ path, children }) => {
  const router = useRouter()
  const { matched, params } = process(path, router.path)

  return <RouteContext.Provider value={{ path, params }}>
    {matched && children}
  </RouteContext.Provider>
}

export const useRoute = () => useContext(RouteContext)
