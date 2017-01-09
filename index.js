new Promise(function (resolve, reject) { // Executes immediately
  var randomNumber = Math.random()
  if (randomNumber < .5) {
    resolve(randomNumber)
  } else {
    reject(randomNumber)
  }
})

function promiseFactory () { // Waits for execution
  return new Promise(function (resolve, reject) {
    var randomNumber = Math.random()
    if (randomNumber < .5) {
      resolve(randomNumber)
    } else {
      reject(randomNumber)
    }
  })
}

var p1 = promiseFactory()
var p2 = promiseFactory()
var p3 = promiseFactory()

// async
new Promise(function (resolve, reject) {
  var randomNumber = Math.random()
  if (randomNumber < .5) {
    setTimeout(function () { resolve(randomNumber) }, randomNumber * 10000) // [0-10) seconds
  } else {
    setTimeout(function () { reject(randomNumber) }, randomNumber * 10000)
  }
})

// async promise factory
// add error handling for:
// 400s
// 500s
// Timeout
// Bad JSON
function getJSON (url) {
  return new Promise (function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function (evt) {
      if (evt.target.status < 400) { // Server Error
        try {
          resolve(JSON.parse(evt.target.responseText))
        } catch (e) {
          reject(e) // bad json
        }
      } else {
        reject(evt.target.status)
      }
    })
    xhr.addEventListener('error', reject) // Connection Error
    // same as: xhr.addEventListener('error', function (e) { reject(e) })
    xhr.open('GET', url)
    xhr.send()
  })
}

// breaking down multiple actions into smaller functions
function fetch (url) {
  return new Promise (function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function (evt) {
      if (evt.target.status < 400) { // Server Error
        resolve(evt.target.responseText)
      } else {
        reject(evt.target.status)
      }
    })
    xhr.addEventListener('error', reject) // Connection Error
    // same as: xhr.addEventListener('error', function (e) { reject(e) })
    xhr.open('GET', url)
    xhr.send()
  })
}

function getJSON (url) {
  return fetch(url).then(JSON.parse)
  // same as: return fetch(url).then(function (json) { return JSON.parse(json) })
}
