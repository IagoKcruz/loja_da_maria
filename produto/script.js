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

    list.forEach((prod)=>{
    const ul = document.querySelector(".prods");
    ul.insertAdjacentHTML("afterbegin", `
    <li>
    <p>Nome = ${prod.nome}</p>
    <p>Preço de Custo= ${prod.v_custo}</p>
    <p>Proço de Venda = ${prod.v_venda}</p>
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
    const user = {
        nome : document.querySelector("#nome").value,
        v_venda :  document.querySelector("#v_venda").value,
        v_custo :  document.querySelector("#v_custo").value,
        opt_ativo : document.querySelector("#prod_select").value
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
        get_prod();
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
    editar_produto()
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

async function excluir(id){

    const res = await fetch(`http://localhost:3001/produto/${id}`,
    {
        headers: my_headers,
        method: "DELETE",
        body:bodyJson
    })
    get_prod();
}