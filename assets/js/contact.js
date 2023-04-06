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
    event.preventDefault();
    sendEmail();
})

(function(){
	emailjs.init("zPKR6_gHufVNrHLZT");
})();

/**
 * Send email
 */
function sendEmail() {
    
	const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }
	/** 
	if (formData.name == "" || formData.email == "") {
		dispalyAlert("Please fill in your name and email", "OK", () => {return;});
		return false;
	}
	*/

	var templateParams = {
		from_name: formData.name,
		to_name: "Dillon",
		from_email: formData.email,
		message: formData.message,
		reply_to: formData.email
	};

	emailjs.send("service_q2d91ik", "template_vlvkmvm", templateParams, "zPKR6_gHufVNrHLZT")
		.then(function(response) {
			console.log('SUCCESS!', response.status, response.text);
			dispalyAlert("Thank you for sending Dillon a message. He will be in contact with you soon.", "OK", () => {return;})
			resetForm();
		}, function(error) {
			console.log('FAILED...', error);
			dispalyAlert("Sorry there was an error. Please try again or contact Dillon directly at 'dmccaffrey01@gmail.com'", "OK", () => {return;})
		});
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
function dispalyAlert(message, btn1, btn1Function) {
	// Define vars
	let alertSection = document.querySelector(".alert-section");
	let alertText = document.querySelector(".alert-text");
	let alertBtn = document.querySelector(".alert-btn");

	alertText.innerText = message;

	alertBtn.innerText = btn1;

	alertSection.classList.add("active");

	alertBtn.addEventListener("click", () => {
		btn1Function();
		alertSection.classList.remove("active");
	});
}
