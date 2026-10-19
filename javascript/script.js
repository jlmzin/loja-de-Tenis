var IMG = {
  1: "img/air-max-90.webp",
  2: "img/air-force-1-07.webp",
  3: "img/dunk-low.webp",
  4: "img/pegasus-41.webp",
  5: "img/air-jordan-1-low.webp",
};
var COLORS = {
  Bege: "#E3D8BD",
  Branco: "#F7F7F5",
  Preto: "#1B1F2A",
  Vinho: "#6E2433",
  Laranja: "#FF7A1A",
  Verde: "#7FA399",
};
var P = [
  {
    id: 1,
    n: "Air Max 90",
    t: "Estilo de rua",
    p: 899.99,
    c: ["Branco", "Preto", "Bege"],
    s: [37, 38, 39, 40, 41, 42],
  },
  {
    id: 2,
    n: "Air Force 1 ’07",
    t: "Clássico",
    p: 799.99,
    c: ["Bege", "Preto"],
    s: [36, 38, 40, 41, 42, 43],
  },
  {
    id: 3,
    n: "Dunk Low",
    t: "Skate e rua",
    p: 749.99,
    c: ["Vinho", "Bege"],
    s: [37, 38, 39, 41, 42],
  },
  {
    id: 4,
    n: "Pegasus 41",
    t: "Corrida diária",
    p: 999.99,
    c: ["Branco", "Laranja"],
    s: [39, 40, 41, 42, 43, 44],
  },
  {
    id: 5,
    n: "Air Jordan 1 Low",
    t: "Basquete e rua",
    p: 899.99,
    c: ["Preto", "Branco", "Verde"],
    s: [36, 37, 40, 41, 42, 44],
  },
];
var SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44];
var f = { size: null, color: null },
  pick = {},
  cart = [];
