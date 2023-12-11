import {toastify} from "../global/toastify.js"
import {get_opt, get_prod, cadastrar_produto, prod_id, alterar_produto, list_filter} from "../global/api_produto.js"
import {menu} from "../global/menu.js"

const token = localStorage.getItem("@token");
if(!token){
    window.location.href = "/"
}

const list = await get_prod();
const list_opt = await get_opt();
menu()
render_lista()

async function render_lista(){

    list.forEach((prod)=>{
    list_opt.forEach((opt)=>{
        if(opt.id == prod.opt_ativo){
            prod.opt_ativo = opt.descr
            console.log(opt.descr)
        }

    })

    const ul = document.querySelector(".prods");
    ul.insertAdjacentHTML("afterbegin", `
    <li>
    <div>
    <p>Nome = ${prod.nome}</p>
    <p>Preço de Custo= ${prod.v_custo}</p>
    <p>Proço de Venda = ${prod.v_venda}</p>
    <p>Status = ${prod.opt_ativo}</p>
    </div>
    </li>
    `)  
    
    const li = document.querySelector("li")
    li.addEventListener("click", async()=>{
        const produto = await prod_id(prod.id)
        if(produto){
            space_editar(produto);
        }
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
    <div id="form">
    <form>
    <div class="item_form">
    <label for="nome">Nome</label>
    <input type="text" id="nome">            
    </div>
    <div class="item_form">
    <label for="v_venda">Valor de Venda</label>
    <input type="text" id="v_venda">
    </div>
    <div class="item_form">
    <label for="v_custo">Valor de Custo</label>
    <input type="text" id="v_custo">
    </div>
    <div class="select_form">
    <select id="prod_select">
    </select>
    </div>
    <button type="submit">Cadastrar</button>
    </form> 
    </div>
    </div>

    `)

list_opt.forEach(opt => {
    const select = document.querySelector("#prod_select")
    select.insertAdjacentHTML("afterbegin",`
    <option value="${opt.id}">${opt.descr}</option>
    `)
});

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
        event.preventDefault();
        dados_produto()
    })

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
    console.log(sair)
div1.remove();
})

}

async function dados_produto(){
    const select = document.querySelector("#prod_select")
    if(select.value == ""){
        select.value = "1"
    }
    const nome = document.querySelector("#nome").value
    const v_venda =  document.querySelector("#v_venda").value
    const v_custo =  document.querySelector("#v_custo").value
    const opt_ativo = select.value
    const cadastrar = await cadastrar_produto(nome, v_custo, v_venda, opt_ativo)
    if(cadastrar){
        validação(cadastrar)
    }
}

async function validação(res){
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

async function space_editar(prod){

    const main = document.querySelector("main")
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    <div id="modal_inserir" >
    <button id="sair">X</button>
    <p>Editar Produto</p>
    <div id="form">
    <form>
    <div class="item_form">
    <label for="nome">Nome</label>
    <input type="text" id="nome" value="${prod.nome}">            
    </div>
    <div class="item_form">
    <label for="v_venda">Valor de Venda</label>
    <input type="text" id="v_venda" value="${prod.v_venda}">
    </div>
    <div class="item_form">
    <label for="v_custo">Valor de Custo</label>
    <input type="text" id="v_custo" value="${prod.v_custo}">
    </div>
    <div class="select_form">
    <select id="prod_select">
    </select>
    </div>
    <button type="submit">Salvar</button>                 
    </form>
    </div>
    </div>

    `
    )

list_opt.forEach(opt => {
    const select = document.querySelector("#prod_select")
    select.insertAdjacentHTML("afterbegin",`
    <option value="${opt.id}">${opt.descr}</option>
    `)
});

const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    console.log(prod.id)
    dados_alterar(prod.id)
})

const sair = document.querySelector("#sair");
sair.addEventListener("click", ()=>{
    div.remove();
})

}

async function dados_alterar(id){
    const select = document.querySelector("#prod_select")
    if(select.value == ""){
        select.value = "1"
    }
    const nome = document.querySelector("#nome").value
    const v_venda =  document.querySelector("#v_venda").value
    const v_custo =  document.querySelector("#v_custo").value
    const opt_ativo = select.value
    const alterar = await alterar_produto(id, nome, v_custo, v_venda, opt_ativo)
    if(alterar){
        validação_alterar(alterar)
    }
}

async function validação_alterar(res){
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

status_prod()
async function status_prod(){
    const div = document.querySelector("#status_prod");
    list_opt.forEach(opt => {    
    div.insertAdjacentHTML("afterbegin",`
    <button class="status" value="${opt.id}">${opt.descr}</button>
    `)
    });
    div.insertAdjacentHTML("beforeend", `
    <button class="status" id="limpar">X</button>
    `)
    const opt_prod = document.querySelectorAll(".status");
    opt_prod.forEach(Element => {
       Element.addEventListener("click", async ()=>{
        const filtro = await list_filter(Element.value)
        if(filtro){
        render_filter(filtro)    
        }
        }) 
    })
    const limpar = document.querySelector("#limpar")
    limpar.addEventListener("click", async()=>{
        const filtro = await get_prod(Element.value)
        if(filtro){
        render_filter(filtro)    
        }
    })
}


async function render_filter(list=[]){
    const ul = document.querySelector(".prods");
    ul.innerHTML = "";
    list.forEach((prod)=>{ 
    list_opt.forEach((opt)=>{
        if(opt.id == prod.opt_ativo){
            prod.opt_ativo = opt.descr
        }
        })
        ul.insertAdjacentHTML("afterbegin", `
            <li>
            <div>
            <p>Nome = ${prod.nome}</p>
            <p>Preço de Custo= ${prod.v_custo}</p>
            <p>Proço de Venda = ${prod.v_venda}</p>
            <p>Status = ${prod.opt_ativo}</p>
            </div>
            </li>
            `)  
    
        const li = document.querySelector("li")
        li.addEventListener("click", async()=>{
            const produto = await prod_id(prod.id)
            if(produto){
                space_editar(produto);
            }
        })

    })

}