import { getImages } from "./js/pixabay-api";
import { imagesTemplate } from "./js/render-functions";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    formInput: document.querySelector('.search-images-form'),
    gallery: document.querySelector('.gallery'),
    loadImg: document.querySelector('.loader'),
    btnLoadMore: document.querySelector('.load-more-btn'),
};

let captionDisplay = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let query = '';
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

refs.formInput.addEventListener('submit', async e => {
    e.preventDefault();

    while (refs.gallery.firstChild) {refs.gallery.removeChild(refs.gallery.firstChild)}

    query = e.target.elements.input.value.trim();
    if (!query) {
        showError('Search field is empty');
        return;
    }
    
    currentPage = 1;
    showLoader();
    hideLoadBtn();
    
    try {
        const data = await getImages(query, currentPage);
        maxPage = Math.ceil(data.totalHits / perPage);

        if (maxPage === 0) {
            showError('Sorry, there are no images matching your search query. Please try again!');
            hideLoader();
            changeBtnStatus();
            return;
        }

        const markup = imagesTemplate(data.hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);

        captionDisplay.refresh();
    } catch (err) {
        showError(err);
    }

    hideLoader();
    changeBtnStatus();
    refs.formInput.reset();
});

refs.btnLoadMore.addEventListener('click', async () => {
  currentPage++;
  hideLoadBtn();
  showLoader();

  try {
    const data = await getImages(query, currentPage);
    const markup = imagesTemplate(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    
    skipOldElement();
      
    captionDisplay.refresh();
  } catch (err) {
      showError(err);
  }

  hideLoader();
  changeBtnStatus();
});


function showError(message) {
  iziToast.error({
    position: 'topRight',
    backgroundColor: 'red',
    theme: 'dark',
    title: 'Error',
    titleColor: 'white',
    message,
    messageColor: 'white',
    maxWidth: 400,
  });
}

function showLoadBtn() {
  refs.btnLoadMore.classList.remove('visually-hidden');
}
function hideLoadBtn() {
  refs.btnLoadMore.classList.add('visually-hidden');
}

function changeBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadBtn();

    if (maxPage) {
        iziToast.info({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } else {
    showLoadBtn();
  }
}

function showLoader() {
  refs.loadImg.classList.remove('visually-hidden');
}
function hideLoader() {
  refs.loadImg.classList.add('visually-hidden');
}

function skipOldElement() {
  const galleryElem = refs.gallery.children[0];
  const height = galleryElem.getBoundingClientRect().height;
  
  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}