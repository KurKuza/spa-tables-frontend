import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rows: [],
}

export const counterSlice = createSlice({
	name: 'rows',
	initialState,
	reducers: {
		setRows: (state, action) => {
			state.rows = action.payload
		}
	},
})

// Action creators are generated for each case reducer function
export const { setRows } = counterSlice.actions

export default counterSlice.reducer