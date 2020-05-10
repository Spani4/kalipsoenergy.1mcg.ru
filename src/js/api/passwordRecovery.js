import axios from 'axios';
import links from './links';
import handleError from './error';
import authxios from './authxios';


function handleResponse(response, key) {
    try {
        const jwt = response.data;
        localStorage.setItem(key, JSON.stringify(jwt));
    } catch {
        throw { exception: 'Произошла ошибка' };
    }
}


export function sendPhone(data, key = 'recovery-jwt') {

    const url = links.forgotPasswordCodeSender;

    return axios.post(url, data)
        .then(response => {
            handleResponse(response, key);
            return;
        })
        .catch(error => {
            throw handleError(error, 'Failed to send phone for password recovery');
        })
}


export function sendSmsCode(data, key = 'recovery-jwt') {

    const url = links.forgotPasswordCodeVerifier;

    return authxios.post(url, data, { key })
        .then(response => {
            handleResponse(response, key);
            return;
        }).catch(error => {
            throw handleError(error, 'Failed to send code for password recovery');
        })
}

export function sendNewPassword(data, key = 'recovery-jwt') {

    const url = links.forgotPasswordResetPassword;

    return authxios.post(url, data, { key })
        .then(response => {
            handleResponse(response, 'jwt');
            localStorage.removeItem(key);
            return;
        }).catch(error => {
            throw handleError(error, 'Failed to send new passwords for password recovery');
        })
}



