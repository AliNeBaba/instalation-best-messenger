const URL = 'http://localhost:24567/getData'

export const getData = () => fetch(URL).then(response => response.json(), 4000)
