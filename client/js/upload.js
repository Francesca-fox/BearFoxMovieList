//get name of form
const form = document.getElementById('addMovie')

form.addEventListener('submit', e => {
  e.preventDefault()

  const formData = new FormData(form)

  fetch(`http://localhost:3000/movies`, {
    method: 'post',
    body: formData
  })
  .then(response => response.json())
  .then(res => console.log(res))
  .catch(err => console.log(err))
})
