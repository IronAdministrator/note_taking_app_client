// src/store/notesStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export type Note = {
  _id?: string
  title?: string
  text: string
  createdAt?: string
  updatedAt?: string
  updatedCount?: number // optional if your backend tracks how many times a note was updated
}

export const useNotesStore = defineStore('notes', () => {
  // STATE
  const notes = ref<Note[]>([])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  // ACTIONS
  async function fetchNotes() {
    try {
      const response = await axios.get(`${API_URL}/notes`)
      notes.value = response.data
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  async function addNote(title: string, text: string) {
    if (!text.trim()) return
    try {
      await axios.post(`${API_URL}/notes`, {
        title,
        text,
      })
      // re-fetch notes after adding
      await fetchNotes()
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  async function deleteNote(noteId: string) {
    try {
      await axios.delete(`${API_URL}/notes/${noteId}`)
      // re-fetch notes after deletion
      await fetchNotes()
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  async function editNote(noteId: string, updatedTitle: string, updatedText: string) {
    if (!updatedText.trim()) return
    try {
      await axios.put(`${API_URL}/notes/${noteId}`, {
        title: updatedTitle,
        text: updatedText,
      })
      // re-fetch notes after editing
      await fetchNotes()
    } catch (error) {
      console.error('Error editing note:', error)
    }
  }

  // GETTERS (optional)
  const totalNotes = computed(() => notes.value.length)

  return {
    notes,
    totalNotes,
    fetchNotes,
    addNote,
    deleteNote,
    editNote,
  }
})
