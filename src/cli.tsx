#!/usr/bin/env node

import React from 'react'
import { render, Box } from 'ink'

import { App } from './app'
import { Routed } from './router'


const CLI = () => (
  <Box flexDirection='column'>
    <Routed><App/></Routed>
  </Box>
)
render(<CLI/>)

