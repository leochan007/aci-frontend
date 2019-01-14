'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  TIMEOUT: '5000',
  BACKEND_URL: '"127.0.0.1:3000"',
  ACCOUNT: '"alphacarshow"',
  ACCOUNT_URL: '"https://kylin.eosx.io/account/"',
  TX_URL: '"https://kylin.eosx.io/tx/"'
})
