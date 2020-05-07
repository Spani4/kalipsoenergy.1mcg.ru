// const origin = 'https://kalipsoenergy.1mcg.ru';
const origin = document.location.origin;

export default {
	authSms: `${origin}/api/auth/sms`,
	codeSender: `${origin}/api/auth/sms/code-sender`,
	codeVerifier: `${origin}/api/auth/sms/code-verifier`,
	user: `${origin}/api/user`,
	
	// cart: `${document.location.origin}/api/cart`,
	// cartItems: `${document.location.origin}/api/cart/items`,
	// orders: `${document.location.origin}/api/orders/orders`,
	// favorites: `${document.location.origin}/api/catalog/favorites/products`,

}