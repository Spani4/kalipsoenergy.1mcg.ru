import LazyLoad from "vanilla-lazyload";

import initHeader from '../modules/header';
import initMap from '../components/maps';


export default function() {

    initHeader();
    initMap();
    
    new LazyLoad({
        elements_selector: '[data-bg], [data-src]',
    });
}