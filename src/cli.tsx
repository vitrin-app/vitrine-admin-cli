#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'

import { App } from './app'
import { Router } from './router'


const CLI = () => (<Router><App/></Router>)
render(<CLI/>)

