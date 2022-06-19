function sendEmail () {
    let name = document.querySelector('.inputname').value
    let email = document.querySelector('.inputemail').value
    let phone = document.querySelector('.inputphone').value
    let subject = document.querySelector('.inputsubject').value
    let message = document.querySelector('.inputmessage').value

    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(message);
    
    let emailReceiver = email
    let a = document.createElement('a')

    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hallo nama saya ${name} ${message} silahkan hubungi ${phone} Email: ${email}`
    a.click()

    let dataObject = {
        namaLengkap: name,
        email,
        phone,
        subject,
        message
    }

    console.log(dataObject);
} 


const sub = document.querySelector('.submit-form');
sub.addEventListener('click', function (e) {
    e.preventDefault();
    let send = sendEmail()
    return send;
})