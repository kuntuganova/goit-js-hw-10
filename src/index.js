import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountry } from './js/fetchCountry';
import { countryCardTemplate, countryListTemplate } from './js/markupTemplate';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;
