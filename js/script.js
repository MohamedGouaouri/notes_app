
// Example
// [
//     {
//         "id": 1,
//         "note": "your note here"
//     }
// ];

// global variables

let notesToTextMap = [];
let id = 0;

$(document).ready(function (){


    // show tool tip on hover
    $(".add").hover(() => {
        $("#add-tooltip").show();

    }, () => {
        $("#add-tooltip").hide();
    })

    // ========================== BEGIN ADD NEW NOTE ====================================
    $("#add-note").on("click", () => {
        // clone a note
        let noteText = "";
        let newNote = $.parseHTML("<div class=\"note\">\n" +
            "            <div class=\"tools\">\n" +
            "                <div>\n" +
            "                    <button class=\"remove-btn\" ><i class=\"fas fa-trash\"></i></button>\n" +
            "                    <button class=\"edit-btn\" ><i class=\"fas fa-edit\"></i></button>\n" +
            "                    <button class=\"save-btn\" ><i class=\"fas fa-save\"></i></button>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"main\">\n"+ "<p>" + noteText + "</p>" +
            "            </div>\n"+
            "               <textarea class='hidden'>" +

            "               </textarea>" +
            "        </div>");



        // change note id
        $(newNote).attr("id", ++id);


        // push element element state to global state
        notesToTextMap.push({
            "id": id,
            "note": noteText
        });

        // append the newly created note to notes
        $(".notes").append(newNote);


        $(`#${id}`).children(".main").hide();

        // register a delete callback
        $(`#${id} .remove-btn`).click((e) => {
            let _thisNote = $(e.delegateTarget).parent().parent().parent();
            console.log(_thisNote);
            // remove note from notes
            notesToTextMap = notesToTextMap.filter((e) => e.id !== parseInt(_thisNote.attr("id")))
            _thisNote.remove();
        });

        // register an edit callback for this note
        $(`#${id} .edit-btn`).on("click", (e) => {
            let _thisNote = $(e.delegateTarget).parent().parent().parent()
            // get note id
            let noteId = _thisNote.attr("id");
            console.log(noteId);
            $(`#${noteId} .main`).hide()
            $(`#${noteId} .hidden`).show()
        });


        // save btn
        $(`#${id} .save-btn`).click((e) => {
            let _thisNote = $(e.delegateTarget).parent().parent().parent()
            // get note id
            let noteId = _thisNote.attr("id");
            $(`#${noteId} .main`).show();
            $(`#${noteId} .hidden`).hide();
            notesToTextMap[id-1].note = $(`#${noteId} .hidden`).val().trim();
            $(`#${noteId} .main p`).text(notesToTextMap[id-1].note);
        });
    })
    // =============================== END ADD NEW NOTE ====================================


})