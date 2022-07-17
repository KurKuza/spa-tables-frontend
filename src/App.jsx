import React, { useContext, useEffect } from 'react'
import './App.scss'
import axios from './axios'

import Table from './components/Table/Table'
import Pagination from './components/Pagination'
import { UserContext } from './UserContext'

/*
	Сортировку не успел доделать
	Не использовал Readux так как с самого начала думал, что нельзя использовать
	Хотя с ним было бы проще..

	Думаю еще бы через 72ч доделал бы

	Если я вам не подойду, то можно ревьюкода в виде комментариев?
	я собираюсь все равно доделать
*/

function App() {
	const [rows, setRows] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [currentPage, setCurrentPage] = React.useState(1)
	const [postsPerPage] = React.useState(10)

	const { nameColumn } = useContext(UserContext)

	//Сортируем по названию колонки
	function SortArrayByNameColumn(x, y) {
		if (nameColumn === 'id') {
			if (Number(x.id) < Number(y.id)) return -1
			if (Number(x.id) > Number(y.id)) return 1
		}
		if (nameColumn === '') {
			if (Number(x.id) < Number(y.id)) return -1
			if (Number(x.id) > Number(y.id)) return 1
		}
		if (nameColumn === 'name') {
			return x.name.localeCompare(y.name)
		}
		if (nameColumn === 'quantity') {
			if (x.quantity < y.quantity) return -1
			if (x.quantity > y.quantity) return 1
		}
		if (nameColumn === 'distance') {
			if (Number(x.distance) < Number(y.distance)) return -1
			if (Number(x.distance) > Number(y.distance)) return 1
		}
	}
	rows.sort(SortArrayByNameColumn)

	//Тут остановился пытаясь сделать поиск

	// const finded = (rows) => {
	// 	// console.log('🚀 rows', rows)
	// 	// console.log(rows.includes('Vipe'))
	// 	rows.push(rows.find((row) => row?.name.includes('Vipe')))
	// 	console.log(
	// 		'🚀 rows.push',
	// 		rows.push(rows.find((row) => row?.name.includes('Vipe'))),
	// 	)
	// }
	// finded(rows)

	// Получаем данные для таблицы
	React.useEffect(() => {
		async function fetchTableRows() {
			try {
				//Загружается
				setLoading(true)
				//Запрашиваем таблицу
				const { data } = await axios.get(`/get`)

				setRows(data)
				//Загрузилась
				setLoading(false)
			} catch (err) {
				//Запрос не удался
				console.warn(err)
				alert('Request failed')
			}
		}
		fetchTableRows()
	}, [])

	// Получаем сколько кнопок пагинации будет
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentRows = rows.slice(indexOfFirstPost, indexOfLastPost)

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	return (
		<div className='wrapper'>
			<main className='page'>
				<Table rows={currentRows} loading={loading} />
				<div className='table__container'>
					<Pagination
						postsPerPage={postsPerPage}
						totalRows={rows.length}
						paginate={paginate}
						loading={loading}
					/>
				</div>
			</main>
		</div>
	)
}

export default App
