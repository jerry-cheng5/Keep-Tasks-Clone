var app = new Vue({
    el: '#app',
    data: {
        notes: [
            {
                id: null,
                title: "First Note",
                contents: "Testing content"
            },
            {
                id: null,
                title: "Second Note",
                contents: "IWOEJFOIEWJOIFwjeio fjwie"
            },
            {
                id: null,
                title: "Third Note",
                contents: "jwioe wjeoiwj eio fjoae fiwoe"
            },
            {
                id: null,
                title: "Fourth Note",
                contents: "jwioe wjeoiwj eio fjoae fiwoe"
            },
            {
                id: null,
                title: "Fifth Note",
                contents: "jwioe wjeoiwj eio fjoae fiwoe"
            }
        ],
        currentNote: null
    },
    created () {
        this.id = this._uid;
        console.log(this._uid);
    },
    methods: {
        createNote(){
            const newNote = {title: "", contents: ""};
            this.notes.push(newNote);
        }
    }
})