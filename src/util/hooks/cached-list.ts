import { useState, useCallback } from 'react'
import useAsync from 'react-use/lib/useAsync'

import { useRoute, useRoutingUtils } from '../../router'


export const useCachedList = <T>(
  fetch: () => Promise<T[]>,
  url: (item: T) => string
) => {
  const { meta } = useRoute()
  const { attachMeta, attachMetaAndRoute } = useRoutingUtils()

  const [items, setItems] = useState<T[]>(meta?.items || [])
  const { loading } = useAsync(async () => {
    if (meta && meta.items) {
      setItems(meta.items)
    } else if (fetch) {
      const _items = await fetch()
      setItems(_items)
      attachMeta({ items: _items })
    }
  }, [fetch])

  const open = useCallback((item: T | undefined, index: number) => {
    if (item) {
      attachMetaAndRoute({ index }, url(item), { item })
    }
  }
  , [attachMetaAndRoute])

  return {
    items,
    loading,
    open,
    index: meta?.index || 0,
  }
}
