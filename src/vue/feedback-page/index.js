import Vue from 'vue';
import Layout from './Layout.vue';
import store from '~/store';


export default class {

    constructor(el) {

        const service = el.dataset.service;

        new Vue({
            name: 'Feedback-Page',
            el,
            store,
            render: h => h(Layout, {
                props: { service }
            }),
        });
    }
}