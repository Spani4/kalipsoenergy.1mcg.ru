import axios from 'axios';
import links from './links';
import handleError from './error';


export function getSmsApi() {

    return axios(links.authSms)
        .then(res => res.data)
        .catch(error => {
            throw handleError(error, 'Getting sms api failed');
        });
}

export function sendPhone(data) {
    
    return axios.post(links.codeSender, data)
        .then(res => res.data)
        .catch(error => {
            throw handleError(error, 'Failed to send phone');
        })
}

export function sendSmsCode(data) {
    
    return axios.post(links.codeVerifier, data)
        .then(res => res.data)
        .catch(error => {
            throw handleError(error, 'Failed to send code');
        })
}

export function sendUserData() {
    console.log('sending user data...');
}

export function signIn(data) {
    console.log('sign in');
}

export const passwordRecovery = {
    sendPhone,

    sendSmsCode,
    
    sendNewPassword() {
        console.log('send new password')
    },
    
}