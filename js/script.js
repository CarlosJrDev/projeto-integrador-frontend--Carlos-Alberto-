(function () {
    const produtosPrecos = [
        { id: 1, nome: "Perfume 212 VIP Black", precoCentavos: 28990, quantidade: 15 },
        { id: 2, nome: "Creme hidratante CeraVe", precoCentavos: 8990, quantidade: 5 },
        { id: 3, nome: "Protetor solar facial", precoCentavos: 6990, quantidade: 0 },
        { id: 4, nome: "Body splash", precoCentavos: 6490, quantidade: 8 },
        { id: 5, nome: "Hidratante para as mãos", precoCentavos: 2990, quantidade: 2 }
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
        nome.classList.add("nome-preco");
        nome.textContent = produto.nome;

        const faixa = document.createElement("small");
        faixa.classList.add("faixa-preco");
        faixa.textContent = produto.faixa.rotulo;

        const preco = document.createElement("strong");
        preco.classList.add("preco-final");
        preco.textContent = moeda.format(produto.precoFinal / 100);

        const remover = document.createElement("button");
        remover.type = "button";
        remover.classList.add("botao-secundario");
        remover.dataset.id = String(produto.id);
        remover.setAttribute("aria-label", `Remover ${produto.nome}`);
        const rotuloRemover = document.createElement("span");
        rotuloRemover.textContent = "Remover";
        remover.append(rotuloRemover);

        item.append(nome, faixa, preco, remover);
        return item;
    }

    function normalizarBusca(texto) {
        return texto.trim().toLocaleLowerCase("pt-BR").normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    function calcularResumo(produtos) {
        const disponiveis = produtos.filter((produto) => produto.quantidade > 0);
        const totalCentavos = disponiveis.reduce((total, produto) => {
            return total + produto.precoFinal * produto.quantidade;
        }, 0);
        return { disponiveis: disponiveis.length, totalCentavos: totalCentavos };
    }

    function atualizarResumo(elemento, exibidos, totais) {
        elemento.textContent = `Produtos exibidos: ${exibidos}. Em estoque: ${totais.disponiveis}. Valor com desconto: ${moeda.format(totais.totalCentavos / 100)}.`;
    }

    function iniciarListaPrecos() {
        const resultado = document.querySelector("#resultado");
        if (!resultado) return;

        const lista = resultado.querySelector("#lista-precos");
        const busca = resultado.querySelector("#busca-produto");
        const filtro = resultado.querySelector("#filtro-estoque");
        const resumo = resultado.querySelector("#resumo-precos");
        const formulario = resultado.querySelector("#adicionar-produto");
        let somenteEmEstoque = false;
        let proximoId = 6;

        function desenhar() {
            const termo = normalizarBusca(busca.value);
            const produtosVisiveis = produtosPrecos.filter((produto) => {
                return normalizarBusca(produto.nome).includes(termo)
                    && (!somenteEmEstoque || produto.quantidade > 0);
            });
            const produtosCalculados = produtosVisiveis.map((produto) => {
                const precoFinal = calcularPrecoComDesconto(produto.precoCentavos);
                return { ...produto, precoFinal: precoFinal, faixa: classificarPreco(precoFinal) };
            });

            lista.replaceChildren(...produtosCalculados.map(criarItemPreco));
            atualizarResumo(resumo, produtosCalculados.length, calcularResumo(produtosCalculados));
        }

        function alternarFiltroEstoque() {
            somenteEmEstoque = !somenteEmEstoque;
            filtro.setAttribute("aria-pressed", String(somenteEmEstoque));
            desenhar();
        }

        function removerProduto(evento) {
            const botao = evento.target.closest("button[data-id]");
            if (!botao || !lista.contains(botao)) return;

            const id = Number(botao.dataset.id);
            const indice = produtosPrecos.findIndex((produto) => produto.id === id);
            if (indice < 0) return;

            const posicao = Array.from(lista.children).indexOf(botao.closest("li"));
            produtosPrecos.splice(indice, 1);
            desenhar();

            const vizinho = lista.children[posicao] || lista.lastElementChild;
            const proximoFoco = vizinho ? vizinho.querySelector("button") : busca;
            proximoFoco.focus();
        }

        function adicionarProduto(evento) {
            evento.preventDefault();
            const campos = formulario.elements;
            campos.nome.value = campos.nome.value.trim();
            if (!formulario.reportValidity()) return;

            produtosPrecos.push({
                id: proximoId++,
                nome: campos.nome.value,
                precoCentavos: Math.round(campos.preco.valueAsNumber * 100),
                quantidade: campos.quantidade.valueAsNumber
            });

            // Limpa os filtros para que o produto recém-adicionado apareça na lista.
            busca.value = "";
            somenteEmEstoque = false;
            filtro.setAttribute("aria-pressed", String(somenteEmEstoque));
            formulario.reset();
            desenhar();
            campos.nome.focus();
        }

        lista.addEventListener("click", removerProduto);
        busca.addEventListener("input", desenhar);
        filtro.addEventListener("click", alternarFiltroEstoque);
        formulario.addEventListener("submit", adicionarProduto);
        desenhar();
    }

    iniciarListaPrecos();
})();
