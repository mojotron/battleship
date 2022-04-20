const hideShowElement = element => element.classList.toggle('hidden');

const hideElement = element => element.classList.add('hidden');

const showElement = element => element.classList.remove('hidden');

export { hideShowElement, hideElement, showElement };
