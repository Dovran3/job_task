let check = false

const container = document.getElementsByClassName('container')[0],
      bool = document.getElementsByClassName('bool')[0],
      checkbox = document.getElementsByClassName('checkbox')[0]

container.addEventListener('click', (e) => {
  if (!check) {
    container.style.backgroundColor = 'green'
    bool.textContent = 'TRUE'
    checkbox.setAttribute('value', 'true')
    check = true
  } else {
    container.style.backgroundColor = 'red'
    bool.textContent = 'FALSE'
    checkbox.setAttribute('value', 'false')
    check = false
  }
})
