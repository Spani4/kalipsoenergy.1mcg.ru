import axios from 'axios';
import links from './links';
import handleError from './error';
import { authxios, refreshToken} from './authxios';
import * as passwordRecovery from './passwordRecovery';
import * as authApi from './auth';

export const auth = authApi;

export const recovery = passwordRecovery;

export function fetchUser() {

    return authxios.get(links.user)
        .then(response => {
            if ( response.status == 200 ) return response.data;
        }).catch(error => {
            throw handleError(error, 'Failed to fetch user');
        })    
}






