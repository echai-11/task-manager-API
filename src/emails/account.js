const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
	sgMail.send({
		to: email,
		from: 'lizzie.chai@gmail.com',
		subject: 'Welcome to the Task Manager App',
		text:`Welcome to the app ${name}. Let me know how you get along with the app!`
	})
}
const sendCancellationEmail = (email, name) =>{
	sgMail.send({
		to: email,
		from: 'lizzie.chai@gmail.com',
		subject: "We're sorry to see you go",
		text:`We're sorry to see you go ${name}. Please let us know how we can improve our work!`
	})
}

module.exports = {
	sendWelcomeEmail,
	sendCancellationEmail
}