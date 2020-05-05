import "../scss/for-clients.scss";

import initGlobalScripts from "./global";
import { initProjectsSlider } from "./components/sliders";


document.addEventListener('DOMContentLoaded', () => {

    initGlobalScripts();
    initProjectsSlider();
});

