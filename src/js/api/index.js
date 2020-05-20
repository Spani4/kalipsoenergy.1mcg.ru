import axios from 'axios';
import links from './links';
import handleError from './error';
import authxios from './authxios';
import * as passwordRecovery from './passwordRecovery';
import * as authApi from './auth';

export const auth = authApi;

export const recovery = passwordRecovery;

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








