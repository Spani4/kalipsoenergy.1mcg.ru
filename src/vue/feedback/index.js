import Vue from 'vue';
import Layout from './Layout.vue';

const el = document.querySelector('#feedback');

export default class {

    constructor() {

        new Vue({
            name: 'Feedback',
            el,
            render: h => h(Layout),
        });
    }
}