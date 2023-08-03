async function fetchDetailList() {
  try {
    const response = await fetch('http://192.168.1.106:8000/project/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return [];
  }
}

// Функция для выполнения запроса к серверу и получения данных
function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
      return []; 
    });
}

function displayPhoto(data, indexOrId) {
  const photosContainer = document.getElementById('photos-container');

  const photo = data.find(item => item.id === indexOrId || data.indexOf(item) === indexOrId);

  if (photo) {
    const img = document.createElement('img');
    img.src = photo.photo;
    img.alt = `Фото ${photo.id}`;
    img.classList.add('img')

    photosContainer.innerHTML = '';
    photosContainer.appendChild(img);
  } else {
    console.error(`Фото с id или индексом ${indexOrId} не найдено`);
  }
}

const apiUrl = 'http://192.168.1.106:8000/photo/'; 
const indexOrIdToShow = 5; 

fetchData(apiUrl)
  .then(data => {
    displayPhoto(data, indexOrIdToShow);
  })
  .catch(error => console.error('Произошла ошибка:', error));


async function renderDetails() {
  const details = await fetchDetailList('');
  const detailListContainer = $('#detailList');


  const detail = details[3]; 

  const detailElement = $('<div class="detail"></div>');

  const titleElement = $(`<h1 class="subtitle">${detail.name_site}</h1>`);
  detailElement.append(titleElement);

  const descriptionElement = $(`<p class="text">${detail.description}</p>`);
  detailElement.append(descriptionElement);


  if (detail.link_site) {
    const linkElement = $(`<a class="link"href="${detail.link_site}" target="_blank">Перейти на сайт</a>`);
    detailElement.append(linkElement);
  }

  

  detailListContainer.append(detailElement);
}


$(document).ready(() => {
  renderDetails();
});
















