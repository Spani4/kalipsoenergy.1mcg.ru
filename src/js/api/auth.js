import axios from 'axios';
import links from './links';
import handleError from './error';
import { authxios, refreshToken } from './authxios';


function handleResponse(response, key) {
    try {
        const jwt = response.data;
        localStorage.setItem(key, JSON.stringify(jwt));
    } catch {
        throw { exception: 'Произошла ошибка' };
    }
}

export function fetchSmsApi() {

    const url = links.authSms;

    return axios(url)
        .then(response => response.data)
        .catch(error => {
            throw handleError(error, 'Failed to get sms api');
        });
}


export function sendPhone(data, key = 'auth-jwt') {

    const url = links.codeSender;

    return axios.post(url, data)
        .then(response => {
            handleResponse(response, key)
            return;
        })
        .catch(error => {
            throw handleError(error, 'Failed to send phone');
        })
}


export function sendSmsCode(data, key = 'auth-jwt') {

    const url = links.codeVerifier;

    return authxios.post(url, data, key)
        .then(response => {
            handleResponse(response, 'jwt')
            localStorage.removeItem(key);
            return;
        }).catch(error => {
            throw handleError(error, 'Failed to send code');
        })
}


export const signUp = sendSmsCode;


export function signIn(data) {

    const url = links.passwordVerifier;

    return axios.post(url, data)
        .then(response => {
            handleResponse(response, 'jwt')
            return;
        }).catch(error => {
            throw handleError(error, 'Failed to sign in..');
        })
}