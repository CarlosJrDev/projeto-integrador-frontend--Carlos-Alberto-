/*
Tema: análise do estoque de um catálogo de perfumaria e cuidados pessoais.
Entrada: cinco produtos de demonstração e um limite de estoque baixo.
Processamento: classificar as quantidades, identificar as seções e somar o estoque.
Saída: tabela por produto e resumo no console.

Pseudocódigo
    Pedir um limite de estoque baixo ou o comando sair.
    Enquanto a pessoa quiser continuar, converter e validar o limite.
    Para cada produto, classificar o estoque e identificar a seção.
    Contar os produtos por situação e somar as unidades.
    Mostrar a tabela e o resumo quando o limite for válido.
    Pedir outro limite ou o comando sair.
*/

const produtosDemo = [
    { nome: "Perfume 212 VIP Black", categoria: "perfume", quantidade: 15 },
    { nome: "Creme hidratante CeraVe", categoria: "hidratante", quantidade: 5 },
    { nome: "Protetor solar facial", categoria: "protetor", quantidade: 0 },
    { nome: "Body splash", categoria: "perfume", quantidade: 8 },
    { nome: "Hidratante para as mãos", categoria: "hidratante", quantidade: 2 }
];

function analisarEstoque(limite) {
    const relatorio = [];
    let esgotados = 0;
    let estoqueBaixo = 0;
    let estoqueNormal = 0;
    let totalUnidades = 0;

    /*
    Teste de mesa com limite 5, após cada volta.
    Volta | Produto                | Qtd | Situação | Total | Esg. | Baixo | Normal
    1     | Perfume 212 VIP Black   | 15  | Normal   | 15    | 0    | 0     | 1
    2     | Creme hidratante CeraVe |  5  | Baixo    | 20    | 0    | 1     | 1
    3     | Protetor solar facial   |  0  | Esgotado | 20    | 1    | 1     | 1
    */
    for (const produto of produtosDemo) {
        let situacao;
        if (produto.quantidade === 0) {
            situacao = "Esgotado";
            esgotados++;
        } else if (produto.quantidade <= limite) {
            situacao = "Baixo";
            estoqueBaixo++;
        } else {
            situacao = "Normal";
            estoqueNormal++;
        }

        let secao;
        switch (produto.categoria) {
            case "perfume":
                secao = "Perfumaria";
                break;
            case "hidratante":
                secao = "Cuidados com a pele";
                break;
            case "protetor":
                secao = "Proteção solar";
                break;
            default:
                secao = "Outros";
                break;
        }

        totalUnidades += produto.quantidade;
        relatorio.push({
            produto: produto.nome,
            secao: secao,
            quantidade: produto.quantidade,
            situacao: situacao
        });
    }

    console.log(`Limite de estoque baixo: ${limite} unidade(s).`);
    console.table(relatorio);
    console.log(`Total: ${totalUnidades} unidades em ${relatorio.length} produtos de demonstração.`);
    console.log(`Esgotados: ${esgotados} | Estoque baixo: ${estoqueBaixo} | Normal: ${estoqueNormal}.`);
}

function executarAnaliseEstoque() {
    const pergunta = 'Digite um limite de 1 a 100 ou escreva "sair".';
    let entrada = window.prompt(pergunta);

    while (entrada !== null && entrada.trim().toLowerCase() !== "sair") {
        const texto = entrada.trim();
        const limite = Number(texto);
        if (texto === "" || !Number.isInteger(limite) || limite < 1 || limite > 100) {
            entrada = window.prompt(`Use um número inteiro de 1 a 100.\n\n${pergunta}`);
        } else {
            analisarEstoque(limite);
            entrada = window.prompt(`Relatório disponível no console.\n\n${pergunta}`);
        }
    }
}

document.getElementById("analisar-estoque").addEventListener("click", executarAnaliseEstoque);
