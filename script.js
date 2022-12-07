var root = document.documentElement
var profitEmojis = document.querySelector('#profitEmojis')
var lossEmojis = document.querySelector('#lossEmojis')
var heroImg = document.querySelector('#hero-img')
var currentPriceInput = document.querySelector('#current-price')
var purchasePriceInput = document.querySelector('#purchase-price')
var stockQuantityInput = document.querySelector('#stock-quantity')
var checkAction = document.querySelector('#check')
var result = document.querySelector('#result')
var resultText = document.querySelector('#result-text')

function giveResult(event) {
  event.preventDefault()

  if (!currentPriceInput.value || !purchasePriceInput.value || !stockQuantityInput.value) {
    alert("Invalid Input! Please enter correct values :)")
    return
  }

  var currentPrice = parseFloat(currentPriceInput.value)
  var purchasePrice = parseFloat(purchasePriceInput.value)
  var stockQuantity = parseInt(stockQuantityInput.value)

  if (currentPrice <= 0 || purchasePrice<=0 || stockQuantity<=0) {
    alert("Values can't be less than or equal to 0! Enter valid values :)")
    return
  }

  if (currentPrice > purchasePrice) {
    var percentProfit = (
      ((currentPrice - purchasePrice) / purchasePrice) *
      100
    ).toFixed(2)
    var absoluteProfit = (
      (currentPrice - purchasePrice) *
      stockQuantity
    ).toFixed(2)

    if (percentProfit >= 50) {
      root.style.setProperty('--primary-color', '#8AFF8A')
      root.style.setProperty('--secondary-color', '#065F46')
      root.style.setProperty('--tertiary-color', 'white')
      root.style.setProperty('--quaternary-color', '#064E3B')
      heroImg.src = 'assets/profit.svg'
    }

    lossEmojis.style.display = 'none'
    profitEmojis.style.display = 'block'
    result.style.display = 'block'

    setTimeout(function () {
      profitEmojis.style.display = 'none'
    }, 30000)

    resultText.textContent =
      'You gained ' +
      percentProfit +
      '%. Your total profit is ' +
      absoluteProfit +
      '.'
  } else if (currentPrice < purchasePrice) {
    var percentLoss = (
      ((purchasePrice - currentPrice) / purchasePrice) *
      100
    ).toFixed(2)
    var absoluteLoss = ((purchasePrice - currentPrice) * stockQuantity).toFixed(
      2
    )

    if (percentLoss >= 50) {
      root.style.setProperty('--primary-color', '#EF4444')
      root.style.setProperty('--secondary-color', '#991B1B')
      root.style.setProperty('--tertiary-color', 'white')
      root.style.setProperty('--quaternary-color', '#7F1D1D')
      heroImg.src = 'assets/loss.svg'
    }

    profitEmojis.style.display = 'none'
    lossEmojis.style.display = 'block'
    result.style.display = 'block'

    setTimeout(function () {
      lossEmojis.style.display = 'none'
    }, 30000)

    resultText.textContent =
      'You lost ' + percentLoss + '%. Your total loss is ' + absoluteLoss + '.'
  } else if (currentPrice === purchasePrice) {
    result.style.display = 'block'
    resultText.textContent = 'Perfectly balanced!'
  }
}

checkAction.addEventListener('click', giveResult)
