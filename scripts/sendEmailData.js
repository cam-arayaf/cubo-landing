
const sendEmail = () => {
    const url = 'https://cubo-api-ciaf.herokuapp.com/send-email';
    let role = '';

    if(document.querySelector('#radio1').checked){
        role = 'Directivo';
    } else if(document.querySelector('#radio2').checked){
        role = 'Estudiante';
    } else if(document.querySelector('#radio3').checked){
        role = 'Profesor'
    } else {
        role = 'Apoderado'
    }

    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const comment = document.querySelector('#comment').value;
    const establishment = document.querySelector('#establishment').value;
    const email = document.querySelector('#email').value;

    const data = { role, name, establishment, email, phone, comment };

    const myInit = { 
        method: 'POST',
        body: JSON.stringify(data),
    }

    fetch(url, myInit)
        .then(response => response.json())
        .then(data => console.log(data));
}