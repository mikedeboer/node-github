'use strict'

var Client = require('./../lib/index')
var testAuth = require('./../testAuth.json')

var github = new Client({
  debug: true
})

github.authenticate({
  type: 'oauth',
  token: testAuth['token']
})

github.repos.createStatus({
  owner: 'kaizensoze',
  repo: 'test2',
  sha: '81c559e2e8551982235bc86594cd86ffb135b053',
  state: 'success'
}, function (err, res) {
  console.log(err, res)
})
