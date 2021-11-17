#!/usr/bin/env node
import React from 'react'
import { render, Box } from 'ink'

import { App } from './app'
import { Router } from './router'


const CLI = () => (
  <Box flexDirection='column'>
    <Router><App/></Router>
  </Box>
)
render(<CLI/>)

