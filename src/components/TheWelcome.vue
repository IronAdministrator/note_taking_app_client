<template>
  <div>
    <h1>Note Taking App</h1>
    <div>
      <input v-model="newTitle" placeholder="Title (optional)" />
      <textarea v-model="newText" placeholder="Note text"></textarea>
      <button @click="addNote">Add Note</button>
    </div>

    <div v-for="note in notesStore.notes" :key="note._id">
      <h3>{{ note.title }}</h3>
      <p>{{ note.text }}</p>
      <small>Created at: {{ formatDate(note.createdAt) }}</small>
      <small v-if="new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime()">
        Last updated: {{ formatDate(note.updatedAt) }}
        <span>(Updated {{ note.updatedCount }}x)</span>
      </small>
      <div>
        <button @click="deleteNote(note._id)">Delete</button>
        <button @click="openEditModal(note)">Edit</button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Note</h2>
        <input v-model="editingNote.title" placeholder="Title (optional)" />
        <textarea v-model="editingNote.text" placeholder="Note text"></textarea>
        <button @click="saveEdit">Save</button>
        <button @click="showEditModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { useNotesStore, type Note } from '@/stores/noteStore'

// 1. Access the store
const notesStore = useNotesStore()

// 2. Local refs (for creating and editing notes)
const newTitle = ref('')
const newText = ref('')
const showEditModal = ref(false)
const editingNote = ref({
  _id: '',
  title: '',
  text: '',
  updatedCount: 0,
})

// 3. Fetch notes when the component mounts
onMounted(() => {
  notesStore.fetchNotes()
})

// 4. "Add note" button handler
function addNote() {
  notesStore.addNote(newTitle.value, newText.value)
  newTitle.value = ''
  newText.value = ''
}

// 5. "Delete note" button handler
function deleteNote(noteId: string) {
  notesStore.deleteNote(noteId)
}

// 6. Open the edit modal
function openEditModal(note: Note) {
  editingNote.value = { ...note }
  showEditModal.value = true
}

// 7. Save changes from the edit modal
function saveEdit() {
  notesStore.editNote(editingNote.value._id, editingNote.value.title, editingNote.value.text)
  showEditModal.value = false
}

// 8. Utility function to format date
function formatDate(dateString: string) {
  return format(new Date(dateString), "PP 'at' HH:mm:ss")
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-content input,
.modal-content textarea {
  width: 100%;
  margin-bottom: 10px;
}
</style>
