<div align="center">

# 👟 JUNOIR

**Landing page de loja de tênis Nike**
Vitrine de produtos, filtros por tamanho e cor e carrinho de compras.

`HTML` · `CSS` · `JavaScript` · sem frameworks, sem instalação

</div>

---

## ✨ Funcionalidades

| | Recurso | Detalhes |
|---|---|---|
| 🏠 | **Hero interativo** | Destaque com miniaturas para trocar o tênis exibido |
| 🛍️ | **Vitrine** | 5 modelos com foto, preço e parcelamento em 10x |
| 🔎 | **Filtros** | Por tamanho e por cor, combinados, com contador de resultados |
| 📏 | **Tamanhos disponíveis** | Tamanhos esgotados ficam desativados em cada card |
| 🛒 | **Carrinho lateral** | Quantidade, remoção, total e aviso de frete grátis |
| 💾 | **Carrinho salvo** | Continua o mesmo ao recarregar a página |
| 🌗 | **Modo claro e escuro** | Segue a configuração do dispositivo |
| 📱 | **Responsivo** | Funciona no celular, tablet e computador |
| ♿ | **Acessível** | Navegação por teclado, foco visível e `Esc` fecha o carrinho |

## 👟 Modelos

| Modelo | Tipo | Preço de exemplo |
|---|---|---|
| Air Max 90 | Estilo de rua | R$ 899,99 |
| Air Force 1 ’07 | Clássico | R$ 799,99 |
| Dunk Low | Skate e rua | R$ 749,99 |
| Pegasus 41 | Corrida diária | R$ 999,99 |
| Air Jordan 1 Low | Basquete e rua | R$ 899,99 |

## 🚀 Como usar

1. Baixe e extraia o arquivo `junoir.zip`.
2. Abra o `index.html` no navegador (duplo clique).

Pronto. Não precisa instalar nada nem rodar servidor.

> 🌐 As fontes vêm do Google Fonts e precisam de internet. Sem conexão, o navegador usa uma fonte padrão.

## 📁 Estrutura

```
junoir/
├── index.html        estrutura da página
├── css/
│   └── style.css     visual: cores, layout e modo escuro
├── js/
│   └── script.js     produtos, filtros e carrinho
├── images/           fotos dos tênis
│   ├── air-max-90.webp
│   ├── air-force-1-07.webp
│   ├── dunk-low.webp
│   ├── pegasus-41.webp
│   └── air-jordan-1-low.webp
└── README.md
```

## 🛠️ Como personalizar

### Trocar a foto de um tênis

As fotos ficam no objeto `IMG`, no início de `js/script.js`. O número é o `id` do produto.

```js
var IMG = {
  1: "images/air-max-90.webp",
  3: "images/dunk-nova.jpg", // nova foto do Dunk Low
};
```

Se você substituir o arquivo mantendo o mesmo nome, não precisa mexer no código.

### Adicionar um tênis

Use o mesmo `id` nos dois lugares.

```js
// 1. a foto, em IMG
6: "images/cortez.webp",

// 2. o produto, na lista P
{ id: 6, n: "Cortez", t: "Retrô", p: 549.99,
  c: ["Branco", "Vinho"], s: [36, 37, 38, 39, 40] },
```

| Campo | O que é |
|---|---|
| `id` | Número único do produto |
| `n` | Nome |
| `t` | Tipo ou categoria |
| `p` | Preço, com ponto decimal |
| `c` | Cores (precisam existir em `COLORS`) |
| `s` | Tamanhos disponíveis |

### Mudar cores, preços e frete

| O que mudar | Onde |
|---|---|
| Cor de destaque e fundos | Variáveis no topo de `css/style.css` (`--accent`, `--bg`, `--ink`...) |
| Cores do filtro | Objeto `COLORS` em `js/script.js` |
| Valor do frete grátis | Procure `399` em `js/script.js` |
| Nome da loja | `index.html` (título, topo e rodapé) |

### Dicas para as fotos

- Fundo branco e proporção 4:3, como as atuais (640×480).
- Formatos `.webp`, `.jpg` e `.png` funcionam.
- Nomes sem espaços e sem acentos, por exemplo `air-max-90.webp`.

## 🌍 Colocar no ar

| Opção | Como |
|---|---|
| **Netlify Drop** | Arraste a pasta `junoir` para `app.netlify.com/drop` |
| **GitHub Pages** | Suba a pasta para um repositório e ative *Settings → Pages* |
| **Vercel** | Importe o repositório e publique, sem configuração extra |

## ⚠️ Avisos

- Esta é uma **loja demonstrativa**. O botão *Finalizar compra* apenas simula o pedido, sem pagamento real.
- Preços e tamanhos são **exemplos**.
- Nike e Jordan são marcas registradas de seus respectivos titulares. As fotos devem ser usadas conforme os direitos de cada uma.

---

<div align="center">

Feito para a **JUNOIR** 👟

</div>
