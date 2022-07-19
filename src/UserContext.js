import { createContext, useState } from "react"

export const UserContext = createContext({ nameColumn: '' })

export const UserProvider = ({ children }) => {
	const [nameColumn, setNameColumn] = useState('')
	const [search, setSearch] = useState('')

	return (
		<UserContext.Provider value={{ nameColumn, setNameColumn, search, setSearch }}>
			{children}
		</UserContext.Provider>
	)
}