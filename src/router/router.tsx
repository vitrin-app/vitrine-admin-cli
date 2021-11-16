import React, { useState, createContext, useContext } from 'react'
import { useInput, useApp } from 'ink'


export type Path = { url: string, meta?: any }


export interface Router {
  path: Path
  history: Path[]
  route: (url: string, replace?: boolean, meta?: any) => void
  back: () => void,
}


const RouterContext = createContext<Router>(undefined as any)


export const Router = ({children}) => {
  const [history, setHistory] = useState<Path[]>([{ url: '' }])
  const { exit } = useApp()

  const router: Router = {
    history,
    path: history[history.length - 1]!,
    route: (url, replace = false, meta = undefined) => {
      if (replace) {
        setHistory(history.slice(0, history.length - 1).concat({ url, meta }))
      } else {
        setHistory(history.concat({ url, meta }))
      }
    },
    back: () => {
      if (history.length > 1) {
        setHistory(history.slice(0, history.length - 1))
      } else {
        exit()
      }
    }
  }

  useInput((_, key) => {
    if (key.escape) {
      router.back()
    }
  })

  return <RouterContext.Provider value={router}>
    {children}
  </RouterContext.Provider>
}


export const useRouter = () => useContext(RouterContext)

