document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
  
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = contactForm.name.value;
      const email = contactForm.email.value;
      const message = contactForm.message.value;
  
      try {
        const res = await fetch("/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email,message }),
        });
        console.log(res.status);
  if (res.status === 400 || !res) {
    window.alert("Message Not Sent. Try Again Later");
  } else {
    window.alert("Message Sent");
    contactForm.name.value = "";
    contactForm.email.value = "";
    contactForm.message.value = "";
  }
} catch (error) {
  console.log(error);
}
});
});