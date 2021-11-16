import React, { createContext, useState, useContext, useEffect } from 'react'

import { Route, useRouter } from '../router'
import { Loading } from '../util/loading'
import { Confirm } from './confirm'
import { Login } from './login'
import { save, load } from './persist'


export const AuthContext = createContext({ token: '' })


export const Authenticated = ({ children }) => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)
  const { route } = useRouter()

  useEffect(() => {
    (async () => {
      const _token = await load()
      setLoading(false)

      if (_token) {
        setToken(_token)
        route('home')
      } else {
        route('login')
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ token }}>
      <Route path='login'>
        <Login next={() => route('login/confirm')} />
      </Route>
      <Route path='login/confirm'>
        <Confirm next={t => {
          setToken(t)
          route('home')
          save(t)
        }} />
      </Route>
      { token ? children : <></> }
      { loading && <Loading>Checking authentication ...</Loading>}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
