import { useCallback } from 'react'

import { useRoute } from './route'
import { useRouter } from './router'


export const useRoutingUtils = () => {
  const { meta, path }  = useRoute()
  const { route, history, rewrite } = useRouter()

  const attachMeta = useCallback(
    attachment => route(path, true, { ...meta, ...attachment}),
    [route, path, meta]
  )

  const attachMetaAndRoute = useCallback(
    (attachment, url, newMeta) => {
      const _history = [...history]
      _history[_history.length - 1] = {
        url: _history[_history.length - 1]!.url,
        meta: { ...meta, ...attachment },
      }

      _history.push({ url, meta: newMeta })

      rewrite(_history)
    }
    , [history, rewrite])

  return {
    attachMeta,
    attachMetaAndRoute,
  }
}
