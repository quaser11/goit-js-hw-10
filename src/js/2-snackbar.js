import '../css/snackbar.css'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

form.addEventListener('submit', onSubmit)

function onSubmit(e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  if (data.state === 'fulfilled') {
    setTimeout(() => {
      Promise.resolve(iziToast.show({
        color:'green',
        title:'Promise resolved!'
      }))
    }, Number(data.delay))
    return
  }

  setTimeout(() => {
    Promise.reject(iziToast.show({
      color:'red',
      title:'Promise rejected!'
    }))
  }, Number(data.delay))
}