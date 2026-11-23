const tabelaProdutos = document.getElementById("tabela-produtos");
const graficoEstoque = document.getElementById("grafico-estoque");
const contexto = graficoEstoque.getContext("2d");

if (contexto) {
    const produtos = Array.from(tabelaProdutos.tBodies[0].rows, (linha) => ({
        nome: linha.cells[1].textContent.trim(),
        quantidade: Number(linha.cells[2].textContent)
    }));

    // A maior quantidade define a escala. Se todo o estoque estiver zerado, o 1 evita divisão por zero.
    const maiorQuantidade = Math.max(1, ...produtos.map((produto) => produto.quantidade));
    const alturaLinha = 52;
    const larguraMaxima = graficoEstoque.width - 24;

    graficoEstoque.height = Math.max(1, produtos.length) * alturaLinha + 16;
    const fonte = getComputedStyle(graficoEstoque);
    contexto.font = fonte.fontSize + " " + fonte.fontFamily;

    produtos.forEach((produto, indice) => {
        const topo = indice * alturaLinha + 16;
        const largura = (produto.quantidade / maiorQuantidade) * larguraMaxima;

        contexto.fillStyle = "#222";
        contexto.fillText(produto.nome + " (" + produto.quantidade + ")", 12, topo + 14, larguraMaxima);

        contexto.fillStyle = "#e8edf2";
        contexto.fillRect(12, topo + 22, larguraMaxima, 14);

        contexto.fillStyle = "#245782";
        contexto.fillRect(12, topo + 22, largura, 14);
    });
}
