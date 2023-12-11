export function menu(){
    const nav = document.querySelector("nav")
    nav.insertAdjacentHTML("afterbegin", `
    <nav>
    <a href="../home/">
    <img src="../icones/menuicone.png">
    <div>
    <p>HOME</p>                
    </div>
    </a>
    <a href="../produto/">
    <img src="../icones/produto.png">
    <div>
    <p>PRODUTO</p>                
    </div>
    </a>
    <a href="../relatorio/">
    <img src="../icones/relatorio.png">
    <div>
        <p>RELATÓRIO</p>                
    </div>
    </a>
    <a href="../venda/">
    <img src="../icones/venda.png">
    <div>
        <p>VENDA</p>                
    </div>
    </a>
    </nav>
    `)
}