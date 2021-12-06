const URL = 'http://localhost:24567/getData'
const WAIT_TO_REFRESH = 1500000
let FIRST_REQUESTS = 1
const FIRST_REQUESTS_DELAY = 1000

export const getData = () => {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      fetch(URL)
        .then(response => response.json())
        .then(response => normalizer(response))
        .then(response => {
          clearInterval(interval)
          localStorage.setItem('savedData', JSON.stringify(response))
          resolve(response)
        }).catch(() => {
          if (FIRST_REQUESTS) {
            --FIRST_REQUESTS
          } else {
            clearInterval(interval)
            resolve(JSON.parse(localStorage.getItem('savedData')))
          }
        })
    }, FIRST_REQUESTS_DELAY)
  })
}

function normalizer (obj) {
  const normalized = {}
  const fields = obj.forms.messenger.fields
  for (const key in obj.forms.messenger.articles) {
    normalized[key] = Object.values(obj.forms.messenger.articles[key])
    const lengthArticles = normalized[key].length
    for (let i = 0; i < lengthArticles; ++i) {
      const replacer = {}
      for (let j = 0; j < normalized[key][i].length; ++j) {
        replacer[fields[j]] = normalized[key][i][j]
      }
      normalized[key].push(replacer)
    }
    normalized[key].splice(0, 10)
  }
  console.log(normalized)
  return normalized
}

export const idleReload = () => {
  const timeout = () => setTimeout(function () {
    window.location.reload()
  }, WAIT_TO_REFRESH)
  let reset
  document.addEventListener('mousedown', () => {
    clearTimeout(reset)
    reset = timeout()
  })
}
