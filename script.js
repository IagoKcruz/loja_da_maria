import {toastify} from "./global/toastify.js"
import {get_user} from "./global/api_conta.js"

get_user()


const form = document.querySelector("form")
form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password =  document.querySelector("#senha").value;
    const responce = await login(email, password);
    if(responce){
    render_responce(responce); 
    } 
})

async function render_responce(res){
    if(res.status == 200){
        const resJson = await res.json()
        toastify("Ok, login efetuado com sucesso!","ok")
        console.log(resJson)
        localStorage.setItem("@token",resJson.accessToken)
        localStorage.setItem("@token_user",JSON.stringify(resJson.user))
        setTimeout(()=>{
            window.location.href = "./home"
        },2000)
    }else{
        const resJson = await res.json()
        toastify(resJson,"error")
    }

}

