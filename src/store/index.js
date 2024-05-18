import {createStore} from "vuex";
import axios from "axios";

export default createStore({
    state: {
        notes: [],
    },
    mutations: {
        setNotes(state, notes) {
            state.notes = notes;
        },
        addNoteMutation(state, note) {
            state.notes.push(note);
        },
        deleteNoteMutation(state, index) {
            state.notes.splice(index, 1);
        },
        markNoteAsCompletedMutation(state, {index, updatedNote}) {
            state.notes[index] = updatedNote;
        },
    },
    actions: {
        async getNotesHome({commit}, payload) {
            try {
                const res = await axios.get("http://192.168.1.108:3000/notes");
                commit("setNotes", res.data);
                payload = res.data

            } catch (e) {
                console.error(e);
            }
        },
        async getNotes({commit}) {
            try {
                const res = await axios.get("http://192.168.1.108:3000/notes");
                commit("setNotes", res.data);
            } catch (e) {
                console.error(e);
            }
        },
        async addNote({ commit }, payload) {
            try {
                const res = await axios.post("http://192.168.1.108:3000/notes", payload);
                commit("addNoteMutation", res.data);
                return res.data;
            } catch (e) {
                console.error(e);
            }
        },
        async deleteNote({commit, dispatch}, note) {
            try {
                await axios.delete(`http://192.168.1.108:3000/notes/${note.id}`);
                commit("deleteNoteMutation", note);
                dispatch("getNotes")
            } catch (e) {
                console.error(e);
            }
        },
        async doneNote({commit, dispatch}, note) {
            try {
                const res = await axios.put(`http://192.168.1.108:3000/notes/${note.id}`, {
                    ...note,
                    completed: true,
                    timeCompleted: new Date().toTimeString(),
                });
                commit("markNoteAsCompletedMutation", {note, updatedNote: res.data});
                dispatch("getNotes")
            } catch (e) {
                console.error(e);
            }
        },
    },
});
