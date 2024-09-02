import { createSlice, nanoid } from "@reduxjs/toolkit";
import defaultBase from "../data/contacts.json";

const contactsSlice = createSlice({
  name: "contacts", // Ім'я слайсу

  // Початковий стан редюсера слайсу
  initialState: {
    items: defaultBase,
  },

  // Об'єкт редюсерів
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            ...contact,
            id: nanoid(),
          },
        };
      },
    },

    deleteContact(state, action) {
      const index = state.items.findIndex(
        (contact) => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

// Редюсер слайсу
export default contactsSlice.reducer;

// Генератори екшенів
export const { addContact, deleteContact } = contactsSlice.actions;
