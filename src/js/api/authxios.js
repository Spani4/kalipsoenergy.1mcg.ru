import axios from 'axios';

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
    }
}

function getUrl(config) {

    let key = config.key ? config.key : 'jwt';
    let token = JSON.parse(localStorage.getItem(key));
    let url = new URL(config.url);

    url.searchParams.set('jwt', token.accessToken);

    return url;
}


function refreshToken(key = 'jwt') {
    
    console.warn('Refreshing token');
    
    const token = JSON.parse(localStorage.getItem(key))
    const url = new URL(token._links.refresher.href);
    url.searchParams.set('token', token.refreshToken);
    
    return axios.post(url)
        .then(response => {
            localStorage.setItem(key, JSON.stringify(response.data));
            return;
        }).catch(error => {
            // if ( error.response.status == 409 ) localStorage.removeItem(key);
            localStorage.removeItem(key);
            throw AuthError('Failed to refresh token');
        })
}


const authxios = axios.create({});

authxios.refresh = refreshToken;

authxios.interceptors.request.use(config => {
    
    if (config.url.searchParams && config.url.searchParams.has('jwt')) return config;

    if ( !config.key ) config.key = 'jwt';

    try { config.url = getUrl(config) }
    catch { throw new AuthError("Token does not exist") }

    return config;
})


authxios.interceptors.response.use(response => {

    return response;
    
}, error => {

    if (!error.response ) throw error;
    
    if (error.response.status == 409) {
        
        let config = error.config;
        let key = config.key;

        return authxios.refresh(key).then(() => {

            config.url = getUrl(config);

            return authxios(config, { key })
                .then(response => {
                    return response;
                });
        }).catch(error => {
            throw error;
        });

    } else {
        throw error;
    }
});


export default authxios;