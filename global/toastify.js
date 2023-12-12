export function toastify(message, type){
    const body  = document.querySelector('main')
    body.insertAdjacentHTML("afterbegin",`
    <div class="toastify">
        <p>${message}</p>
    </div>
    `)
    if(type == "error"){
        const toast = document.querySelector(".toastify")
        toast.setAttribute("style",`
        background-color: yellow;
        position: absolute;
        align-items: center;
        z-index: 1;
        padding: 5px;
        align-self: center;
        justify-content: center;
        animation: saidatoasty 2.5s ease-in;  
        opacity: 0%;   
        `)
        toast.classList.add("error")
    }
    // console.log(toast)
}