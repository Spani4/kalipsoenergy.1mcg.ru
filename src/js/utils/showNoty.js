import Noty from 'noty';
import 'noty/src/noty.scss';

export default function showNoty(type, text, timeout = 3000) {
    
    return new Noty({
            theme: 'custom',
            text,
            type,
            timeout,
            closeWith: ['click', 'button'],
            progressBar: false
            
        }).show();
}
