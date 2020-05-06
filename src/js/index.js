import "../scss/main.scss";

import initGlobalScripts from "./global";
import { initMainSlider, initProjectsSlider } from "./components/sliders";
import FeedbackSection from "../vue/feedback-section";


document.addEventListener('DOMContentLoaded', () => {

    initGlobalScripts();
    initMainSlider();
    initProjectsSlider();

    const el = document.querySelector('#feedback');
    new FeedbackSection(el);
});

