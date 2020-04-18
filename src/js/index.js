import "../scss/main.scss";

import initGlobalScripts from "./global";
import { initMainSlider } from "./components/sliders";



document.addEventListener('DOMContentLoaded', () => {

    initGlobalScripts();
    initMainSlider();
});

