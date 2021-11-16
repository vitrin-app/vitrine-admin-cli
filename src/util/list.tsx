import React, { useState } from 'react'
import { Text, Box, useInput } from 'ink'

import { Accent, Faded } from '../theme'


const DISPLAY_COUNT = 8
const SCROLL_THRESHOLD = 3

export interface ListProps<T> {
  items: T[]
  showCounter?: boolean
  each: (item: T, focused: boolean) => React.ReactNode,
  onSelect?: (item: T) => void
}

export function List<T>({ items, each, onSelect, showCounter }: ListProps<T>) {
  const [index, setIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const [view, setView] = useState(items.slice(0, DISPLAY_COUNT))

  useInput((_, key) => {
    let newIndex = index

    if (key.downArrow) {
      if (index < items.length - 1) {
        newIndex = index + 1
      }
    } else if (key.upArrow) {
      if (index > 0) {
        newIndex = index - 1
      }
    } else if (key.return && onSelect) {
      onSelect(items[index]!)
    }

    let newOffset = offset
    if (newIndex > offset + DISPLAY_COUNT - SCROLL_THRESHOLD && offset < items.length - DISPLAY_COUNT) {
      newOffset = newIndex - DISPLAY_COUNT + SCROLL_THRESHOLD
    } else if (newIndex < offset + SCROLL_THRESHOLD && offset > 0) {
      newOffset = newIndex - SCROLL_THRESHOLD
    }

    setView(items.slice(newOffset, newOffset + DISPLAY_COUNT))
    setOffset(newOffset)
    setIndex(newIndex)
  })

  return (
    <>
      { showCounter && items.length > 0 && <Faded>{index + 1}/{items.length}</Faded> }
      {
        view.map((item, i) =>
          <Box key={i}>
            {i + offset === index ? <Accent>▶ </Accent> : <Text>  </Text>}
            {each(item, i + offset === index)}
          </Box>
        )
      }
    </>
  )
}
