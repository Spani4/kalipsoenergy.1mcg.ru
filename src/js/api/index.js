import axios from 'axios';

import links from './links';

export function getSmsApi() {

    return axios(links.authSms)
        .then(res => {
            if ( res.status == 200 ) return res.data;
        })
        .catch(error => { throw error });
}

export function signIn(data) {
    console.log('sign in');
}

export function sendPhone() {
    console.log('sending phone...');
}

export function sendSmsCode() {
    console.log('sending sms code...');
}

export function sendUserData() {
    console.log('sending user data...');
}


export const passwordRecovery = {
    sendPhone,

    sendSmsCode,
    
    sendNewPassword() {
        console.log('send new password')
    },
    
}