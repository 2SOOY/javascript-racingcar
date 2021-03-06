export const $ = selector => document.querySelector(selector);
export const $$ = selector => document.querySelectorAll(selector);

export const clearInput = $target => {
  $target.value = '';
};

export const disableElements = (...elements) => {
  elements.forEach($element => ($element.disabled = true));
};

export const enableElements = (...elements) => {
  elements.forEach($element => ($element.disabled = false));
};
