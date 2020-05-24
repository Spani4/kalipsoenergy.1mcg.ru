// const origin = 'https://kalipsoenergy.1mcg.ru';
const origin = document.location.origin;

export default {
	authSms: `${origin}/api/auth/sms`,
	codeSender: `${origin}/api/auth/sms/code-sender`,
	codeVerifier: `${origin}/api/auth/sms/code-verifier`,

	authPassword: `${origin}/api/auth/password`,
	passwordVerifier: `${origin}/api/auth/password/password-verifier`,
	forgotPasswordCodeSender: `${origin}/api/auth/password/forgot-password/code-sender`,
	forgotPasswordCodeVerifier: `${origin}/api/auth/password/forgot-password/code-verifier`,
	forgotPasswordResetPassword: `${origin}/api/auth/password/forgot-password/reset-password`,

	user: `${origin}/api/user`,
	feedback: `${origin}/api/feedback/questions`,

	docs: {
		individual: `${origin}/api/files/folders/d99553598fd246cd8e33a83e413bb9c1/files`,
		business: `${origin}/api/files/folders/fc1dd5cf6dde020c4adb768c147504bb/files`,
	}
	
	// cart: `${document.location.origin}/api/cart`,
	// cartItems: `${document.location.origin}/api/cart/items`,
	// orders: `${document.location.origin}/api/orders/orders`,
	// favorites: `${document.location.origin}/api/catalog/favorites/products`,

}