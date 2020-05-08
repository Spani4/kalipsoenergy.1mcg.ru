export default function(error, consoleMessage = 'Unexpected Error') {

    error.serviceMessage = consoleMessage;

    console.warn('Error handling...');
    console.error(error.serviceMessage);
    console.error(error);
    console.dir(error);

    if ( !error.response ) return error;

    switch ( error.response.status ) {

        case 409:
        case 422: {
            error.exception = error.response.data.errors[0].message;
        }
            break;
    }

    return error; 
}