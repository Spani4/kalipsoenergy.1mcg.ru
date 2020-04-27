import Vue from 'vue';
import Layout from './Layout.vue';
import store from '../../store';

//directives
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})


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