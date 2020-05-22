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
	
	// cart: `${document.location.origin}/api/cart`,
	// cartItems: `${document.location.origin}/api/cart/items`,
	// orders: `${document.location.origin}/api/orders/orders`,
	// favorites: `${document.location.origin}/api/catalog/favorites/products`,

}