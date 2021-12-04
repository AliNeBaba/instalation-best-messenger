const URL = 'http://localhost:24567/getData'
const WAIT_TO_REFRESH = 1500000
let FIRST_REQUESTS = 3

export const getData = function () {
  return new Promise(function (resolve, reject) {
    const interval = setInterval(() => {
      dataRequest().then(response => {
        clearInterval(interval)
        resolve(response)
      }).catch(reject => {
        FIRST_REQUESTS
          ? --FIRST_REQUESTS
          : clearInterval(interval)
        console.log(reject)
      })
    }, 3000)
  })
}

function dataRequest () {
  return fetch(URL).then(response => response.json())
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
