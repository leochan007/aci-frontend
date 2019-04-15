'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  TIMEOUT: '10000',
  BACKEND_URL: '"https://credit-stg.alphacario.com"',
  ACCOUNT: '"alphacarshow"',
  ACCOUNT_URL: '"https://kylin.eosx.io/account/"',
  TX_URL: '"https://kylin.eosx.io/tx/"'
})
