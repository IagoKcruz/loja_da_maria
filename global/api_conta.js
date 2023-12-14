const my_headers ={
    "Content-Type": "application/json"
}
//const url = "http://localhost:3001/"
const url = "https://server-loja-maria.onrender.com";
export async function get_user(){
    const res = await fetch(url+"/users")
    const resJson = await res.json();
    return resJson
}

export async function login(email, password){
    const user = {
        email : email ,
        password : password 
    }
    const bodyJson = JSON.stringify(user)
    const res = await fetch(
        url+"/login",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res;
}

export async function cadastrar(email, password){
    const user = {
        email : email,
        password : password 
    }
    const bodyJson = JSON.stringify(user)
    const res = await fetch(
        url+"/register",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res;
}