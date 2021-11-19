import React, { createContext, useState, useContext, useEffect } from 'react'

import { Route, useRouter } from '../router'
import { Loading } from '../util/loading'
import { Confirm } from './confirm'
import { Login } from './login'
import { Logout } from './logout'
import { save, load, clear } from './persist'


export const AuthContext = createContext({ token: '', logout: () => {} })


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
        route('home', true)
      } else {
        route('login', true)
      }
    })()
  }, [])

  const logout = async () => {
    setToken('')
    await clear()
  }

  return (
    <AuthContext.Provider value={{ token, logout }}>
      <Route path='login'>
        <Login next={email => route('login/confirm', true, { email })} />
      </Route>
      <Route path='login/confirm'>
        <Confirm next={t => {
          setToken(t)
          route('home', true)
          save(t)
        }} />
      </Route>
      <Route path='logout'>
        <Logout action={logout} />
      </Route>
      { token ? children : <></> }
      { loading && <Loading>Checking authentication ...</Loading>}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
