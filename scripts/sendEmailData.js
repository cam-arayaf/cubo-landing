const sendEmailData = event => {
    event.preventDefault();
    
    const { target } = event;
    const { action, method } = target;

    const role = target.querySelector('.role:checked').value;
    const name = target.querySelector('#name').value;
    const establishment = target.querySelector('#establishment').value;
    const email = target.querySelector('#email').value;
    const phone = target.querySelector('#phone').value;
    const comment = target.querySelector('#comment').value;

    const fields = formValidations(role, name, establishment, email, phone, comment);

    if (fields.length) return console.log(fields);

    const options = { 
        method,
        body: JSON.stringify(fields),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(action, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}