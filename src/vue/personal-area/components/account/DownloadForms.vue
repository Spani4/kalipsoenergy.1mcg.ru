<template lang="pug">
    .account__content-inner.download-docs
        .page-title формы документов на технологическое присоединение
        .download-docs
            .download-docs__tabs
                .download-docs__tabs-item(
                    :class="{ active: activeTabIndex == 0 }"
                    @click="switchDocs(0)"
                ) физическим лицам
                .download-docs__tabs-item(
                    :class="{ active: activeTabIndex == 1 }"    
                    @click="switchDocs(1)"
                ) юридическим лицам

            .download-docs__docs
                transition-group(name="fade" mode="out-in")
                    .download-docs__item(
                        v-for="doc in docsToDisplay"
                        :key="doc.id"
                    )
                        .download-docs__item-name {{ doc.fileName }}
                        a.download-docs__item-link(:href="doc._links.source.href") Скачать

        .personal-area__pager.download-docs__pager
            span.personal-area__pager-btn-prev.slider-btn.prev(
                @click="offset > 0 ? offset-- : ''"
                :disabled="offset == 0"
            )
            span.personal-area__pager-page.pager {{ offset + 1 }}/{{ maxPage }}
            span.personal-area__pager-btn-prev.slider-btn.next(
                @click="offset + 1 < maxPage ? offset++ : ''"
                :disabled="offset + 1 == maxPage"
            )

</template>


<script>
import { mapState } from 'vuex';
import * as API from '~/js/api';

export default {
    data() {
        return {
            types: ['individual', 'business'],
            activeTabIndex: 0,

            limit: 9,
            offset: 0,

            docs: {
                individual: [],
                business: [],
            },
        }
    },

    methods: {
        init() {
            this.activeTabIndex = this.user.category == 'Физическое лицо' ? 0 : 1;
            this.fetchDocs();
        },

        switchDocs(index) {
            this.activeTabIndex = index;
            this.offset = 0;
            if ( !this.currentDocs.length ) this.fetchDocs();
        },

        fetchDocs() {

            const type = this.currentType;

            API.fetchDocs[type]()
                .then(data => {
                    this.docs[type] = data._embedded.items;
                })
                .catch(error => {
                    this.$noty('error', 'Не удалось загрузить документы')
                })
        }
    },

    computed: {
        ...mapState(['user']),

        currentType() {
            return this.types[this.activeTabIndex];
        },

        currentDocs() {            
            return this.docs[this.currentType]
        },

        maxPage() {
            const total = this.currentDocs.length;
            return Math.ceil(total / this.limit) || 1;
        },

        docsToDisplay() {

            const docs = [];
            const firstDoc = this.limit * this.offset;

            for ( let i = 0; i < this.limit; i++ ) {

                if ( !this.currentDocs[firstDoc + i + 1] ) return docs;

                docs.push(this.currentDocs[firstDoc + i]);
            }

            return docs;
        }
    },

    created() {
        this.init();
    }
}
</script>

<style lang="scss" scoped>
.fade-enter {
    opacity: 0;
    position: absolute;
    transform: translateX(50px);
}
.fade-enter-active {
    transition: all .3s;
}
.fade-enter-to {
    position: static;
    opacity: 1;
    transform: none;
}

.fade-leave-to  {
    display: none;
}
</style>