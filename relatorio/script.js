import {render_lista} from "../global/api_vendas.js"

// if(!token){
//     window.location.href = "/"
// }

const procurar = document.querySelector("#procurar");
procurar.addEventListener("click", ()=>{
    get_venda()
    
})
const ul = document.querySelector(".vendas");

async function get_venda(){
    let calendario = document.querySelector("#data_venda"); 
    let apenas_mes = document.querySelector("#mes");
    let apenas_ano = document.querySelector("#ano");
    let res;
    let res_json;
    if(calendario){
        const ano = calendario.value.substring(0,4)
        const mes = calendario.value.substring(5,7)
        const dia = calendario.value.substring(8,10)
        res = await fetch(`http://localhost:3001/venda?data_mes=${mes}&data_dia=${dia}&data_ano=${ano}`);
        res_json = await res.json();
        ul.innerHTML =""
        render_lista(res_json)
        render_relatorio(res_json); 
    }
    if(apenas_ano.value == "" && calendario.value == ""){
        res = await fetch(`http://localhost:3001/venda?data_mes=${apenas_mes.value}`);
        res_json = await res.json();
        ul.innerHTML =""
        render_lista(res_json)
    }else if(apenas_mes.value == "" && calendario.value == ""){
        res = await fetch(`http://localhost:3001/venda?data_ano=${apenas_ano.value}`)
        res_json = await res.json();
        ul.innerHTML =""
        render_lista(res_json)
    }

    const limpar_filtro = document.querySelector("#limpar")
    limpar_filtro.addEventListener("click", ()=>{
        // apenas_ano.innerHTML = "";
        // apenas_mes.innerHTML = "";
        // calendario.innerHTML = "";
        window.location.reload()
        render_lista()
    })
    
}
async function render_relatorio(list){

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
    div.insertAdjacentHTML("afterbegin", `
    <p>RELATÓRIO</p>
    <p>Quantidade = ${quantidade}</p>
    <p>Valor total de Custo: ${total_custo}</p>
    <p>Valor total de venda: ${total_venda}</p>
    `)  

}
