import {toastify} from "./toastify.js"

async function get_user(){
    const res = await fetch("http://localhost:3001/users")
    const resJson = await res.json();
    console.log(resJson)
}

get_user()

const my_headers ={
    "Content-Type": "application/json"
}

async function login(){
    const user = {
        email : document.querySelector("#email").value,
        password :  document.querySelector("#senha").value
    }
    console.log(user)
    const bodyJson = JSON.stringify(user)
    console.log(bodyJson)
    const res = await fetch(
        "http://localhost:3001/login",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    
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

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(event)
    login()
})