const form = document.getElementById('form');
const email = document.getElementById('email');
const message = document.getElementById('message');
// const date = document.getElementById('date');
const photography = document.getElementById('photography');
const api = document.getElementById('api');
const services = document.getElementById('services');

const sendMessage = async message => {
	try {
		let data = await fetch('https://tolufolorunso.herokuapp.com/', {
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
	} catch (error) {
		return error;
	}
};

form.addEventListener('submit', ev => {
	ev.preventDefault();
	let submit = document.getElementById('submit');
	let msg = document.getElementById('msg');
	submit.innerText = 'Sending...';
	let servicesRequired = [];
	const markedCheckbox = document.getElementsByName('pl');
	for (let checkbox of markedCheckbox) {
		if (checkbox.checked) {
			servicesRequired.push(checkbox.value);
		}
	}
	const emailData = {
		message: message.value,
		email: email.value,
		// date: date.value,
		servicesRequired
	};

	sendMessage(emailData)
		.then(res => {
			msg.innerHTML = `<p>${res.title}</p>`;
			submit.innerText = 'Submit';
		})
		.catch(error => {
			console.log(error);
			// msg.innerHTML = `<p style="color:red;">Something went wrong, please try again</p>`;
			// submit.innerText = 'Submit';
		});
});
