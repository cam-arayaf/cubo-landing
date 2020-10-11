document.addEventListener('DOMContentLoaded', () => {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, { accordion: false });

    const form = document.querySelector("form");
    form.onsubmit = sendForm;

    const validateField = (event, regex) => {
        const { target } = event;
        const { minLength, value } = target;
        const { length } = value.trim();
        if (!length) return target.value = '';
        if (regex) target.value = value.replace(regex, '');
        return !(length < minLength);
    }

    const trimField = event => event.target.value = event.target.value.trim();

    const name = document.querySelector('#name');
    name.oninput = event => validateField(event, /[^a-zA-Z ]/);
    name.onblur = trimField;

    const establishment = document.querySelector('#establishment');
    establishment.oninput = event => validateField(event, /[^a-zA-Z0-9-. ]/);
    establishment.onblur = trimField;

    const email = document.querySelector('#email');
    email.oninput = validateField;

    const phone = document.querySelector('#phone');
    phone.oninput = event => validateField(event, /[^0-9]/);

    const comment = document.querySelector('#comment');
    comment.oninput = validateField;
    comment.onblur = trimField;
});