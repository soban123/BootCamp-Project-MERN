

const EmailJsServive = {

    sendEmailJsServive: (templateId, templateParams, user) => {
        window.emailjs.send(
            'default_service', // default email provider in your EmailJS account
            templateId,
            templateParams,
            user
        )
            .then(res => {
                console.log(res);
            })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => {
                console.error('Failed to send feedback. Error: ', err)
            })
    }

}

export default EmailJsServive 