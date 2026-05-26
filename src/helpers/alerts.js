import Swal from 'sweetalert2'

export function redirect(message, url, icono) {
  let timerInterval
  Swal.fire({
    title: message,
    html: 'Redirigiendo en <b></b> ms.',
    icon: icono,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const timer = Swal.getPopup().querySelector('b')
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
      window.location.href = url
    },
  })
}

export function confirmDelete(title, text, endpoint, id, fetchData) {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(endpoint + '/' + id, { method: 'DELETE' })
        .then((res) => res.json())
        .then(() => {
          fetchData()
          Swal.fire({
            title: '¡Eliminada!',
            text: 'La tarea fue eliminada correctamente.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        })
    }
  })
}