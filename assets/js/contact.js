const sendEmailBtn = document.querySelector(".send-email-btn");
const nameInput = document.querySelector(".contact-name-input");
const emailInput = document.querySelector(".contact-email-input");
const messageInput = document.querySelector(".contact-message-input");
messageInput.addEventListener("focus", () => {
	if (messageInput.value == "Leave a message for Dillon...") {
		messageInput.value = "";
	}
});
sendEmailBtn.addEventListener("click", () => {
	sendEmail();
});

/**
 * Send email
 */
function sendEmail() {
	let name = nameInput.value;
	let email = emailInput.value;
	let message = messageInput.value;

	if (name == "" || email == "") {
		dispalyAlert("Please fill in your name and email", "OK", () => {return;});
		return false;
	}

	Email.send({
		SecureToken : "38409570-4dc0-4846-9923-ab69e941e08e",
		To : `${email}`,
		From : "dillonmccaffrey.ci@outlook.com",
		Subject : "Message from API",
		Body : `Thank you, ${name} for looking at Dillon's website, hope you enjoyed playing the game and quiz. Your message was ${message}`
	}).then(
	  
	);

	Email.send({
		SecureToken : "38409570-4dc0-4846-9923-ab69e941e08e",
		To : 'dmccaffrey01@gmail.com',
		From : "dillonmccaffrey.ci@outlook.com",
		Subject : "Message from API",
		Body : `${name} sent you a message. There message is: ${message}`
	}).then(
	  message => dispalyAlert(`Email sent to ${email}! Check your junk or spam inbox. And your message was sent to Dillon, Thank you ${name}`, "OK", () => {return;})
	);
	
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
