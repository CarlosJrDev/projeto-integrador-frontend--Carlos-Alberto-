(function () {
    const produtosPrecos = [
        { nome: "Perfume 212 VIP Black", precoCentavos: 28990, quantidade: 15 },
        { nome: "Creme hidratante CeraVe", precoCentavos: 8990, quantidade: 5 },
        { nome: "Protetor solar facial", precoCentavos: 6990, quantidade: 0 },
        { nome: "Body splash", precoCentavos: 6490, quantidade: 8 },
        { nome: "Hidratante para as mãos", precoCentavos: 2990, quantidade: 2 }
    ];

    function calcularPrecoComDesconto(precoCentavos, desconto = 10) {
        return Math.round(precoCentavos * (100 - desconto) / 100);
    }

    function classificarPreco(precoCentavos) {
        if (precoCentavos < 6000) {
            return { rotulo: "Econômico", classe: "faixa-economica" };
        } else if (precoCentavos < 15000) {
            return { rotulo: "Intermediário", classe: "faixa-intermediaria" };
        }
        return { rotulo: "Alto", classe: "faixa-alta" };
    }

    const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

    function criarItemPreco(produto) {
        const item = document.createElement("li");
        item.classList.add(produto.faixa.classe);

        const nome = document.createElement("span");
        nome.textContent = produto.nome;

        const faixa = document.createElement("small");
        faixa.classList.add("faixa-preco");
        faixa.textContent = produto.faixa.rotulo;

        const preco = document.createElement("strong");
        preco.classList.add("preco-final");
        preco.textContent = moeda.format(produto.precoFinal / 100);

        item.append(nome, faixa, preco);
        return item;
    }

    const resultado = document.querySelector("#resultado");
    if (resultado) {
        const produtosCalculados = produtosPrecos.map((produto) => {
            const precoFinal = calcularPrecoComDesconto(produto.precoCentavos);
            return {
                nome: produto.nome,
                quantidade: produto.quantidade,
                precoFinal: precoFinal,
                faixa: classificarPreco(precoFinal)
            };
        });
        const disponiveis = produtosCalculados.filter((produto) => produto.quantidade > 0);
        const totalCentavos = disponiveis.reduce((total, produto) => {
            return total + produto.precoFinal * produto.quantidade;
        }, 0);

        const lista = document.createElement("ul");
        lista.classList.add("lista-precos");
        produtosCalculados.forEach((produto) => lista.append(criarItemPreco(produto)));

        const resumo = document.createElement("p");
        resumo.textContent = `${disponiveis.length} produtos em estoque. Valor de venda com desconto: ${moeda.format(totalCentavos / 100)}.`;

        resultado.append(lista, resumo);
    }
})();
