// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
})

// Add your javascript here
const form = document.getElementById('form')

const handleSubmit = evt => {
  evt.preventDefault()
  const status = document.getElementById('status')
  const data = new FormData(evt.target)
  fetch(evt.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json'
    }
  })
    .then(res => {
      status.innerHTML = 'Message sent, I will respond soonest'
      form.reset()
      setTimeout(() => {
        status.innerHTML = ''
        status.style.color = ''
      }, 2000)
    })
    .catch(err => {
      status.style.color = 'red'
      status.innerHTML = 'Opps! message not sent, please try again'
      setTimeout(() => {
        status.innerHTML = ''
        status.style.color = ''
      }, 2000)
    })
}

form.addEventListener('submit', handleSubmit)
