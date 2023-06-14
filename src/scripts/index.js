function createCard(product) {
  const card = document.createElement("li");
  card.classList.add("card__container");

  const figureAlbum = document.createElement('figure');
  figureAlbum.classList.add('container__album');

  const imgAlbum = document.createElement('img');
  imgAlbum.classList.add('container__img');
  imgAlbum.dataset.category = product.category;
  imgAlbum.src = product.img;
  imgAlbum.alt = `${product.band} ${product.title} ${product.year} preço ${product.price}`;

  const titleBox = document.createElement('div');
  titleBox.classList.add('container__title--box');

  const titleName = document.createElement('p');
  titleName.classList.add('container__title--name');
  titleName.textContent = product.band;

  const titleYear = document.createElement('p');
  titleYear.classList.add('container__title--year');
  titleYear.textContent = product.year;

  const boxAlbum = document.createElement('div');
  boxAlbum.classList.add('container__album--content');

  const titleAlbum = document.createElement('h2');
  titleAlbum.classList.add('container__title--album');
  titleAlbum.textContent = product.title;

  const boxPrice = document.createElement('span');
  boxPrice.classList.add('container__price');

  const priceAlbum = document.createElement('p');
  priceAlbum.classList.add('container__text');
  priceAlbum.textContent = `R$ ${product.price.toFixed(2)}`;

  const buyAlbum = document.createElement('button');
  buyAlbum.classList.add('container__btn--buy');
  buyAlbum.innerText = "Comprar";

  figureAlbum.append(imgAlbum, titleBox);
  titleBox.append(titleName, titleYear);
  boxPrice.append(priceAlbum, buyAlbum);
  boxAlbum.append(titleAlbum, boxPrice);
  card.append(figureAlbum, boxAlbum);

  return card;
}

function renderButtons(array) {
    const buttonContainer = document.querySelector('.main__list--btn');
    buttonContainer.innerHTML = '';

    let inputID = 0;

    array.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list__item--input')
        const button = document.createElement('input');
        const label = document.createElement('label');
        button.setAttribute('hidden', true);

        button.type = 'radio';
        button.name = 'category';
        button.id = inputID;
        label.setAttribute('for', button.id); 

        button.classList.add('btn__mdt')
        label.textContent = item;

        listItem.append(button, label);
        buttonContainer.appendChild(listItem);

        inputID++;
    });
}

function renderCards(array) {
    const cardContainer = document.querySelector('.main__list--albums');
    cardContainer.innerHTML = '';

    array.forEach(item => {
        const card = createCard(item);
        cardContainer.appendChild(card);
    });
}

renderButtons(categories);
renderCards(products);


// ---------------------------------------------------------------------------------------

function addEventsAndFilter(categories, products) {
  const buttons = document.querySelectorAll('.btn__mdt');
  const inputRange = document.querySelector('#input__range');
  const currentPrice = document.querySelector('.price__value');

  let filteredProducts = [...products];
  let selectedCategory = 'Todos';

 

  

  buttons.forEach((button, index) => {
    console.log(button)
     if (button.id == 0) {
      console.log("oi")
        button.checked = true;
      }
    button.addEventListener('click', () => {
      const selectedButton = document.querySelector('.btn__mdt:checked');
      const buttonText = selectedButton.nextSibling.innerText;

      if (buttonText === 'Todos') {
        filteredProducts = [...products];
        button.checked = true;
      } else {
        const categoryIndex = categories.findIndex((category) => category === buttonText);
        filteredProducts = products.filter((product) => product.category === categoryIndex);
      }
      selectedCategory = buttonText;
      localStorage.setItem('selectedCategory', JSON.stringify(button.id));

      const selectedPrice = inputRange.value;
      currentPrice.textContent = selectedPrice;
      applyFilters(selectedCategory, selectedPrice);
    });
  });

  inputRange.addEventListener('input', () => {
    const selectedPrice = inputRange.value;
    currentPrice.textContent = selectedPrice;
    applyFilters(selectedCategory, selectedPrice);
  });

  function applyFilters(category, price) {
    let filteredByCategory = [...products];
    if (category !== 'Todos') {
      const categoryIndex = categories.findIndex((cat) => cat === category);
      filteredByCategory = products.filter((product) => product.category === categoryIndex);
    }
    filteredProducts = filteredByCategory.filter((product) => product.price <= price);
    renderCards(filteredProducts);
  }
}

const checkedFilter = () => {
  const storedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
  console.log(storedCategory);
  if(storedCategory){
  const button = document.getElementById(storedCategory);
  button.click();
}
};

addEventsAndFilter(categories, products);
checkedFilter();
  