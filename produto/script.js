const token = localStorage.getItem("@token");

if(!token){
    window.location.href = "/"
}

const my_headers ={
    "Content-Type": "application/json"
}

import {toastify} from "../toastify.js"
async function get_prod(){

    const res = await fetch("http://localhost:3001/produto")
    const resJson = await res.json();
    //console.log(resJson)
    render_lista(resJson)
}
get_prod()

async function render_lista(list=[]){

    const res_opt = await fetch(`http://localhost:3001/opt`)
    const resJson_opt = await res_opt.json()

    list.forEach((prod)=>{
    
    console.log(resJson_opt, prod)
    
    resJson_opt.forEach((opt)=>{
        if(opt.id == prod.opt_ativo){
            prod.opt_ativo = opt.descr
            console.log(opt.descr)
        }
    })

    const ul = document.querySelector(".prods");
    ul.insertAdjacentHTML("afterbegin", `
    <li>
    <p>Nome = ${prod.nome}</p>
    <p>Preço de Custo= ${prod.v_custo}</p>
    <p>Proço de Venda = ${prod.v_venda}</p>
    <p>Status = ${prod.opt_ativo}</p>
    </li>
    `)  
    
    const li = document.querySelector("li")
    li.addEventListener("click",()=>{
        prod_id(prod.id)
    })

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
    <label for="nome">Nome</label>
    <input type="text" id="nome">            
    </div>
    <div>
    <label for="v_venda">Valor de Venda</label>
    <input type="text" id="v_venda">
    </div>
    <div>
    <label for="v_custo">Valor de Custo</label>
    <input type="text" id="v_custo">
    </div>
    <div>
    <select id="prod_select">
    </select>
    </div>
    <button type="submit">Cadastrar</button>
    </form> 
    </div>

    `)


const res_opt = await fetch(`http://localhost:3001/opt`)
const resJson_opt = await res_opt.json()
resJson_opt.forEach(opt => {
        const select = document.querySelector("#prod_select")
        select.insertAdjacentHTML("afterbegin",`
        <option value="${opt.id}">${opt.descr}</option>
        `)
});

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
        event.preventDefault();
        console.log(event)
        cadastrar_produto()
    })

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
    console.log(sair)
div1.remove();
})

}

async function cadastrar_produto(){
    const select = document.querySelector("#prod_select")
    if(select.value == ""){
        select.value = "1"
    }
    const user = {
        nome : document.querySelector("#nome").value,
        v_venda :  document.querySelector("#v_venda").value,
        v_custo :  document.querySelector("#v_custo").value,
        opt_ativo : select.value
    }
    console.log(user)
    const bodyJson = JSON.stringify(user)
    console.log(bodyJson)
    const res = await fetch(
        "http://localhost:3001/produto",
    {
        headers: my_headers,
        method: "POST",
        body:bodyJson
    })
    
    if(res.status == 201){
        const resJson = await res.json()
        setTimeout(()=>{
            toastify("Cadastrado com sucesso","ok")
        },1000)
        window.location.reload()
        console.log(resJson)
    }else{
         toastify(res.json(),"error")
    }

}

async function prod_id(id){
    console.log(id)
    const res = await fetch(`http://localhost:3001/produto/${id}`)
    const resJson = await res.json()
    space_editar(resJson);
}

async function space_editar(prod){

    const main = document.querySelector("main")
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    
    <div id="modal_inserir" >
    <button id="sair">X</button>
    <p>Editar Produto</p>
    <form>
    <div>
    <label for="nome">Nome</label>
    <input type="text" id="nome" value="${prod.nome}">            
    </div>
    <div>
    <label for="v_venda">Valor de Venda</label>
    <input type="text" id="v_venda" value="${prod.v_venda}">
    </div>
    <div>
    <label for="v_custo">Valor de Custo</label>
    <input type="text" id="v_custo" value="${prod.v_custo}">
    </div>
    <div >
    <select id="prod_select">
    </select>
    </div>
    <div class="actions">
    <button type="submit">Salvar</button>
    <button id="excluir">X</button>                
    </div>
    </form>
    </div>

    `
    )

const res_opt = await fetch(`http://localhost:3001/opt`)
const resJson_opt = await res_opt.json()
resJson_opt.forEach(opt => {
    const select = document.querySelector("#prod_select")
    select.insertAdjacentHTML("afterbegin",`
    <option value="${opt.id}">${opt.descr}</option>
    `)
});

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    console.log(prod.id)
    alterar_produto(prod.id)
})

const bnt_exc = document.querySelector("#excluir");
bnt_exc.addEventListener("click", ()=>{
    excluir(prod.id);
})

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
    console.log(div)
    div.remove();
})

}

async function alterar_produto(id){
    const select = document.querySelector("#prod_select")
    if(select.value == ""){
        select.value = "1"
    }
    const user = {
        nome : document.querySelector("#nome").value,
        v_venda :  document.querySelector("#v_venda").value,
        v_custo :  document.querySelector("#v_custo").value,
        opt_ativo : select.value
    }
    console.log(user)   
    const bodyJson = JSON.stringify(user)
    console.log(bodyJson)
    const res = await fetch(
        `http://localhost:3001/produto/${id}`,
    {
        headers: my_headers,
        method: "PUT",
        body:bodyJson
    })
    
    if(res.status == 200){
        const resJson = await res.json()
        setTimeout(()=>{
            toastify("Alterado com sucesso","ok")
        },1000)
        window.location.reload()
        console.log(resJson)
    }else{
         toastify(res.json(),"error")
    }

}

async function excluir(id){

    const res = await fetch(`http://localhost:3001/produto/${id}`,
    {
        headers: my_headers,
        method: "DELETE",
        body:bodyJson
    })
    get_prod();
}

async function status_prod(){

    const res_opt = await fetch(`http://localhost:3001/opt`)
    const resJson_opt = await res_opt.json()
    const div = document.querySelector("#status_prod");
    resJson_opt.forEach(opt => {    
    div.insertAdjacentHTML("afterbegin",`
    <button class="status" value="${opt.id}">${opt.descr}</button>
    `)
    });
    const opt_prod = document.querySelectorAll(".status");
    opt_prod.forEach(Element => {
       Element.addEventListener("click", ()=>{
        console.log(Element)
        list_filter(Element.value)
        }) 
    })
}

status_prod()

async function list_filter(id){

    const res = await fetch(`http://localhost:3001/produto?opt_ativo=${id}`)
    const resJson = await res.json();
    //console.log(resJson)
    render_filter(resJson)
}
get_prod()

async function render_filter(list=[]){
    const ul = document.querySelector(".prods");
    const res_opt = await fetch(`http://localhost:3001/opt`)
    const resJson_opt = await res_opt.json()
    ul.innerHTML = "";
    list.forEach((prod)=>{
    
    console.log(resJson_opt, prod)
    
    resJson_opt.forEach((opt)=>{
        if(opt.id == prod.opt_ativo){
            prod.opt_ativo = opt.descr
            console.log(opt.descr)
        }
        })
        ul.insertAdjacentHTML("afterbegin", `
            <li>
            <p>Nome = ${prod.nome}</p>
            <p>Preço de Custo= ${prod.v_custo}</p>
            <p>Proço de Venda = ${prod.v_venda}</p>
            <p>Status = ${prod.opt_ativo}</p>
            </li>
            `)  
    
        const li = document.querySelector("li")
        li.addEventListener("click",()=>{
            prod_id(prod.id)
        })

    })

}