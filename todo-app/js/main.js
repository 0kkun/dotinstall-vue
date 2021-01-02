(function() {
    'use strict';

    var vm = new Vue({
    el: '#app',
    data: {
        newItem: '',
        todos: []
    },
    // データの監視
    watch: {
        // todosの中身の変更まで監視する必要があるので、deep watcherという仕組みを使う。
        todos: {
        handler: function() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
        }
    },
    // アプリが読み込まれた時のライフサイクル時に実行する
    mounted: function() {
        // ローカルストレージのJSONデータをパースしてtodosに代入する。うまくいかなかったら空配列[]を返す
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
        addItem: function() {
        var item = {
            title: this.newItem,
            isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
        },
        deleteItem: function(index) {
        if (confirm('are you sure?')) {
            this.todos.splice(index, 1);
        }
        },
        purge: function() {
        if (!confirm('delete finished?')) {
            return;
        }
        this.todos = this.remaining;
        }
    },
    computed: {
        remaining: function() {
        return this.todos.filter(function(todo) {
            return !todo.isDone;
        });
        }
    }
    });
})();