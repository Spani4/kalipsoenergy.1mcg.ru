export default function(error, consoleMessage = 'Unexpected Error') {

    console.error(consoleMessage);
    console.error(error);
    // console.dir(error);

    if (error.response.status == 409) {
        error.exception = error.response.data.errors[0].message;
    }

    return error; 
}