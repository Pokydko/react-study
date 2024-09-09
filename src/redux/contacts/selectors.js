import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

// Функція-селектор для використання в useSelector:
export const selectContacts = (state) => state.contacts.items; // повертає список контактів з властивості items

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

// мемоізований селектор selectFilteredContacts за допомогою функції createSelector.
// Селектор повинен залежати від поточних масиву контактів і значення фільтра, та повертати відфільтрований масив контактів.
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    if (!contacts || contacts.length === 0) return [];
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        number.includes(nameFilter)
    );
  }
);
