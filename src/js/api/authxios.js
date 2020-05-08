import axios from 'axios';
import handleError from './error';

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
        this.errors = [];
        this.errors.push(this.message);
    }
}


class Authxios {

    get(url, key='jwt') {
        const params = {
            method: 'get',
            url,
        };

        return this.sendRequest(params, key);
    }

    post(url, data, key='jwt') {

        const params = {
            method: 'post',
            url,
            data,
        };

        return this.sendRequest(params, key);
    }

    sendRequest(params, key='jwt') {

        console.warn('Start sending request');

        const jsonJwt = localStorage.getItem(key);

        if ( !jsonJwt ) throw handleError(new AuthError("Вы не авторизованы"));
    
        const token = JSON.parse(jsonJwt);
        
        const link = new URL(params.url);
        link.searchParams.set(key, token.accessToken);
        params.url = link.href;


        return axios(params)
            .then(response => {

                console.warn('sendRequest then');
                return response.data;

            }).catch(error => {
                
                console.warn('sendRequest catch')

                if ( error.response.status == 409 ) {
                    refreshToken(token, key).then(() => {
                        return this.sendRequest(params, key)
                            .then(response =>  response.data);
                    }).catch(error => {
                        if ( error.serviceMessage && error.serviceMessage == 'Failed to refresh token' ) {
                            localStorage.removeItem(key);
                            throw handleError(new AuthError("Вы не авторизованы"));
                        }
                    });
                } else {
                    throw handleError(error, 'Unexpected sendRequest error');
                }
            })    
    }

}

export function refreshToken(token, key) {
    
    console.warn('Refreshing token');
    
    const link = new URL(token._links.refresher.href);
    link.searchParams.set('token', token.refreshToken);

    return axios.post(link)
        .then(response => {
            console.warn('refreshToken then');
            localStorage.setItem(key, JSON.stringify(response.data));
            return;
        }).catch(error => {
            console.warn('refreshToken catch');
            console.dir(error)
            throw handleError(error, 'Failed to refresh token');
        })
}



export const authxios = new Authxios();