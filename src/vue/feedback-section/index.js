import Vue from 'vue';
import Layout from './Layout.vue';


export default class {

    constructor(el) {

        new Vue({
            name: 'Feedback',
            el,
            render: h => h(Layout),
        });
    }
}