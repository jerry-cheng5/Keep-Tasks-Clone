//Functions
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//Vue Components
Vue.component('notes', {
    template: `
        <div class="container">
            <h1>Notes</h1>
            <button @click="createNote" class="btn btn-primary">New Note</button>
            <div class="notes">
                <p v-if="!notes.length">No notes saved.</p>
                <div v-if="notes.length" class="row">
                    <note v-for="note in notes" :key="note.id" :info="note"></note>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            notes: [
                {
                    title: "",
                    contents: "Testing content",
                    id: 'n' + uuidv4()
                },
                {
                    title: "Second Note",
                    contents: "",
                    id: 'n' + uuidv4()
                },
                {
                    title: "",
                    contents: "",
                    id: 'n' + uuidv4()
                },
                {
                    title: "Fourth Note",
                    contents: "jwioe wjeoiwj eio fjoae fiwoe",
                    id: 'n' + uuidv4()
                },
                {
                    title: "Fifth Note",
                    contents: "jwioe wjeoiwj eio fjoae fiwoe",
                    id: 'n' + uuidv4()
                }
            ],
            currentNote: null
        }
    },
    methods: {
        createNote(){
            const newNote = {title: "", contents: "", id: 'n' + uuidv4()};
            this.notes.push(newNote);
        },
        deleteNote(note){
            this.notes = this.notes.filter(function(e) { return e !== note })
        }
    }
})


Vue.component('note', {
    props: ['info'],
    template: `
        <div class="col-lg-3 col-md-6 note">
            <div class="note-wrapper" data-toggle="modal" :data-target="targetId">
                <h3 v-if="!info.title && !info.contents">Empty note</h3>
                <h2 v-if="info.title">{{info.title}}</h2>
                <p v-if="info.contents" v-bind:style="[(!info.title) ? {'padding-top': '12px'} : {'padding-top': '0px'}]">{{info.contents}}</p>
            </div>
            <div :id="info.id" class="modal fade" tabindex="-1" role="dialog"
                :aria-labelledby="ariaId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <input v-model="info.title" placeholder="Title">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <textarea v-model="info.contents" placeholder="Take a note..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data () {
        return {
          ariaId: null,
          targetId: null
        }
    }, 
    mounted () {
        this.ariaId = this.info.id + 'Label'
        this.targetId = '#' + this.info.id
    }
})

//Vue Instance
var app = new Vue({
    el: '#app'
})


