export default function(error, consoleMessage = 'Unexpected Error') {

    error.serviceMessage = consoleMessage;

    console.warn('Error handling...');
    console.error(error.serviceMessage);
    console.error(error);
    console.dir(error);

    try {
        error.exception = error.response.data.errors[0].message;
    } catch {
        return error;
    }

    return error; 
}