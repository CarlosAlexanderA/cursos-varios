console.log('iam in the browser')
const loadSongs = async () => {
  try {
    const res = await fetch('/songs')
    const json = await res.json()
    console.log(json)
    const list = document.getElementById('list')

    json.forEach(item => {
      list.innerHTML += `<li>${item.name}</li>`
    })
  } catch (error) {
    console.log(error)
  }
}

loadSongs()
