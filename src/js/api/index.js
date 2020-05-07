import axios from 'axios';
import links from './links';
import handleError from './error';

import { authxios, refreshToken} from './authxios';


export function fetchSmsApi() {

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

    const authJwt = JSON.parse(localStorage.getItem('auth-jwt'));
    const accessToken = authJwt.accessToken;
    const url = new URL(links.codeVerifier);
    url.searchParams.append('jwt', accessToken);
    
    return axios.post(url, data)
        .then(res => {
            if ( res.status == 200 ) localStorage.removeItem('auth-jwt');
            return res.data
        }).catch(error => {
            throw handleError(error, 'Failed to send code');
        })
}

export function fetchUser() {

    return authxios.get(links.user)
        .then(response => {
            console.warn('fetchUser 1');
            console.log(response);
            return response.data;
        }).catch(error => {
            throw handleError(error, 'Failed to fetch user');
        })    
}






export function signIn(data) {
    console.log('sign in');
}

export const passwordRecovery = {
    sendPhone,

    // sendSmsCode,
    
    sendNewPassword() {
        console.log('send new password')
    },
    
}