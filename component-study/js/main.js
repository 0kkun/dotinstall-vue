(function() {
    'use strict';

    // 子コンポーネント
    var likeComponent = Vue.extend({
        props: {
            message: {
                type: String,
                default: 'Like'
            }
        },
        // コンポーネントの場合はfunctionが必要
        data: function() {
            return {
                count: 0
            }
        },
        template: '<button @click="countUp">{{ message }} {{ count }}</button>',
        methods: {
            countUp: function() {
                this.count++;
                // emitでカスタムメソッドを宣言。incrementというカスタムイベントを発火させる
                this.$emit('increment');
            }
        }
    });

    // 親コンポーネント
    var app = new Vue({
        el: '#app',
        components: {
            // (左)html側で呼び出す時に使用する名前 : (右)コンポーネントの名前
            'like-component': likeComponent
        },
        data: {
            total: 0
        },
        methods: {
            incrementTotal: function() {
                this.total++;
            }
        }
    });

})();