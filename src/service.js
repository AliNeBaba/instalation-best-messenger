const URL = 'http://localhost:24567/getData'

export const getData = () => fetch(URL).then(response => response.json(), 4000)

export const idleReload = () => {
  const timeout = () => setTimeout(function () {
    window.location.reload()
  }, 25000)

  let reset

  document.addEventListener('mousedown', () => {
    clearTimeout(reset)
    reset = timeout()
  })
}
