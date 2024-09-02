// Функція-селектор для використання в useSelector:
export const selectContacts = (state) => state.contacts.items; // повертає список контактів з властивості items

// Функція-селектор для використання в useSelector:
export const selectNameFilter = (state) => state.filters.name; // повертає значення фільтра з властивості name.
