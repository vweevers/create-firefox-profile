'use strict'

const tempy = require('tempy')
const fs = require('fs')
const path = require('path')

module.exports = function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (opts == null) {
    opts = {}
  }

  const prefs = {
    'browser.shell.checkDefaultBrowser': false
  }

  if (opts.proxy) {
    const m = /^(?:http:\/\/)?([^:/]+)(?::(\d+))?/.exec(opts.proxy)
    const host = JSON.stringify(m[1])
    const port = m[2] || 80

    prefs['network.proxy.http'] = host
    prefs['network.proxy.http_port'] = port
    prefs['network.proxy.type'] = 1
    prefs['browser.cache.disk.capacity'] = 0
    prefs['browser.cache.disk.smart_size.enabled'] = false
    prefs['browser.cache.disk.smart_size.first_run'] = false
    prefs['browser.sessionstore.resume_from_crash'] = false
    prefs['browser.startup.page'] = 0
    prefs['network.proxy.no_proxies_on'] = JSON.stringify(opts.noProxy || '')
  }

  if (opts.prefs) {
    for (let key of Object.keys(opts.prefs)) {
      if (opts.prefs[key] != null) {
        prefs[key] = JSON.stringify(opts.prefs[key])
      }
    }
  }

  const profile = Object.keys(prefs)
    .reduce((acc, key) => `${acc}user_pref('${key}', ${prefs[key]});\n`, '')

  const profileFolder = tempy.directory()

  fs.writeFile(path.join(profileFolder, 'user.js'), profile, (err) => {
    if (err) return callback(err)

    callback(null, profileFolder)
  })
}