try {
  cart = JSON.parse(localStorage.getItem("jn-cart") || "[]");
} catch (e) {
  cart = [];
}
var $ = function (i) {
  return document.getElementById(i);
};
var brl = function (v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
function shoe(p) {
  return '<img src="' + IMG[p.id] + '" alt="Tênis ' + p.n + '">';
}
function toast(m) {
  var t = $("toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(toast.h);
  toast.h = setTimeout(function () {
    t.classList.remove("on");
  }, 1800);
}
function chip(label, on, fn, dot) {
  var b = document.createElement("button");
  b.className = "chip";
  b.setAttribute("aria-pressed", on);
  b.innerHTML = (dot ? '<i style="background:' + dot + '"></i>' : "") + label;
  b.onclick = fn;
  return b;
}
function filters() {
  var fs = $("fs"),
    fc = $("fc");
  fs.innerHTML = "";
  fc.innerHTML = "";
  SIZES.forEach(function (s) {
    fs.appendChild(
      chip(s, f.size === s, function () {
        f.size = f.size === s ? null : s;
        filters();
        render();
      }),
    );
  });
  Object.keys(COLORS).forEach(function (c) {
    fc.appendChild(
      chip(
        c,
        f.color === c,
        function () {
          f.color = f.color === c ? null : c;
          filters();
          render();
        },
        COLORS[c],
      ),
    );
  });
}
function render() {
  var g = $("grid");
  g.innerHTML = "";
  var L = P.filter(function (p) {
    return (
      (!f.size || p.s.indexOf(f.size) > -1) &&
      (!f.color || p.c.indexOf(f.color) > -1)
    );
  });
  $("cnt").textContent =
    L.length + (L.length === 1 ? " tênis encontrado" : " tênis encontrados");
  if (!L.length) {
    g.innerHTML =
      '<div class="empty"><b>Nenhum tênis com esses filtros.</b><br>Tente outra cor ou tamanho, ou limpe os filtros.</div>';
    return;
  }
  L.forEach(function (p) {
    if (f.size && p.s.indexOf(f.size) > -1 && !pick[p.id]) pick[p.id] = f.size;
    var c = document.createElement("article");
    c.className = "card";
    c.innerHTML =
      '<div class="img">' +
      shoe(p) +
      "</div><div><h3>" +
      p.n +
      '</h3><p class="meta">' +
      p.t +
      ". Cores: " +
      p.c.join(", ") +
      '</p></div><div class="price">' +
      brl(p.p) +
      " <small>ou 10x de " +
      brl(p.p / 10) +
      '</small></div><div class="sizes" role="group" aria-label="Tamanho"></div>';
    var z = c.querySelector(".sizes");
    SIZES.forEach(function (s) {
      var b = document.createElement("button");
      b.className = "sz";
      b.textContent = s;
      var ok = p.s.indexOf(s) > -1;
      b.disabled = !ok;
      b.setAttribute("aria-pressed", pick[p.id] === s);
      b.onclick = function () {
        pick[p.id] = s;
        render();
      };
      z.appendChild(b);
    });
    var a = document.createElement("button");
    a.className = "add";
    a.disabled = !pick[p.id];
    a.textContent = pick[p.id] ? "Adicionar ao carrinho" : "Escolha um tamanho";
    a.onclick = function () {
      add(p, pick[p.id]);
    };
    c.appendChild(a);
    g.appendChild(c);
  });
}
function save() {
  try {
    localStorage.setItem("jn-cart", JSON.stringify(cart));
  } catch (e) {}
}
function add(p, s) {
  var k = cart.filter(function (i) {
    return i.id === p.id && i.s === s;
  })[0];
  if (k) k.q++;
  else cart.push({ id: p.id, s: s, q: 1 });
  save();
  draw();
  toast(p.n + " (tam. " + s + ") adicionado");
}
function draw() {
  var n = 0,
    t = 0,
    w = $("items");
  w.innerHTML = "";
  cart.forEach(function (i, x) {
    var p = P.filter(function (q) {
      return q.id === i.id;
    })[0];
    if (!p) return;
    n += i.q;
    t += p.p * i.q;
    var d = document.createElement("div");
    d.className = "it";
    d.innerHTML =
      '<div class="th">' +
      shoe(p) +
      "</div><div><b>" +
      p.n +
      '</b><span class="meta">Tam. ' +
      i.s +
      ", " +
      brl(p.p) +
      '</span><div class="qty"><button aria-label="Diminuir">−</button><span>' +
      i.q +
      '</span><button aria-label="Aumentar">+</button><button class="rm">Remover</button></div></div>';
    var b = d.querySelectorAll("button");
    b[0].onclick = function () {
      i.q--;
      if (i.q < 1) cart.splice(x, 1);
      save();
      draw();
    };
    b[1].onclick = function () {
      i.q++;
      save();
      draw();
    };
    b[2].onclick = function () {
      cart.splice(x, 1);
      save();
      draw();
    };
    w.appendChild(d);
  });
  if (!cart.length)
    w.innerHTML =
      '<p class="meta">Seu carrinho está vazio. Escolha um tênis na vitrine.</p>';
  $("n").textContent = n;
  $("tot").textContent = brl(t);
  $("buy").disabled = !cart.length;
  $("ship").textContent = !cart.length
    ? ""
    : t >= 399
      ? "Você ganhou frete grátis."
      : "Faltam " + brl(399 - t) + " para o frete grátis.";
}
function drawer(o) {
  $("drawer").classList.toggle("on", o);
  $("shade").classList.toggle("on", o);
  $("drawer").setAttribute("aria-hidden", !o);
  if (o) $("close").focus();
  else $("open").focus();
}
$("open").onclick = function () {
  drawer(true);
};
$("close").onclick = $("shade").onclick = function () {
  drawer(false);
};
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") drawer(false);
});
$("clr").onclick = function () {
  f = { size: null, color: null };
  pick = {};
  filters();
  render();
};
$("buy").onclick = function () {
  cart = [];
  save();
  draw();
  drawer(false);
  toast("Pedido simulado. Obrigado pela visita!");
};
function hero(id) {
  var p = P.filter(function (q) {
    return q.id === id;
  })[0];
  $("heroShoe").innerHTML = shoe(p);
  [].forEach.call($("heroSw").children, function (b) {
    b.setAttribute("aria-pressed", b.dataset.c == id);
  });
}
P.forEach(function (p) {
  var b = document.createElement("button");
  b.className = "dot";
  b.dataset.c = p.id;
  b.setAttribute("aria-label", p.n);
  b.innerHTML = '<img src="' + IMG[p.id] + '" alt="">';
  b.onclick = function () {
    hero(p.id);
  };
  $("heroSw").appendChild(b);
});
hero(1);
filters();
render();
draw();
