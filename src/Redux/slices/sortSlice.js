import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	nameColumn: '',
	search: '',
	strictСontent: false,
	toSmallerNumber: false
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
		setStrictСontent: (state, action) => {
			state.strictСontent = action.payload
		},
		setToSmallerNumber: (state, action) => {
			state.toSmallerNumber = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setNameColumn, setSearch, setStrictСontent, setToSmallerNumber } = counterSlice.actions

export default counterSlice.reducer