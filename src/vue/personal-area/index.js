import Vue from 'vue';
import Layout from './Layout.vue';
import store from '~/store';
import noty from '~/js/components/noty';
import { VueNoty } from '~/js/components/noty';

//directives
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

Vue.use(VueNoty);


export default class PersonalArea {

    constructor() {

        const el = document.querySelector('#personal-area');

        this._vm = new Vue({
            name: 'Personal-Area',
            el,
            store,
            data: {
                show: false,
            },

            methods: {
                toggle() {
                    this.show = !this.show;
                    const body = document.querySelector('body');
                    if ( this.show ) body.classList.add('no-scroll');
                    else body.classList.remove('no-scroll');
                }
            },

            directives: {
                focus,
            },

            render: h => h(Layout),
        })

        this._initBtns();
    }

    _initBtns() {

        const btns = document.querySelectorAll('.js-personal-area-btn');

        btns.forEach((btn) => {

            btn.addEventListener('click', () => {
                this._vm.toggle();
            })
        });
    }
}