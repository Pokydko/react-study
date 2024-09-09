import { createSelector } from "@reduxjs/toolkit";

// Функція-селектор для використання в useSelector:
export const selectNameFilter = (state) => state.filters.name; // повертає значення фільтра з властивості name.
