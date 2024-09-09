import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});
// Редюсер слайсу
export default filtersSlice.reducer;

// Генератори екшенів
export const { changeFilter } = filtersSlice.actions;
