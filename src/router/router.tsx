import React, { useState, createContext, useContext } from 'react'
import { useInput, useApp } from 'ink'

import { Line } from '../util'
import { Faded } from '../theme'


export type Path = { url: string, meta?: any }


export interface Router {
  path: Path
  history: Path[]
  route: (url: string, replace?: boolean, meta?: any) => void
  rewrite: (history: Path[]) => void
  back: () => void,
}


const RouterContext = createContext<Router>(undefined as any)


export const Routed = ({children}) => {
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
    rewrite: (h: Path[]) => setHistory(h),
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
    <Line><Faded>{
      history.length > 1 ?
        '<escape>: go back' :
        '<escape>: exit'
    }</Faded></Line>
  </RouterContext.Provider>
}


export const useRouter = () => useContext(RouterContext)

