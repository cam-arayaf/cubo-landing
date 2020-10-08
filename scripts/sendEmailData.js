const sendEmailData = () => {
    const role = document.querySelector('.hidden-radio:checked').value;
    const name = document.querySelector('#name').value;
    const establishment = document.querySelector('#establishment').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const comment = document.querySelector('#comment').value;

    const fields = formValidations(role, name, establishment, email, phone, comment);

    if (fields.length) return console.log(fields);

    const url = 'https://cubo-api-ciaf.herokuapp.com/send-email';

    const options = { 
        method: 'POST',
        body: JSON.stringify(fields),
        headers:{ 'Content-Type': 'application/json' }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}