import {toastify} from "../global/toastify.js"
import {cadastrar} from "../global/api_conta.js"

const my_headers ={
    "Content-Type": "application/json"
}

const form = document.querySelector("form")
form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const email = document.querySelector("#email").value
    const password = document.querySelector("#senha").value
    const responce = await cadastrar(email, password);
    if(responce){
    render_responce(responce); 
    }
    
})

async function render_responce(res){
    if(res.status == 201){
        toastify("Ok, cadastro efetuado com sucesso!","ok")
        setTimeout(()=>{
            window.location.href = "/"
        },1000)
    }else{
        const resJson = await res.json()
        toastify(resJson,"error")
    }

}



