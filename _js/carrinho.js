if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

var totalAmount = "0,00"

function ready() {
  // Botão excluir produto
  const removeCartProductButtons = document.getElementsByClassName("excluir_item")
  for (var i = 0; i < removeCartProductButtons.length; i++) {
    removeCartProductButtons[i].addEventListener("click", removeProduct)
  }

  // Atualizar quantidade
  const quantityInputs = document.getElementsByClassName("atualiza_quant")
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull)
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("butao_add")
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart)
  }

  // Botão finalizar compra
  const purchaseButton = document.getElementsByClassName("botao_final_compra")[0]
  purchaseButton.addEventListener("click", makePurchase)
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove()
  updateTotal()
}

function checkIfInputIsNull(event) {
  if (event.target.value === "0") {
    event.target.parentElement.parentElement.remove()
  }

  updateTotal()
}

function addProductToCart(event) {
  const button = event.target
  const productInfos = button.parentElement.parentElement
  const productImage = productInfos.getElementsByClassName("imagem_produto")[0].src
  const productName = productInfos.getElementsByClassName("nome_produto")[0].innerText
  const productPrice = productInfos.getElementsByClassName("preco_produto")[0].innerText

  const productsCartNames = document.getElementsByClassName("cart-nome_produto")
  for (var i = 0; i < productsCartNames.length; i++) {
    if (productsCartNames[i].innerText === productName) {
      productsCartNames[i].parentElement.parentElement.getElementsByClassName("atualiza_quant")[0].value++
      updateTotal()
      return
    }
  }

  let newCartProduct = document.createElement("tr")
  newCartProduct.classList.add("cart-product")

  newCartProduct.innerHTML =
    `
      <td class="product-identification">
        <img src="${productImage}" alt="${productName}" class="cart-imagem_produto">
        <b class="cart-nome_produto">${productName}</b>
      </td>
      <td>
        <span class="cart-preco_produto">${productPrice}</span>
      </td>
      <td>
        <input type="number" value="1" min="0" class="atualiza_quant">
        <button type="button" class="botao_excluir">Excluir</button>
      </td>
    `
  
  const tableBody = document.querySelector(".cart-table tbody")
  tableBody.append(newCartProduct)
  updateTotal()

  newCartProduct.getElementsByClassName("botao_excluir")[0].addEventListener("click", removeProduct)
  newCartProduct.getElementsByClassName("atualiza_quant")[0].addEventListener("change", checkIfInputIsNull)
}

function makePurchase() {
  if (totalAmount === "0,00") {
    alert("Seu carrinho está vazio!")
  } else {   
    alert(
      `
        Obrigado pela sua compra!
        Valor do pedido: R$${totalAmount}\n
        Volte sempre :)
      `
    )

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
  }
}

// Atualizar o valor total do carrinho
function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product")
  totalAmount = 0

  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i].getElementsByClassName("cart-preco_produto")[0].innerText.replace("R$", "").replace(",", ".")
    const productQuantity = cartProducts[i].getElementsByClassName("atualiza_quant")[0].value

    totalAmount += productPrice * productQuantity
  }
  
  totalAmount = totalAmount.toFixed(2)
  totalAmount = totalAmount.replace(".", ",")
  document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}