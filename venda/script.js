import {toastify} from "../global/toastify.js"
import {render_lista} from "../global/api_vendas.js"

const token = localStorage.getItem("@token");
const res_prod = await fetch(`http://localhost:3001/produto`)
console.log(res_prod)
const resJson_prod = await res_prod.json()

if(!token){
    window.location.href = "/"
}

const my_headers ={
    "Content-Type": "application/json"
}   

async function get_venda(){
    const res = await fetch("http://localhost:3001/venda")
    const resJson = await res.json();
    //console.log(resJson)
    render_lista(resJson)
}
get_venda()

const p = document.querySelector("#inserir")
p.addEventListener("click", ()=>{
    space_insert();
})

async function space_insert(){

    const main = document.querySelector("main")
    const div1 = document.createElement("div")
    div1.classList.add("modal")
    main.appendChild(div1)
    div1.insertAdjacentHTML("afterbegin", `
    
    <div id="modal_inserir">
    <button id="sair">X</button>
    <p>Inserir Produto</p>
    <form>
    <div>
    <select id="prod_select">
    </select>
    <label for="date">Nome</label>
    <input type="date" id="date_">            
    </div>
    <div>
    <label for="quant">Quantidade</label>
    <input type="number" id="quant">
    </div>
    <div>
    <label for="descr">Detalhe</label>
    <input type="text" id="descr">
    </div>
    <div>
    </div>
    <button type="submit">Cadastrar</button>
    </form> 
    </div>

    `)

resJson_prod.forEach(prod => {
    if(prod.opt_ativo == "1"){
        const select = document.querySelector("#prod_select")
        select.insertAdjacentHTML("afterbegin",`
        <option value="${prod.id}">${prod.nome}</option>
        `)        
    }
});

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
        event.preventDefault();
        console.log(event)
        cadastrar_venda()
})

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
    console.log(sair)
div1.remove();
})

}

async function cadastrar_venda(){

    const data_venda = document.querySelector("#date_").value
    const ano = data_venda.substring(0,4)
    const mes = data_venda.substring(5,7)
    const dia = data_venda.substring(8,10)
    if(document.querySelector("#quant").value == "" || data_venda == ""){
    toastify("Estão faltando dados","Não")
    return;
    }
    const quant = document.querySelector("#quant").value
    const id = document.querySelector("#prod_select").value
    const prod = resJson_prod.find(function(produto){
        return produto.id == id
    })
    console.log(prod)

    const venda = {
        id_prod : prod.id,
        quantidade : quant ,
        v_custo: prod.v_custo * quant,
		v_venda: prod.v_venda * quant,
        data_ano: ano,
        data_dia: dia,
        data_mes: mes,
        detalhe: document.querySelector("#descr").value
    }
    const bodyJson = JSON.stringify(venda)
    console.log(bodyJson)
    const res = await fetch(
         "http://localhost:3001/venda",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    if(res.status == 201){
        const resJson = await res.json()
        setTimeout(()=>{
            toastify(" Venda cadastrada com sucesso","ok")
        },1000)
        window.location.reload()
        console.log(resJson)
    }else{
         toastify(res.json(),"error")
    }

}