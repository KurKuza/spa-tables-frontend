import { createContext, useState } from "react"

export const UserContext = createContext({ nameColumn: '' })

export const UserProvider = ({ children }) => {
	const [nameColumn, setNameColumn] = useState('')
	const [searchValue, setSearchValue] = useState('')

	return (
		<UserContext.Provider value={{ nameColumn, setNameColumn, searchValue, setSearchValue }}>
			{children}
		</UserContext.Provider>
	)
}