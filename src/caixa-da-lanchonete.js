var cardapio = {
  cafe: {
    codigo: "cafe",
    descricao: "Café",
    valor: 3.00
  },
  chantily: {
    codigo: "chantily",
    descricao: "Chantily (extra do Café)",
    valor: 1.50
  },
  suco: {
      codigo: "suco",
      descricao: "Suco Natural",
      valor: 6.20
    },
    sanduiche: {
      codigo: "sanduiche",
      descricao: "Sanduíche",
      valor: 6.50
    },
    queijo: {
      codigo: "queijo",
      descricao: "Queijo (extra do Sanduíche)",
      valor: 2.00
    },
    salgado: {
      codigo: "salgado",
      descricao: "Salgado",
      valor: 7.25
    },
    combo1: {
      codigo: "combo1",
      descricao: "1 Suco e 1 Sanduíche",
      valor: 9.50
    },
    combo2: {
      codigo: "combo2",
      descricao: "1 Café e 1 Sanduíche",
      valor: 7.50
    },
  // cardapio
};

class CaixaDaLanchonete {

  validarItens(formaDePagamento, itens, cardapio) {
    if (formaDePagamento === "dinheiro") {
      for (var i = 0; i < itens.length; i++) {
        var item = itens[i].split(",");
        var codigo = item[0];
        var quantidade = parseInt(item[1]);

        if (quantidade === 0) {
          return "Quantidade inválida!";
        }
      }
    }

    for (var i = 0; i < itens.length; i++) {
      var item = itens[i].split(",");
      var codigo = item[0];
      var quantidade = parseInt(item[1]);

      if (!cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }
    }

    return true;
  }
  

   validarFormaDePagamento(formaDePagamento) {
    // criando um array com as formas de pagamento aceitas
    var formasAceitas = ["dinheiro", "debito", "credito"];
    // verificando se a forma de pagamento está no array
    if (formasAceitas.includes(formaDePagamento)) {
      // se estiver, retorna true
      return true;
    } else {
      // se não estiver, retorna false
      return false;
    }
  }
  
   calcularSubtotal(itens) {
    // criando uma variável para armazenar o subtotal
    var subtotal = 0;
    // percorrendo o array de itens
    for (var i = 0; i < itens.length; i++) {
      // separando o codigo e a quantidade do item
      var item = itens[i].split(",");
      var codigo = item[0];
      var quantidade = parseInt(item[1]);
      // buscando o valor do item no cardapio
      var valor = cardapio[codigo].valor;
      // multiplicando o valor pela quantidade e adiciona ao subtotal
      subtotal += valor * quantidade;
    }
    // retornando o subtotal arredondado para duas casas decimais
    return parseFloat(subtotal.toFixed(2));
  }
  
   calcularDesconto(subtotal, formaDePagamento) {
    // criando uma variável para armazenar o desconto
    var desconto = 0;
    // verificando se a forma de pagamento é dinheiro
    if (formaDePagamento === "dinheiro") {
      // calculando o desconto de 5% sobre o subtotal
      desconto = subtotal * 0.05;
    }
    // retornando o desconto arredondado para duas casas decimais
    return parseFloat(desconto.toFixed(2));
  }
  
   calcularTaxa(subtotal, formaDePagamento) {
    // criando uma variável para armazenar a taxa
    var taxa = 0;
    // verificando se a forma de pagamento é credito
    if (formaDePagamento === "credito") {
      // calculando a taxa de 3% sobre o subtotal
      taxa = subtotal * 0.03;
    }
    // retornando a taxa arredondada para duas casas decimais
    return parseFloat(taxa.toFixed(2));
  }
  
   calcularTotal(subtotal, desconto, taxa) {
    // calculando o total subtraindo o desconto e adicionando a taxa ao subtotal
    var total = subtotal - desconto + taxa;
    // retornando o total arredondado para duas casas decimais
    return parseFloat(total.toFixed(2));
  }
  
     validarExtras(itens) {
    // cria um objeto com os itens principais e seus respectivos extras
    var itensPrincipais = {
      cafe: ["chantily"],
      sanduiche: ["queijo"]
    };
    // cria um array para armazenar os codigos dos itens principais pedidos
    var principaisPedidos = [];
    // percorre o array de itens
    for (var i = 0; i < itens.length; i++) {
      // separa o codigo e a quantidade do item
      var item = itens[i].split(",");
      var codigo = item[0];
      var quantidade = parseInt(item[1]);
      // verifica se o codigo é um item principal
      if (itensPrincipais.hasOwnProperty(codigo)) {
        // se for, adiciona ao array de principais pedidos
        principaisPedidos.push(codigo);
      }
    }
    // percorre novamente o array de itens
    for (var i = 0; i < itens.length; i++) {
      // separa o codigo e a quantidade do item
      var item = itens[i].split(",");
      var codigo = item[0];
      var quantidade = parseInt(item[1]);
      // verifica se o codigo é um item extra
      if (!itensPrincipais.hasOwnProperty(codigo)) {
        // se for, percorre as propriedades do objeto de itens principais
        for (var principal in itensPrincipais) {
          // verifica se o codigo está no array de extras do item principal
          if (itensPrincipais[principal].includes(codigo)) {
            // se estiver, verifica se o item principal está no array de principais pedidos
            if (!principaisPedidos.includes(principal)) {
              // se não estiver, retorna false
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (!this.validarFormaDePagamento(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (!this.validarExtras(itens)) {
      return "Item extra não pode ser pedido sem o principal";
    }

    var invalidItemMessage = this.validarItens(formaDePagamento, itens, cardapio);
    if (invalidItemMessage === "Quantidade inválida!") {
      return "Quantidade inválida!";
    } else if (invalidItemMessage === "Item inválido!") {
      return "Item inválido!";
    }

    var subtotal = this.calcularSubtotal(itens);
    var desconto = this.calcularDesconto(subtotal, formaDePagamento);
    var taxa = this.calcularTaxa(subtotal, formaDePagamento);
    var total = this.calcularTotal(subtotal, desconto, taxa);
    var formattedTotal = total.toFixed(2).replace(".", ",");
    return "R$ " + formattedTotal;
  }
  }
  

  export { CaixaDaLanchonete };