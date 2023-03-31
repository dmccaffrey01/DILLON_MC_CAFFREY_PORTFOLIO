const form = document.querySelector(".contact-form")
const formID = "230885002127045"
const apiKey = "f7bd66db8e94d4f67eec27a3fa10f097"

const nameInput = document.querySelector(".contact-name-input");
const emailInput = document.querySelector(".contact-email-input");
const messageInput = document.querySelector(".contact-message-input");

messageInput.addEventListener("focus", () => {
	if (messageInput.value == "Leave a message for Dillon...") {
		messageInput.value = "";
	}
});

form.addEventListener("submit", (event) => {
    event.preventDefault
    sendEmail(event);
})

/**
 * Send email
 */
function sendEmail() {
    /** 
	const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }

	
	if (formData.name == "" || formData.email == "") {
		dispalyAlert("Please fill in your name and email", "OK", () => {return;});
		return false;
	}
	*/

	// Get form data
	const formData = new FormData(event.target);

	// Send form data to server-side script
	fetch('https://portfolio-form-api.herokuapp.com/submit', {
	  method: 'POST',
	  body: formData
	}).then(response => {
	  if (response.ok) {
		// Handle successful response from server
	  } else {
		// Handle error response from server
	  }
	});


		
	resetForm();
}

/**
 * Reset the form values
 */
function resetForm() {
	nameInput.value = "";
	emailInput.value = "";
	messageInput.value = "Leave a message for Dillon...";
}

/**
 * Display alert message
 */
function dispalyAlert(message, btn1, btn1Function, btn2, btn2Function) {
	// Define vars
	let alertSection = document.querySelector(".alert-section");
	let alertText = document.querySelector(".alert-text");
	let alertBtn1 = document.querySelector(".alert-btn1");
	let alertBtn2 = document.querySelector(".alert-btn2");
	
	if (arguments.length <= 4) {
		alertBtn2.classList.add("remove");
	} else {
		alertBtn2.innerText = btn2;

		alertBtn2.addEventListener("click", () => {
			btn2Function();
			alertSection.classList.remove("active");
		});
	}

	alertText.innerText = message;

	alertBtn1.innerText = btn1;

	alertSection.classList.add("active");

	alertBtn1.addEventListener("click", () => {
		btn1Function();
		alertSection.classList.remove("active");
	});
}
