const my_headers ={
    "Content-Type": "application/json"
}

export async function get_prod(){
    const res = await fetch("http://localhost:3001/produto")
    const resJson = await res.json();
    return resJson;
}

export async function get_opt(){
    const res = await fetch("http://localhost:3001/opt")
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
        "http://localhost:3001/produto",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res;
}