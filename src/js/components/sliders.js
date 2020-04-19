import "swiper/css/swiper.min.css";
import Swiper from 'swiper';
import sliderConfig from '../config/sliders';

export function initMainSlider() {
    const section = document.querySelector('.js-main-slider');
    if ( section == null ) return;
    const swiperContainer = section.querySelector('.swiper-container');
    const swiper = new Swiper(swiperContainer, sliderConfig.main);
}

export function initProjectsSlider() {
    
    const section = document.querySelector('.js-projects-slider');
    if ( section == null ) return;
    const swiperContainer = section.querySelector('.swiper-container');
    const swiper = new Swiper(swiperContainer, sliderConfig.projects);
}

export default function() {}