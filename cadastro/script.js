import {toastify} from "../toastify.js"

const my_headers ={
    "Content-Type": "application/json"
}

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    cadastrar()
})

async function cadastrar(){
    const user = {
        email : document.querySelector("#email").value,
        password :  document.querySelector("#senha").value
    }
    console.log(user)
    const bodyJson = JSON.stringify(user)
    console.log(bodyJson)
    const res = await fetch(
        "http://localhost:3001/register",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })

    if(res.status == 201){
        const resJson = await res.json()
        toastify("Ok, cadastro efetuado com sucesso!","ok")
        console.log(resJson)
        localStorage.setItem("@token-exemplo",resJson.accessToken)
        localStorage.setItem("@user-exemplo",JSON.stringify(resJson.user))
        setTimeout(()=>{
            window.location.href = "./"
        },1000)
    }else{
        const resJson = await res.json()
        toastify(resJson,"error")
    }

}

