import { fetchImages } from './js/pixabay-api';
import { renderImages, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input[name="search"]');
const submitButton = document.querySelector('.search-form button[type="submit"]');
const loader = document.querySelector('.loader');

const handleSubmitForm = async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showNotification('Please enter a search query.');
    return;
  }

  // Блокуємо кнопку і показуємо лоадер
  submitButton.disabled = true;
  loader.style.display = 'flex';

  try {
    const data = await fetchImages(query);

    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      await renderImages(data.hits);
    }
  } catch (error) {
    showNotification(
      'An error occurred while fetching images. Please try again later.'
    );
    console.error('Error fetching images:', error); // Логування помилки для діагностики
  } finally {
    loader.style.display = 'none'; // Приховуємо лоадер
    submitButton.disabled = false; // Розблокуємо кнопку
    form.reset(); 
  }
};

form.addEventListener('submit', handleSubmitForm);
