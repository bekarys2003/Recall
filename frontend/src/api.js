import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export function getNotes() {
  return api.get("notes/");
}

export function createNote(note) {
  return api.post("notes/", note);
}

export function deleteNote(id) {
  return api.delete(`notes/${id}/`);
}
