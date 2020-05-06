import "../scss/feedback-page.scss";

import initGlobalScripts from "./global";
import FeedbackPage from "../vue/feedback-page";


document.addEventListener('DOMContentLoaded', () => {

    initGlobalScripts();
    
    const el = document.querySelector('#feedback-page-form');
    new FeedbackPage(el)
});

