const my_headers ={
    "Content-Type": "application/json"
}

export async function get_user(){
    const res = await fetch("http://localhost:3001/users")
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
        "http://localhost:3001/login",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res;
}