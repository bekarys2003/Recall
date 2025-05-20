import axios from "axios";

const api = axios.create({
  baseURL: "recall-op1f.onrender.com/api/",
});

export function getNotes() {
  return api.get("notes/");
}

export function createNote(note) {
  console.log('Sending note:', note);
  return api.post("notes/", {
    ...note,
    pinned: false
  });
}

export function deleteNote(id) {
  return api.delete(`notes/${id}/`);
}

export function updateNote(id, data) {
  return api.patch(`notes/${id}/`, data);
}