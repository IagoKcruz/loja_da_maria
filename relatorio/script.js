import {render_lista, get_venda, pesquisar_venda} from "../global/api_vendas.js"

// if(!token){
//     window.location.href = "/"
// }
let pesquisa  
const venda = await get_venda();    
if(venda){
    render_relatorio(venda)
    render_lista(venda);
}

const procurar = document.querySelector("#procurar");
procurar.addEventListener("click", ()=>{
    data_venda()
})

async function data_venda(){
    let data_pesquisa = "";
    let ul = document.querySelector(".vendas");
    let calendario = document.querySelector("#data_venda"); 
    let apenas_mes = document.querySelector("#mes");
    let apenas_ano = document.querySelector("#ano");

    if(calendario){
        const ano = calendario.value.substring(0,4)
        const mes = calendario.value.substring(5,7)
        const dia = calendario.value.substring(8,10)
        data_pesquisa = `venda?data_mes=${mes}&data_dia=${dia}&data_ano=${ano}`;
        pesquisa = await pesquisar_venda(data_pesquisa)
        if(pesquisa){
        ul.innerHTML =""
        render_lista(pesquisa)
        render_relatorio(pesquisa)            
        }
    }
    if(apenas_ano.value == "" && calendario.value == ""){
        data_pesquisa = `data_ano=${apenas_mes.value}`;
        pesquisa = await pesquisar_venda(data_pesquisa);
        if(pesquisa){
            ul.innerHTML=""
            render_lista(pesquisa)
            render_relatorio(pesquisa)            
        }            
    }else if(apenas_mes.value == "" && calendario.value == ""){
        data_pesquisa = `data_ano=${apenas_ano.value}`;
        pesquisa = await pesquisar_venda(data_pesquisa);
        if(pesquisa){
            ul.innerHTML=""
            render_lista(pesquisa)
            render_relatorio(pesquisa)            
        }
    }

    const limpar_filtro = document.querySelector("#limpar")
    limpar_filtro.addEventListener("click", ()=>{
        window.location.reload()
    })
    
}
async function render_relatorio(list){
    console.log(list)
    const quantidade = list.reduce((prev, next) => {
        return prev + parseInt(next.quantidade);
    }, 0);
    const total_custo = list.reduce((prev, next) => {
        return prev + parseInt(next.v_custo);
    }, 0);
    const total_venda = list.reduce((prev, next) => {
        return prev + parseInt(next.v_venda);
    }, 0);
    const div = document.querySelector("#custos");
    div.innerHTML = "";
    div.insertAdjacentHTML("afterbegin", `
    <p>RELATÓRIO</p>
    <p>Quantidade = ${quantidade}</p>
    <p>Valor total de Custo: ${total_custo}</p>
    <p>Valor total de venda: ${total_venda}</p>
    <p>Lucro: ${total_venda - total_custo}</p>
    `)  

}
