import "../scss/main.scss";

import initGlobalScripts from "./global";
import { initMainSlider, initProjectsSlider } from "./components/sliders";
import Feedback from "../vue/feedback";


document.addEventListener('DOMContentLoaded', () => {

    initGlobalScripts();
    initMainSlider();
    initProjectsSlider();

    new Feedback();
});

