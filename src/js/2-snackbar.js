import '../css/snackbar.css'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

form.addEventListener('submit', onSubmit)

function onSubmit(e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(form))

   new Promise((resolve, reject) => {
    if(data.state === 'fulfilled'){
      resolve(data.delay)
    }
    reject(data.delay)
  }).then(delay => {
    setTimeout(() => {
      iziToast.show({
        color: 'green',
        title:`Fulfilled promise in ${delay}ms`
      })
    }, Number(delay))
  }).catch(delay =>  setTimeout(() => {
    iziToast.show({
      color: 'red',
      title:`❌ Rejected promise in ${delay}ms`
    })
  }, Number(delay)))
}
