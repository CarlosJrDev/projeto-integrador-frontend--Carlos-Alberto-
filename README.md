# E-commerce Show

Catálogo acadêmico de perfumaria e cuidados pessoais. A proposta é ajudar pequenos empreendedores a apresentar os produtos do estoque físico pela internet e facilitar a consulta de quem visita a vitrine.

## Funcionalidades

- Destaques dos produtos, tabela de quantidades e gráfico de estoque.
- Lista de preços de demonstração com busca por nome, filtro de disponibilidade, inclusão e remoção de itens.
- Guia em vídeo com legendas e versões em MP4 e WebM.
- Navegação adaptada para celular e links para páginas de produtos na Amazon Brasil.
- Formulário de avaliação usado na atividade acadêmica.

## Como visualizar

Baixe o projeto pelo botão **Code → Download ZIP** no GitHub, extraia a pasta e abra o arquivo `index.html` no navegador. Para testar a página com as legendas do vídeo, use um servidor local. Se o Python estiver instalado, abra um terminal na pasta e rode:

```bash
python -m http.server 8000
```

Abra [localhost:8000](http://localhost:8000/) no navegador. O site usa HTML, CSS e JavaScript.

## Créditos e limites da demonstração

- **Fotos de produto.** Encontrei as imagens do perfume 212 VIP Black e do hidratante CeraVe no Google Imagens e usei as duas na demonstração acadêmica.
- **Vídeo e capa.** O guia, a capa e as legendas foram preparados para o projeto. A capa e o vídeo usam as mesmas fotos dos produtos.
- **Fontes, ícone e gráfico.** O site usa as fontes disponíveis no dispositivo. O ícone de estoque é um desenho em SVG e o gráfico usa o Canvas do navegador.
- **Links comerciais.** O site usa links para a Amazon Brasil, sem integrar uma API da loja. Os endereços contêm parâmetros comerciais.
- **Dados de demonstração.** A lista usa dados fictícios e mantém inclusões e remoções em memória enquanto a página está aberta. A busca é processada no navegador. O formulário de avaliação pede nome e e-mail. O botão de envio usa `method="post"` e `action="#"`, sem código que impeça o envio nesse formulário.
