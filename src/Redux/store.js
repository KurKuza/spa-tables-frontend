import { configureStore } from '@reduxjs/toolkit'
import rowsSlice from './slices/rowsSlice'
import sortSlice from './slices/sortSlice'

export const store = configureStore({
	reducer: {
		counter: sortSlice,
		rows: rowsSlice,
	},
})