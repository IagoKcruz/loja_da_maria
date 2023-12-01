//import {toastify} from "../toastify"

const token = localStorage.getItem("@token");

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

async function render_lista(list=[]){

    const res_prod = await fetch(`http://localhost:3001/produto`)
    const resJson_prod = await res_prod.json()
    console.log(resJson_prod)
    list.forEach((venda)=>{
    
    console.log(resJson_prod, venda)
    
    resJson_prod.forEach((prod)=>{
        if(prod.id == venda.id_prod){
            venda.id_prod = prod.nome
            console.log(prod.nome)
        }
    })

    const ul = document.querySelector(".vendas");
    ul.insertAdjacentHTML("afterbegin", `
    <li>
    <p>Nome = ${venda.id}</p>
    <p>Quantidade = ${venda.quantidade}</p>
    <p>Detalhe = ${venda.detalhe}</p>
    </li>
    `)  
    
    // const li = document.querySelector("li")
    // li.addEventListener("click",()=>{
    //     prod_id(prod.id)
    // })

    })

}

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
    <input type="date" id="date">            
    </div>
    <div>
    <label for="quant">Quantidade</label>
    <input type="number" id="quant">
    </div>
    <div>
    <label for="descr">descrição</label>
    <input type="text" id="descr">
    </div>
    <div>
    </div>
    <button type="submit">Cadastrar</button>
    </form> 
    </div>

    `)


const res_prod = await fetch(`http://localhost:3001/produto`)
console.log(res_prod)
const resJson_prod = await res_prod.json()
resJson_prod.forEach(prod => {
        const select = document.querySelector("#prod_select")
        select.insertAdjacentHTML("afterbegin",`
        <option value="${prod.id}">${prod.nome}</option>
        `)
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
    const data_venda = document.querySelector("#date").stringify()
    console.log(data_venda)
    const dia = new Date(data_venda)
    console.log(data_venda)
    const venda = {
        id_prod : select.value,
        quantidade :"1",
        data_ano : "2023",
        data_dia : "01",
        data_mes : "12",
        detalhe: document.querySelector("descr")
    }
    console.log(venda)
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