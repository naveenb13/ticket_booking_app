import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const toast = (message, notification) => {
    MySwal.fire({
        icon: notification === 'success' ? "success" : "error",
        title: notification === 'success' ? "Success" : "Oops...",
        text: message,
        position: 'top-right',
        timer: 1500,
        showConfirmButton: false,
        toast: true
    })
}

const Storage = {
    isLoggedin: (key) => {
        return localStorage.getItem(key) !== null
    },
    isDataAvailable: (key) => {
        return sessionStorage.getItem(key) !== null
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get: (key, value) => {
        return JSON.parse(localStorage.getItem(key))
    },
    logout: (key) => {
        localStorage.removeItem(key)
    }
}

export { toast, Storage }