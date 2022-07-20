import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rows: [],
	loading: false,
}

export const counterSlice = createSlice({
	name: 'rows',
	initialState,
	reducers: {
		setRows: (state, action) => {
			state.rows = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setRows,setLoading } = counterSlice.actions

export default counterSlice.reducer