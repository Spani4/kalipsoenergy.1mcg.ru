import "../scss/main.scss";

import initGlobalScripts from "./global";
import { initMainSlider, initProjectsSlider } from "./components/sliders";



document.addEventListener('DOMContentLoaded', () => {

    initGlobalScripts();
    initMainSlider();
    initProjectsSlider();
});

