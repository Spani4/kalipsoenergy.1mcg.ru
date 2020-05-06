import Vue from 'vue';
import Layout from './Layout.vue';


export default class {

    constructor(el) {

        new Vue({
            name: 'Feedback-Page',
            el,
            render: h => h(Layout),
        });
    }
}