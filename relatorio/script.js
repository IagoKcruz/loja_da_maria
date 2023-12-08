import {render_lista} from "../venda/script.js"

if(!token){
    window.location.href = "/"
}

const procurar = document.querySelector("#procurar");
procurar.addEventListener("click", ()=>{
    get_venda()
    console.log("cheguei aqui")
})

async function get_venda(){
    const dia = document.querySelector("#dia").value;
    const mes = document.querySelector("#mes").value;
    const ano = document.querySelector("#ano").value;
    console.log(dia, mes, ano)
    let res;
    let res_json;
    if(dia == "" && ano == ""){
        res = await fetch(`http://localhost:3001/venda?venda_mes=${mes}`)
        res_json = await res.json();
        render_lista(res_json)
    }else if(mes == "" && dia == ""){
        res = await fetch(`http://localhost:3001/venda?venda_ano=${ano}`)
        res_json = await res.json();
        render_lista(res_json)
    }else{
        res = await fetch(`http://localhost:3001/venda?venda_mes=${mes}&venda_dia=${dia}&venda_ano=${ano}`);
        res_json = await res.json();
        render_lista(res_json)  
    }
    
}

