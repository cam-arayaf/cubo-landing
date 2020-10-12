document.addEventListener('DOMContentLoaded', () => {
    //SELECTORS
    const collapsible = document.querySelectorAll('.collapsible');
    const carousel = document.querySelectorAll('.carousel');
    const form = document.querySelector("form");
    const role = document.querySelectorAll('.role');
    const name = document.querySelector('#name');
    const establishment = document.querySelector('#establishment');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const comment = document.querySelector('#comment');
    const bottomPage = document.querySelector('#bottom-page');

    //RESET VALUES
    role.forEach(e => e.checked = e.value === 'Directivo');
    name.value = '';
    establishment.value = '';
    email.value = '';
    phone.value = '';
    comment.value = '';
    bottomPage.disabled = true;
    bottomPage.classList.add('disabled-button');

    //INITIALIZE COLLAPSIBLE AND CAROUSEL
    M.Collapsible.init(collapsible, { accordion: false });
    M.Carousel.init(carousel, { indicators: true, fullWidth: true });

    //CUSTOM FUNCTIONS
    const setClassField = (target, minLength, type) => {
        const minimalLength = !(target.value.length < minLength);
        const className = type === 'textarea' ? 'wrong-textarea' : 'wrong-input';
        !minimalLength ? target.classList.add(className) : target.classList.remove(className);
    }

    const validateButton = () => {
        const wrongInput = !!form.querySelector('.wrong-input, .wrong-textarea');
        const emptyInput = !!Object.values(form.querySelectorAll('input, textarea')).find(e => !e.value);
        const disabledButton = wrongInput || emptyInput;
        bottomPage.disabled = disabledButton;
        disabledButton ? bottomPage.classList.add('disabled-button') : bottomPage.classList.remove('disabled-button');
    }

    const replaceField = (event, regex) => {
        const { target } = event;
        const { minLength, type, value } = target;
        if (regex) target.value = value.replace(regex, '');
        if (!target.value.trim().length) return target.value = '';
        setClassField(target, minLength, type);
        validateButton();
    }

    const trimField = event => {
        const { target } = event;
        const { minLength, type, value } = target;
        target.value = value.trim();
        setClassField(target, minLength, type);
        validateButton();
    }

    //EVENTS
    form.onsubmit = sendForm;

    name.oninput = event => replaceField(event, /[^a-zA-Z ]/);
    name.onblur = trimField;

    establishment.oninput = event => replaceField(event, /[^a-zA-Z0-9-. ]/);
    establishment.onblur = trimField;

    email.oninput = replaceField;
    email.onblur = trimField;

    phone.oninput = event => replaceField(event, /[^0-9]/);
    phone.onblur = trimField;

    comment.oninput = replaceField;
    comment.onblur = trimField;
});