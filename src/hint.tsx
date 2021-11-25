import React, { useContext, useState, createContext } from 'react'
import { Text } from 'ink'

import { Faded } from './theme'
import { Line } from './util'


const HintContext = createContext({ hint: (_: string[]) => {} })

export const useHint = () => useContext(HintContext)

export const Hinted = ({ children }) => {
  const [lines, setLines] = useState<string[]>([])

  return (
    <HintContext.Provider value={{ hint: setLines }}>
      {children}
      <Line><Text/></Line>
      <Line><Text/></Line>
      {
        lines.map((line, i) => (<Line key={i}><Faded>{line}</Faded></Line>))
      }
    </HintContext.Provider>
  )
}
