document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("noteInput");
    const addNoteBtn = document.getElementById("addNote");
    const noteList = document.getElementById("noteList");

    // Load saved notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => addNoteToList(note));

    // Add note on button click
    addNoteBtn.addEventListener("click", function () {
        if (noteInput.value.trim() !== "") {
            addNoteToList(noteInput.value.trim());
            saveNoteToLocalStorage(noteInput.value.trim());
            noteInput.value = ""; // Clear input
        }
    });

    // Add note on Enter key press
    noteInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addNoteBtn.click();
        }
    });

    function addNoteToList(noteText) {
        const li = document.createElement("li");
        li.innerHTML = `${noteText} <button class="delete-btn">X</button>`;
        noteList.appendChild(li);

        // Add delete function
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
            removeNoteFromLocalStorage(noteText);
        });
    }

    function saveNoteToLocalStorage(noteText) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function removeNoteFromLocalStorage(noteText) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
});
