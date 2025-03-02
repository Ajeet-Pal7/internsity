async function Login() {

    const formData = {
        email: document.getElementById('email').value,
        passwd: document.getElementById('passwd').value,
    }
    try {
        const response = await fetch('https://internsity-production.up.railway.app/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        if(!response.ok){
            alert("error occured")
            return
        }
        data =await response.json();
        if (data) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "/pages/profile";
        }

    } catch (err) {
        console.log("Err : ", err);
        alert("can't login");
    }
}
