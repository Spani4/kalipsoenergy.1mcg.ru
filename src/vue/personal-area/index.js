import Vue from 'vue';
import Layout from './Layout.vue';

export default class PersonalArea {

    constructor() {

        this._vm = this._initVue();
        this._openBtns = document.querySelectorAll('.js-personal-area-btn');

        this._initBtns();
    }

    _initVue() {
        const el = document.querySelector('#personal-area');

        return new Vue({
            el,
            render: h => h(Layout, {
                props: {
                    show: false,
                }
            }),
        })
    }

    _initBtns() {
        this._openBtns.forEach((btn) => {

            btn.addEventListener('click', () => {
                this._vm.show = true;
            })
        });
    }
}