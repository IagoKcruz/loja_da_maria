const my_headers ={
    "Content-Type": "application/json"
}
//const url = "http://localhost:3001/"
const url = "https://server-loja-maria.onrender.com";
export async function get_prod(){
    const res = await fetch(url+"/produto")
    const resJson = await res.json();
    return resJson;
}

export async function get_opt(){
    const res = await fetch(url+"/opt")
    const resJson = await res.json();
    return resJson;
}

export async function cadastrar_produto(nome, v_custo, v_venda, opt_ativo){
    const user = {
        nome : nome,
        v_venda : v_venda,
        v_custo : v_custo,
        opt_ativo : opt_ativo
    }
    const bodyJson = JSON.stringify(user)
    const res = await fetch(
        url+"/produto",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res;
}

export async function prod_id(id){
    const res = await fetch(`${url}/produto/${id}`)
    const resJson = await res.json()
    return resJson;
}

export async function alterar_produto(id, nome, v_custo, v_venda, opt_ativo){
    const user = {
        nome : nome,
        v_venda : v_venda,
        v_custo : v_custo,
        opt_ativo : opt_ativo
    }
    const bodyJson = JSON.stringify(user)
    const res = await fetch(
        `${url}/produto/${id}`,
    {
        headers: my_headers,
        method: "PUT",
        body:bodyJson
    })
    return res;
}

export async function list_filter(id){
    const res = await fetch(`${url}/produto?opt_ativo=${id}`)
    const resJson = await res.json();
    return resJson
}
