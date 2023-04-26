document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
  
      try {
        const res = await fetch("/login",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email,
            password,
            }),
            });
            if (res.status === 400 || !res) {
                window.alert("Invalid Credentials");
              } else {
                window.alert("Login Successful");
                window.location.reload();
                window.location.href = "/";
              }
            } catch (error) {
              console.log(error);
            }
        });
    });  