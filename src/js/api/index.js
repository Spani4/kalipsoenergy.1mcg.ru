import axios from 'axios';
import links from './links';
import handleError from './error';
import authxios from './authxios';

import * as passwordRecovery from './passwordRecovery';
import * as authApi from './auth';
import * as docsApi from './fetchDocs';

export const auth = authApi;

export const recovery = passwordRecovery;

export const fetchDocs = docsApi;

export function fetchUser() {

    const url = links.user;

    return authxios.get(url)
        .then(response => response.data)
        .catch(error => {
            throw handleError(error, 'Failed to fetch user');
        })       
}

export function updateUser(data) {

    const url = links.user;

    return authxios.post(url, data)
        .then(response => response.data)
        .catch(error => {
            throw handleError(error, 'Failed to update user');
        })    
}

export function sendFeedback(data) {

    const url = links.feedback;

    return axios.post(url, data)
        .then(response => response.data)
        .catch(error => {
            throw handleError(error, 'Failed to send feedback');
        })    
}










