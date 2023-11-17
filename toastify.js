export function toastify(message, type){
    const body  = document.body
    body.insertAdjacentHTML("afterbegin",`
    <div class="toastify">
        <p>${message}</p>
    </div>
    `)
    if(type == "error"){
        const toast = document.querySelector(".toastify")
    // toast.setAttribute("style",`background-color: ${color};`)
        toast.classList.add("error")
    }
    // console.log(toast)
}