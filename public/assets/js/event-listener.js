document.addEventListener('DOMContentLoaded', () => {
    const collapsible = document.querySelectorAll('.collapsible');
    const form = document.querySelector("form");
    const role = document.querySelectorAll('.role');
    const name = document.querySelector('#name');
    const establishment = document.querySelector('#establishment');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const comment = document.querySelector('#comment');
    const bottomPage = document.querySelector('#bottom-page');

    role.forEach(e => e.checked = e.value === 'Directivo');
    name.value = '';
    establishment.value = '';
    email.value = '';
    phone.value = '';
    comment.value = '';
    bottomPage.disabled = true;
    bottomPage.classList.add('disabled-btn');

    M.Collapsible.init(collapsible, { accordion: false });

    form.onsubmit = sendForm;
    form.oninput = () => {
        const wrongInput = !!document.querySelector('.wrong-input');
        bottomPage.disabled = wrongInput;
        wrongInput ? bottomPage.classList.add('disabled-btn') : bottomPage.classList.remove('disabled-btn');
    }

    const validateField = (event, regex) => {
        const { target } = event;
        const { minLength, value } = target;
        const { length } = value.trim();

        if (!length) {
            target.classList.add('wrong-input');
            return target.value = '';
        };

        if (regex) target.value = value.replace(regex, '');

        const minimalLength = !(target.value.length < minLength);

        !minimalLength ? target.classList.add('wrong-input') : target.classList.remove('wrong-input');

        return minimalLength;
    }

    const trimField = event => event.target.value = event.target.value.trim();

    name.oninput = event => validateField(event, /[^a-zA-Z ]/);
    name.onblur = trimField;

    establishment.oninput = event => validateField(event, /[^a-zA-Z0-9-. ]/);
    establishment.onblur = trimField;

    email.oninput = validateField;

    phone.oninput = event => validateField(event, /[^0-9]/);

    comment.oninput = validateField;
    comment.onblur = trimField;
});