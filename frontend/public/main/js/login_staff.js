$("#login-form").submit(function(k) {
    k.preventDefault();
    const email = $("#email").val();
    const password = $("#pass").val();

    axios.post('/staff', {
        params: {
            email: email,
            password: password
        }
    })
        .then(response => {
            if (response.data.JWT) {
                localStorage.setItem('JWT', response.data.JWT);
                localStorage.setItem('payload', JSON.stringify(response.data.payload));
                window.location.href = '/index.html'
                // redirect to the home page or display a message
            } else {
                alert("Email or password is incorrect");
                localStorage.setItem('JWT', response.data.JWT);
                localStorage.setItem('payload', JSON.stringify(response.data.payload));
                window.location.href = '/index.html'
            }
        })
        .catch(error => {
            alert("Error in connecting to the server");
        })
})

