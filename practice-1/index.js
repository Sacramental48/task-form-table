const modalWindow = document.querySelector('.main__modal');
const mainContent = document.querySelector('.main__content');
const openModalWindowButton = document.querySelector('.block__button');
const closeModalWindowButton = document.querySelector('.form__decline');
const sendFormButton = document.querySelector('.form__accept');
const inputData = document.querySelectorAll('.form__input');
const phoneError = document.querySelector('.form__phone--error');
const emailError = document.querySelector('.form__email--error');
const toggleErrorField = document.querySelectorAll('.toggleError');
const toggleEmailField = document.querySelectorAll('.toggleEmail');
const togglePhoneField = document.querySelectorAll('.togglePhone');
const fileInput = document.getElementById('fileInput');
const logoImage = document.getElementById('logoImage');
const resetImage = document.getElementById('resetImage');

//open model
openModalWindowButton.addEventListener('click', function() {
    modalWindow.style.display = 'flex'
});

//closing modal window when pressing a button in a form
closeModalWindowButton.addEventListener('click', function(event) {
    event.preventDefault();
    modalWindow.style.display = 'none'
});

//closing a modal window when clickng outside
modalWindow.addEventListener('click', function(event) {
    if (event.target === modalWindow) {
        modalWindow.style.display = 'none';
    }
});

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phoneRegex.test(phoneNumber);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//reusable function closing error span message
function closeErrorMessages(value) {
    setTimeout(() => {
        if(value.style.display === 'inline') {
            value.style.display = 'none';
        }
    }, 4000);
}

function showRequiredFields() {
    const phoneNumber = document.querySelector('.form__input--phone').value.trim();
    const email = document.querySelector('.form__input--email').value.trim();
    toggleErrorField.forEach(element => {
        if(phoneNumber.length > 0) {
            togglePhoneField[0].style.display = 'none';
        } 

        if(email.length > 0) {
            toggleEmailField[0].style.display = 'none';
        }
        element.style.display = 'inline';
    });
}

function hideRequiredFields() {
    toggleErrorField.forEach(element => {
        element.style.display = 'none';
    });
}


//sending the form if the condition is met
sendFormButton.addEventListener('click', function(event) {
    event.preventDefault();
    const inputDataArray = Array.from(inputData);
    const isAnyInputFilled = inputDataArray.every(input => input.value.trim() !== '');
    const phoneNumber = document.querySelector('.form__input--phone').value.trim();
    const email = document.querySelector('.form__input--email').value.trim();

    if(isAnyInputFilled) {
        inputsFormData();
    }

    
    if (!validatePhoneNumber(phoneNumber) && phoneNumber.length > 0) {
        phoneError.style.display = 'inline';
        closeErrorMessages(phoneError);
    }

    if (!validateEmail(email) && email.length > 0) {
        emailError.style.display = 'inline'
        closeErrorMessages(emailError);
    }

    if(!isAnyInputFilled) {
        showRequiredFields();
        sendFormButton.textContent = 'Заполните ВСЕ поля!';
        sendFormButton.style.backgroundColor = 'red';
        sendFormButton.disabled = true;
        setTimeout(() => {
            hideRequiredFields();
            sendFormButton.textContent = 'Стать партнером проекта.';
            sendFormButton.style.backgroundColor = '#E5266E';
            sendFormButton.disabled = false;
        }, 4000);
    }
});

//output data
function inputsFormData() {
    const formData = new FormData();

    inputData.forEach((input, index) => {
        formData.append(index, input.value);
    });


    for (const value of formData.entries()) {
        console.log(value);
    }
};

//the ability to add avatars
fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        logoImage.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

resetImage.addEventListener('click', function() {
    logoImage.src = './image/avatar.png';
});