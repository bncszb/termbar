const {ipcRenderer, remote: {Menu, getCurrentWindow}} = require('electron')
const Delta = require('quill-delta')
const {menu} = require('./menu')
const { exec, spawn } = require('child_process')

Menu.setApplicationMenu(Menu.buildFromTemplate( menu ))

const touchbarSizeInChars = 104
const caretSymbol = "⎸"

const {log} = console


const terminal=spawn("sh")
terminal.stdout.setEncoding('utf8');







Quill.register('modules/focus', Focus)

const quill = new Quill('#editor', {
    modules: {
        // toolbar: '#toolbar',
        //markdownShortcuts: {},
        keyboard: {},
        history: {},
        //clipboard: {},
        focus: {focusClass: 'focused-blot'},
    },
    theme: 'bubble',
    placeholder: 'Write some text and look at the TouchBar...',
    // 'image-tooltip': true,
    // 'link-tooltip': true,
})
quill.focus()
//window.onfocus =()=> quill.focus()

window.quill = quill
window.documentNotSaved = true

let last_line="012"
let current_line="412"
let outout_printed=true


quill.on('editor-change', (eventName, ...args) => {
    let range = {length: 1, index:0},
        insert = '',
        old, source

    if (eventName === 'text-change') {

        window.documentNotSaved = true
        getCurrentWindow().setDocumentEdited( true )

        // args[0] will be delta

        return
        // log(args)
        // // [
        // //     {ops: [{retain: range.index}, {insert}]}, 
        // //     old, source
        // // ] = args
        // range.index = args[0].ops[0].retain
        // insert = args[0].ops[1].insert


    } else if (eventName === 'selection-change') {
        // args[0] will be old range
        [range, old, source] = args
    }
    // Start is the index value of the character after the last \n
    // This should be the last command to run

    if( range && 'index' in range ){
        const {index, length} = range
        console.log(range)
        let start = index, size = length
        if( size === 0 ){
            while( 
                start && quill.getText(--start, 1) !== "\n"
            );;
            if( start > 0 ) start ++
            size = touchbarSizeInChars
        }
        let text = quill.getText(start, size)


        if(index-start == 0 ){
            last_line=current_line
            if (outout_printed===false) {

                outout_printed=true
                
                // quill.insertText(index, "You have pressed ENTER\n")
                console.log(current_line)
                terminal.stdin.write(current_line);
                
                let output= null
                terminal.stdout.on('data', (data) => {
                    // output=data.toString();
                    console.log(`Received chunk ${data}`)
                });
                
                quill.updateContents(new Delta().insert(index, "Output: \n"+output))
                
                // quill.updateContents(new Delta().insert("data"))

            }
        } else {
            current_line=quill.getText(start, index-start)
            if (current_line.length>2)[
                outout_printed=false
            ]
        }
        
        // console.log("Current line", current_line)
        // console.log("Last line", last_line)

        if( length === 0 ){

            const caret = index - start
            text = text.substr(0, caret) + insert + caretSymbol + text.substr(caret)

        }

        ipcRenderer.send('update-touchbar', {text})

        quill.container.classList.add('quill-focus')
    } else {
        quill.container.classList.remove('quill-focus')
    }

})