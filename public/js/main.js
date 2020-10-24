document.addEventListener('DOMContentLoaded', () => {
    //SELECTORS
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalFirstParagraph = document.querySelector('.modal-first-paragraph');
    const modalLastParagraph = document.querySelector('.modal-last-paragraph');
    const modalImage = document.querySelector('.modal-image');
    const modalButtons = document.querySelector('.modal-buttons');
    const carousel = document.querySelectorAll('.carousel');
    const collapsible = document.querySelectorAll('.collapsible');
    const form = document.querySelector("form");
    const role = document.querySelectorAll('.role');
    const name = document.querySelector('#name');
    const establishment = document.querySelector('#establishment');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const comment = document.querySelector('#comment');
    const bottomPage = document.querySelector('#bottom-page');

    //REGEX
    const regexName = /[^a-zA-Z ]/;
    const regexEstablishment = /[^a-zA-Z0-9-. ]/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPhone = /[^0-9]/;

    //INITIALIZE MODAL, CAROUSEL AND COLLAPSIBLE
    const modalInstance = M.Modal.init(modal, { dismissible: false });
    M.Carousel.init(carousel, { fullWidth: true, duration: 150, indicators: true });
    M.Collapsible.init(collapsible, { accordion: true });

    // AUTOPLAY SLIDER
    setInterval(() => M.Carousel.getInstance(carousel[0]).next(), 4500);

    //CUSTOM FUNCTIONS
    const resetValues = () => {
        role.forEach(e => e.checked = e.value === 'Directivo');
        name.value = '';
        establishment.value = '';
        email.value = '';
        phone.value = '';
        comment.value = '';
    }

    const setClassField = (target, minLength, type, regex) => {
        const evaluateWay = type === 'email' ? regex.test(target.value.trim()) : !(target.value.length < minLength);
        const className = type === 'textarea' ? 'wrong-textarea' : 'wrong-input';

        !evaluateWay ? target.classList.add(className) : target.classList.remove(className);
    }

    const validateButton = () => {
        const wrongInput = !!form.querySelector('.wrong-input, .wrong-textarea');
        const emptyInput = !!Object.values(form.querySelectorAll('input, textarea')).find(e => !e.value);
        const disabledButton = wrongInput || emptyInput;

        bottomPage.disabled = disabledButton;
        disabledButton ? bottomPage.classList.add('disabled-button') : bottomPage.classList.remove('disabled-button');
    }

    const checkField = (event, regex) => {
        const { target } = event;
        const { minLength, type, value } = target;

        if (regex && type !== 'email') target.value = value.replace(regex, '');
        if (!target.value.trim().length) return target.value = '';

        setClassField(target, minLength, type, regex);
        validateButton();
    }

    const trimField = (event, regex) => {
        const { target } = event;
        const { minLength, type, value } = target;

        target.value = value.trim();
        setClassField(target, minLength, type, regex);
        validateButton();
    }

    const sendForm = event => {
        event.preventDefault();

        const upperCaseFirstLetterFirstWord = value => value.charAt(0).toUpperCase() + value.slice(1);
        const upperCaseFirstLetterAllWords = value => value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        const setModalElements = (newValues, title, firstParagraph, lastParagraph) => {
            modalTitle.textContent = title;
            modalFirstParagraph.textContent = firstParagraph;
            modalLastParagraph.textContent = lastParagraph;
            newValues ? modalTitle.classList.remove('d-none') : modalTitle.classList.add('d-none');
            newValues ? modalFirstParagraph.classList.remove('d-none') : modalFirstParagraph.classList.add('d-none');
            newValues ? modalLastParagraph.classList.remove('d-none') : modalLastParagraph.classList.add('d-none');
            newValues ? modalImage.classList.add('d-none') : modalImage.classList.remove('d-none');
            newValues ? modalButtons.classList.remove('d-none') : modalButtons.classList.add('d-none');
        }

        const responseActions = (responseOk, newValues) => {
            const title = responseOk ? 'Enhorabuena!!' : 'Ups!!';
            const firstParagraph = responseOk ? 'Tu solicitud ha sido enviada correctamente.' : 'Parece que tenemos problemas en nuestros servidores.';
            const lastParagraph = responseOk ? 'Muchas gracias por preferir nuestros servicios.' : 'Podrías intentarlo nuevamente.';
            setModalElements(newValues, title, firstParagraph, lastParagraph);
            responseOk && resetValues();
            responseOk && validateButton();
        }

        setModalElements(false, '', '', '');
        modalInstance.open();

        const fields = {
            role: Object.values(role).find(e => e.checked).value,
            name: upperCaseFirstLetterAllWords(name.value),
            establishment: upperCaseFirstLetterAllWords(establishment.value),
            email: email.value,
            phone: phone.value,
            comment: upperCaseFirstLetterFirstWord(comment.value)
        };

        const { action, method } = event.target;

        const options = { 
            method,
            body: JSON.stringify(fields),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(action, options)
            .then(response => response.json())
            .then(data => responseActions(data.emailSent, true))
            .catch(() => responseActions(false, true));
    }

    //CALL CUSTOM FUNCTIONS
    resetValues();

    //EVENTS
    form.onsubmit = sendForm;

    name.oninput = event => checkField(event, regexName);
    name.onblur = trimField;

    establishment.oninput = event => checkField(event, regexEstablishment);
    establishment.onblur = trimField;

    email.oninput = event => checkField(event, regexEmail);
    email.onblur = event => trimField(event, regexEmail);

    phone.oninput = event => checkField(event, regexPhone);
    phone.onblur = trimField;

    comment.oninput = checkField;
    comment.onblur = trimField;
});