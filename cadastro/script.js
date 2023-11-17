import {toastify} from "../toastify.js"
async function get_user(){
    const res = await fetch("http://localhost:3001/users")
    const resJson = await res.json();
    console.log(resJson)
}

get_user()

const my_headers ={
    "Content-Type": "application/json"
}

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
    
    console.log(await res.json())

    if(res.status == 201){
        const resJson = await res.json()
        toastify("Ok, cadastro efetuado com sucesso!","ok")
        console.log(resJson)
        localStorage.setItem("@token-exemplo",resJson.accessToken)
        localStorage.setItem("@user-exemplo",JSON.stringify(resJson.user))
        setTimeout(()=>{
            window.location.href = "/"
        },3000)
    }else{
        toastify(res.json(),"error")
    }

}

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    cadastrar()
})