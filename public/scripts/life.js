const form = document.getElementById('form');
const email = document.getElementById('email');
const message = document.getElementById('message');
// const date = document.getElementById('date');
const photography = document.getElementById('photography');
const api = document.getElementById('api');
const services = document.getElementById('services');

const displayMsg = (message, color) => {
	let msg = document.getElementById('msg');
	msg.innerHTML = `<p style="color:${color};">${message}</p>`;
	setTimeout(function () {
		msg.innerHTML = '';
	}, 5000);
};

const sendMessage = async message => {
	let data = await fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	});
	if (!data.ok) {
		throw Error('Something went wrong, please try again');
	}
	let res = await data.json();
	return res;
};

form.addEventListener('submit', ev => {
	ev.preventDefault();
	let submit = document.getElementById('submit');
	submit.innerText = 'Sending...';
	let servicesRequired = [];
	const markedCheckbox = document.getElementsByName('pl');
	for (let checkbox of markedCheckbox) {
		if (checkbox.checked) {
			servicesRequired.push(checkbox.value);
		}
	}
	if (servicesRequired.length === 0) {
		alert('Atleast one service required');
		submit.innerText = 'Submit';
		return;
	}
	if (message.value === '' || email.value === '') {
		alert('Email and Message required');
		submit.innerText = 'Submit';
		return;
	}
	const emailData = {
		message: message.value,
		email: email.value,
		// date: date.value,
		servicesRequired
	};

	sendMessage(emailData)
		.then(res => {
			displayMsg(res.title, 'green');
			message.value = '';
			email.value = '';
			for (let checkbox of markedCheckbox) {
				if (checkbox.checked) {
					checkbox.checked = false;
				}
			}
			submit.innerText = 'Submit';
		})
		.catch(error => {
			displayMsg(error, 'red');
			submit.innerText = 'Submit';
		});
});
