import Vue from 'vue';
import Layout from './Layout.vue';
import store from '~/store';

export default class {

    constructor(el) {

        new Vue({
            name: 'Feedback',
            el,
            store,
            render: h => h(Layout),
        });
    }
}