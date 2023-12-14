const my_headers ={
    "Content-Type": "application/json"
}
//const url = "http://localhost:3001/"
const url = "";
export async function get_venda(){
    const res = await fetch(url+"/venda")
    const resJson = await res.json();
    //console.log(resJson)
    return resJson
}

export async function render_lista(list=[]){

    const res_prod = await fetch(url+"/produto")
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
    <div>
    <p>Nome = ${venda.id_prod}</p>
    <p>Quantidade = ${venda.quantidade}</p>
    <p id="detalhe">Detalhe = ${venda.detalhe}</p>
    <p>Data Venda = ${venda.data_dia}/${venda.data_mes}/${venda.data_ano}</p>
    <p>Custo: ${venda.v_custo}</p>
    <p>venda: ${venda.v_venda}</p>
    </div>
    </li>
    `)  

    })

}

export async function cadastrar_venda(venda){
    const bodyJson = JSON.stringify(venda)
    console.log(bodyJson)
    const res = await fetch(
        url+"/venda",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    return res
}

export async function pesquisar_venda(data){
    const res = await fetch(url + data)
    const resJson = await res.json();
    return resJson
}


