//Vue Components
Vue.component('note', {
    props: ['info'],
    template: `
        <div class="col-lg-3 col-md-6 note">
            <div class="note-wrapper" data-toggle="modal" :data-target="targetId">
                <h2>{{info.title}}</h2>
                <p>{{info.contents}}</p>
            </div>
            <div :id="id" class="modal fade" tabindex="-1" role="dialog"
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
          id: null,
          ariaId: null,
          targetId: null,
          lableId: null
        }
    }, 
    mounted () {
        this.id = 'n' + this._uid
        this.ariaId = this.id + 'Label'
        this.targetId = '#' + this.id
    }
})

//Vue Instance
var app = new Vue({
    el: '#app',
    data: {
        notes: [
            {
                title: "",
                contents: "Testing content"
            },
            {
                title: "Second Note",
                contents: ""
            },
            {
                title: "",
                contents: ""
            },
            {
                title: "Fourth Note",
                contents: "jwioe wjeoiwj eio fjoae fiwoe"
            },
            {
                title: "Fifth Note",
                contents: "jwioe wjeoiwj eio fjoae fiwoe"
            }
        ],
        currentNote: null
    },
    methods: {
        createNote(){
            const newNote = {title: "", contents: ""};
            this.notes.push(newNote);
        }
    }
})
