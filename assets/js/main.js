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
            <new-note @create-note="createNote"></new-note>
            <div class="notes">
                <p v-if="!notes.length" class="no-notes">Notes you add appear here</p>
                <div v-if="notes.length" class="row">
                    <note v-for="note in notes" :key="note.id" :info="note" @delete-note="deleteNote"></note>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            notes: [
                {
                    title: "ieowjiof",
                    contents: "jwioejfowe",
                    id: 'n' + uuidv4()
                }
            ],
            currentNote: null
        }
    },
    methods: {
        createNote(info){
            const newNote = {title: info.title, contents: info.contents, id: info.id};
            this.notes.push(newNote);
        },
        deleteNote(info){
            this.notes = this.notes.filter(function(value){return value != info})
            
        }
    }
})

Vue.component('note', {
    props: ['info'],
    template: `
        <div class="col-lg-3 col-md-6 note">
            <div class="note-wrapper" @mouseover="hovered=true" @mouseout="hovered=false" data-toggle="modal" :data-target="targetId">
                <button v-bind:style="[(hovered) ? {'opacity': '1'} : {'opacity': '0'}]"><i class="fas fa-pen"></i></button>
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
                        </div>
                        <div class="modal-body">
                            <textarea v-model="info.contents" placeholder="Take a note..."></textarea>
                        </div>
                        <div class="footer">
                            <button @click="deleteNote" class="delete-button" data-dismiss="modal" aria-label="Close"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            <button class="close-button" data-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data () {
        return {
          ariaId: null,
          targetId: null,
          hovered: false
        }
    }, 
    mounted () {
        this.ariaId = this.info.id + 'Label'
        this.targetId = '#' + this.info.id
    },
    methods: {
        deleteNote(){
            this.$emit('delete-note', this.info)
        }
    }
})

Vue.component('new-note', {
    template:`
        <div class="new-note">
            <input v-model="note.title" @mousedown="editingTitle=true" @blur="editingTitle=false; newNote()" v-if="(editingNote || editingTitle)" placeholder="Title">
            <textarea v-model="note.contents" @mousedown="editingNote=true" @blur="editingNote=false; newNote()" v-bind:style="[(!editingNote && !editingTitle) ? {'font-size': '1rem !important', 'font-weight': '600 !important'} : {'font-size': '0.875rem !important', 'font-weight': '400 !important'}]" placeholder="Take a note..."></textarea>
            <div class="nn-footer">
                <button class="nn-close-button" @click="editingTitle=false; editingNote=false" v-if="(editingNote || editingTitle)">Close</button>
            </div>
        </div>
    `,
    data(){
        return{
            note: {
                title: "",
                contents: "",
                id: 'n' + uuidv4()
            },
            editingTitle: false,
            editingNote: false
        }
    },
    methods: {
        newNote(){
            if (!this.editingTitle && !this.editingNote && (this.note.title || this.note.contents)){
                this.$emit('create-note', this.note)
                this.note.title = ""
                this.note.contents = ""
                this.note.id = 'n' + uuidv4()
            }
        }
    }
})

//Vue Instance
var app = new Vue({
    el: '#app'
})


