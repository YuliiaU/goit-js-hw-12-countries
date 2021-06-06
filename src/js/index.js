import listTpl from '/templates/listTpl.hbs';
import cardTpl from '/templates/cardTpl.hbs';
import { debounce } from 'lodash';
import '/sass/main.scss';
import fetchCountries from '/js/fetchCountries';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const search = document.querySelector('.js-search-form');
const listContainer = document.querySelector('.js-articles-container');

search.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {

 
updatePage();
  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
  .then(countries => {

    if(countries.length > 10) {
      error({
        text: 'Too many matches found. Please enter a more specific query!',
        mode: 'light',
        closer: true,
        hide: true,
        sticker: false,
        mouseReset: true,
        shadow: true,
        width: '350px',
        minHeight: '14px',
        delay: 2000,
      });
    }
    if(countries.length <= 10 && countries.length > 1) {
     
      updatePage(listTpl(countries));
      return;
    }
    if(countries.length === 1) {
     
      updatePage(cardTpl(countries));
      return;
    }
  })
  .catch(onFetchError);
}

function updatePage(markup = "") {
listContainer.innerHTML = markup;
}

function onFetchError(err) {
  error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    hide: true,
    sticker: false,
    mouseReset: true,
    shadow: true,
    width: '350px',
    minHeight: '14px',
    delay: 2000,
  })
}
