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
    <p>Nome = ${prod.id}</p>
    <p>Preço = ${prod.id}Custo</p>
    <p>Proço de Venda = ${prod.id}</p>
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
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    
    <div id="modal_inserir">
    <button id="sair">X</button>
    <p>Editar Produto</p>
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
    <button type="submit">Cadastrar</button>
    </form> 
    </div>

    `)

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
        event.preventDefault();
        console.log(event)
        cadastrar_produto()
    })

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
div.remove();

})

}

async function cadastrar_produto(){
    const user = {
        nome : document.querySelector("#nome").value,
        v_venda :  document.querySelector("#v_venda").value,
        v_custo :  document.querySelector("#v_custo").value
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
        setInterval(()=>{
            toastify("Ok, login efetuado com sucesso!","ok")
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
    space_editar(id);
}

async function space_editar(id){

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
    <input type="text" id="nome" value="">            
    </div>
    <div>
    <label for="v_venda">Valor de Venda</label>
    <input type="text" id="v_venda" value="">
    </div>
    <div>
    <label for="v_custo">Valor de Custo</label>
    <input type="text" id="v_custo" value="">
    </div>
    <div class="actions">
    <button type="submit">Salvar</button>
    <button id="excluir">X</button>                
    </div>
    </form>
    </div>

    `
    )

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
    editar_produto()
})

const bnt_exc = document.querySelector("#excluir");
bnt_exc.addEventListener("click", ()=>{
    excluir(id);
})

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
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

}