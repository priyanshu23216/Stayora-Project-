const resendButton = document.getElementById("resend-otp-button");
	const countdownMessage = document.getElementById("resend-countdown-message");
	const countdownText = document.getElementById("resend-countdown");
	let secondsLeft = 60;

	const countdownTimer = setInterval(() => {
		secondsLeft--;
		countdownText.textContent = secondsLeft;

		if (secondsLeft === 0) {
			clearInterval(countdownTimer);
			countdownMessage.hidden = true;
			resendButton.hidden = false;
		}
	}, 1000);