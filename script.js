const header = document.querySelector('.site-header');
const form = document.querySelector('#estimate-form');
const responseMessage = document.querySelector('.form-response');
const yearEl = document.querySelector('#year');

const validators = {
    name: value => value.trim().length >= 2 || 'Please enter your full name.',
    email: value => (/^\S+@\S+\.\S+$/.test(value) ? true : 'Please enter a valid email address.'),
    phone: value => (/^(\+?1[-.\s]?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value) ? true : 'Enter a 10-digit phone number.'),
    service: value => (value ? true : 'Please select a service.'),
    consent: checked => (checked ? true : 'We need your permission to contact you.'),
};

function setYear() {
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function toggleHeaderShadow() {
    if (!header) return;
    const hasScrolled = window.scrollY > 10;
    header.classList.toggle('scrolled', hasScrolled);
}

function showError(field, message) {
    const errorEl = form.querySelector(`.error-message[data-for="${field.name}"]`);
    if (errorEl) {
        errorEl.textContent = message || '';
    }
    field.classList.toggle('has-error', Boolean(message));
}

function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;
    const value = field.type === 'checkbox' ? field.checked : field.value;
    const result = validator(value);
    if (result === true) {
        showError(field, '');
        return true;
    }
    showError(field, result);
    return false;
}

function handleFormSubmit(event) {
    if (!form) return;

    const fields = Array.from(form.elements).filter(element => element.name);
    const isValid = fields.every(field => validateField(field));

    if (!isValid) {
        event.preventDefault();
        responseMessage.textContent = 'Please correct the highlighted fields to continue.';
        responseMessage.style.color = '#dc2626';
        return;
    }

    responseMessage.textContent = '';
    responseMessage.style.color = '';
}

function initFormValidation() {
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('input', event => {
        if (event.target.name) {
            validateField(event.target);
        }
    });
}

setYear();
initFormValidation();
window.addEventListener('scroll', toggleHeaderShadow);
