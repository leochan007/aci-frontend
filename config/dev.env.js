'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TIMEOUT: '10000',
  BACKEND_URL: '"http://0.0.0.0:3000"',
  EOSTRACE_URL: '"http://0.0.0.0:4200/search?q="'
})
