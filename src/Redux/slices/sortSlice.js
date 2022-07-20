import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	nameColumn: '',
	search: '',
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setNameColumn: (state, action) => {
			state.nameColumn = action.payload
		},
		setSearch: (state, action) => {
			state.search = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setNameColumn, setSearch } = counterSlice.actions

export default counterSlice.reducer