export default async function refreshToken() {
    let key = 'jwt';
    let tokens = JSON.parse(localStorage.getItem(key));

    if ( !tokens || !tokens._links ) {
        throw 'Token problem';
        return;
    }

    let link = tokens._links['refresher'].href + '?token=' + tokens['refreshToken'];
    let newTokens = null;

    try {
        let response = await fetch(link, { method: 'POST'});
        if ( !response.ok ) throw `Bad response: ${response.status}. (refresh attempt)`;
        newTokens = await response.json();
        
    } catch(e) {
        throw 'Failed to refresh tokens';
        return;
    }

    if ( newTokens !== null ) {
        localStorage.setItem(key, JSON.stringify(newTokens));
    }
}