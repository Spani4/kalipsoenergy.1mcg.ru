import axios from 'axios';
import links from './links';
import handleError from './error';
import authxios from './authxios';


export function individual() {
    
    const url = links.docs.individual;

    return fetchDocs(url);
}

export function business() {
    
    const url = links.docs.business;

    return fetchDocs(url);
}


function fetchDocs(url) {

    return axios(url)
        .then(response => response.data)
        .catch(error => {
            throw handleError(error, 'Failed to fetch docs');
        });
}