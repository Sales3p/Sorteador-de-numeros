document.querySelector('form').addEventListener('submit', function (event){
  event.preventDefault()

  const qtd = parseInt(document.getElementById('numb').value)
  const min = parseInt(document.getElementById('initial-numb').value)
  const max = parseInt(document.getElementById('end-numb').value)
  const noRep = document.getElementById('no-rep').checked

  let result = []

  if (min > max) {
    alert('O valor mínimo deve ser menor que o valor máximo.')
    return
  }

  if (noRep && qtd > (max - min + 1)) {
    alert('Não é possível sortear essa quantidade sem repetir números no intervalo escolhido.')
    return
  }

  if (qtd < 1 || qtd > 2) {
  alert('Você só pode sortear no mínimo 1 e no máximo 2 números.');
  return;
  }

  if (min < 1 || max > 1000) {
    alert('O intervalo deve estar entre 1 e 1000.');
    return;
  }


  if (noRep) {
    // Sem repetição
    let pool = []
    for (let i = min; i <= max; i++) {
      pool.push(i)
    }

    for (let i = 0; i < qtd; i++) {
      const index = Math.floor(Math.random() * pool.length)
      result.push(pool.splice(index, 1)[0])
    }
  } else {
    // Com repetição
    for (let i = 0; i < qtd; i++) {
      const numero = Math.floor(Math.random() * (max - min + 1)) + min
      result.push(numero)
    }
  }

  // Oculta o formulário
  const form = document.querySelector('form')
  form.style.display = 'none'

  // Cria e exibe a div de resultados
  const main = document.querySelector('main')
  const resultDiv = document.createElement('div')
  resultDiv.classList.add('result-display')

  // Título
  const title = document.createElement('h2')
  title.textContent = 'Números Sorteados:'
  resultDiv.appendChild(title)

  // Contêiner dos números
  const numbersContainer = document.createElement('div')
  numbersContainer.classList.add('numbers-container')

  // Cria elementos para cada número com spinner
  result.forEach((num, index) => {
    const numberBox = document.createElement('div')
    numberBox.classList.add('number-box')

    const spinner = document.createElement('div')
    spinner.classList.add('spinner-square')

    numberBox.appendChild(spinner)
    numbersContainer.appendChild(numberBox)

    // Substitui spinner por número após um tempo
    setTimeout(() => {
      spinner.remove()
      numberBox.textContent = num
      numberBox.classList.add('reveal-number')
    }, 1500 + index * 500) // Delay entre os números
  })

  resultDiv.appendChild(numbersContainer)

  // Cria a div com classe "submit" e o botão dentro dela
  const submitDiv = document.createElement('div')
  submitDiv.classList.add('submit', 'hidden-btn') // começa oculto

  const resetBtn = document.createElement('button')
  resetBtn.id = 'reset'
  resetBtn.textContent = 'SORTEAR NOVAMENTE'

  // Cria a imagem
  const img = document.createElement('img')
  img.src = 'assets/back.svg'

  resetBtn.appendChild(img)
  submitDiv.appendChild(resetBtn)
  resultDiv.appendChild(submitDiv)


  // Adiciona tudo na tela
  main.appendChild(resultDiv)

  // Mostra botão depois dos números
  setTimeout(() => {
    submitDiv.classList.remove('hidden-btn')
    submitDiv.classList.add('show-btn')
  }, 2500 + result.length * 500)


  resetBtn.addEventListener('click', () => {
    resultDiv.remove()
    form.style.display = 'block'
  })
})