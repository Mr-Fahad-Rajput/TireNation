document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
  
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const username = registerForm.username.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;
  
      try {
        const res = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });
  
        if (res.status === 400 || !res) {
          window.alert("Already Used Details");
        } else {
          window.alert("Registered Successfully");
          window.location.href = "/login";
        }
      } catch (error) {
        console.log(error);
      }
    });
  });