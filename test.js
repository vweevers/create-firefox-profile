'use strict'

const test = require('tape')
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')
const profile = require('.')

test('default', function (t) {
  t.plan(4)

  profile(function (err, folder) {
    t.ifError(err, 'no profile error')
    t.ok(folder, folder)

    const js = fs.readFileSync(path.join(folder, 'user.js'), 'utf8')
    const expected = fs.readFileSync(fixture('default.js'), 'utf8')

    t.is(js, expected)

    rimraf(folder, { glob: false }, function (err) {
      t.ifError(err, 'no rimraf error')
    })
  })
})

test('proxy', function (t) {
  t.plan(4)

  profile({ proxy: 'http://example.local' }, function (err, folder) {
    t.ifError(err, 'no profile error')
    t.ok(folder, folder)

    const js = fs.readFileSync(path.join(folder, 'user.js'), 'utf8')
    const expected = fs.readFileSync(fixture('proxy.js'), 'utf8')

    t.is(js, expected)

    rimraf(folder, { glob: false }, function (err) {
      t.ifError(err, 'no rimraf error')
    })
  })
})

test('proxy with port', function (t) {
  t.plan(4)

  profile({ proxy: 'http://example.local:3000' }, function (err, folder) {
    t.ifError(err, 'no profile error')
    t.ok(folder, folder)

    const js = fs.readFileSync(path.join(folder, 'user.js'), 'utf8')
    const expected = fs.readFileSync(fixture('proxy-port.js'), 'utf8')

    t.is(js, expected)

    rimraf(folder, { glob: false }, function (err) {
      t.ifError(err, 'no rimraf error')
    })
  })
})

test('custom preference', function (t) {
  t.plan(4)

  profile({ prefs: { foo: true, bar: 'xyz' } }, function (err, folder) {
    t.ifError(err, 'no profile error')
    t.ok(folder, folder)

    const js = fs.readFileSync(path.join(folder, 'user.js'), 'utf8')
    const expected = fs.readFileSync(fixture('custom.js'), 'utf8')

    t.is(js, expected)

    rimraf(folder, { glob: false }, function (err) {
      t.ifError(err, 'no rimraf error')
    })
  })
})

function fixture (file) {
  return path.join(__dirname, 'fixture', file)
}
