import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountry } from './js/fetchCountry';
import { countryCardTemplate, countryListTemplate } from './js/markupTemplate';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  const boxValue = refs.searchBox.value;
  const searchBoxValue = boxValue.trim();

  if (searchBoxValue === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }

  fetchCountry(searchBoxValue)
    .then(renderCountryCard)
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryCard(data) {
  if (data.length >= 1 && data.length < 10) {
    const markup = data.map(country => countryListTemplate(country));
    refs.countryInfo.innerHTML = markup.join('');
    refs.countryList.innerHTML = '';
  }

  if (data.length === 1) {
    const markup = data.map(country => countryCardTemplate(country));
    refs.countryInfo.innerHTML = markup.join('');
    refs.countryList.innerHTML = '';
  }

  if (data.length >= 10) {
    Notify.info(
      'There are too many matches found. Please enter a more specific name'
    );
  }
}
