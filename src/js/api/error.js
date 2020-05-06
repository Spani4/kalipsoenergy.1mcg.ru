export default function(error, consoleMessage = 'Unexpected Error') {

    console.error(consoleMessage);
    console.error(error);

    if (error.response.status == 409) {
        error.expected = true;
        error.message = error.response.data.errors[0].message;
    }


    return error; 
}