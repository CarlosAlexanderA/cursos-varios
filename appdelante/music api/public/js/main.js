const audio = document.getElementById('audio')
audio.volume = 0.1
console.log('iam in the browser')
const loadSongs = async () => {
  try {
    const res = await fetch('/songs')
    const json = await res.json()
    console.log(json)
    const list = document.getElementById('list')

    json.forEach(item => {
      const li = document.createElement('li')
      li.textContent += item.name
      li.addEventListener('click', () => { play(item) })
      list.appendChild(li)
    })
  } catch (error) {
    console.log(error)
  }
}
const play = (e) => {
  audio.pause()
  audio.src = '/songs/' + e.name
  audio.play()
}

loadSongs()
