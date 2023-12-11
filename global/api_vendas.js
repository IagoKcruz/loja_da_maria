const my_headers ={
    "Content-Type": "application/json"
}

export async function get_venda(){
    const res = await fetch("http://localhost:3001/venda")
    const resJson = await res.json();
    //console.log(resJson)
    return resJson
}

export async function render_lista(list=[]){

    const res_prod = await fetch(`http://localhost:3001/produto`)
    const resJson_prod = await res_prod.json()
    list.forEach((venda)=>{
    resJson_prod.forEach((prod)=>{
        if(prod.id == venda.id_prod){
            venda.id_prod = prod.nome
        }
    })
    const ul = document.querySelector(".vendas");
    ul.insertAdjacentHTML("afterbegin", `
    <li>
    <p>Nome = ${venda.id_prod}</p>
    <p>Quantidade = ${venda.quantidade}</p>
    <p>Detalhe = ${venda.detalhe}</p>
    <p>Data Venda = ${venda.data_dia}/${venda.data_mes}/${venda.data_ano}</p>
    <p>Valor total de Custo: ${venda.v_custo}</p>
    <p>Valor total de venda: ${venda.v_venda}</p>
    </li>
    `)  

    })

}

export async function cadastrar_venda(venda){
    const bodyJson = JSON.stringify(venda)
    console.log(bodyJson)
    const res = await fetch(
         "http://localhost:3001/venda",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res
}

export async function pesquisar_venda(data){
    const res = await fetch("http://localhost:3001/" + data)
    const resJson = await res.json();
    //console.log(resJson)
    console.log(resJson)
    return resJson
}


