import React from 'react'
import './App.scss'
import axios from './axios'

import Table from './components/Table/Table'
import Pagination from './components/Pagination'

import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setRows } from './Redux/slices/rowsSlice'

/*
	Сортировку не успел доделать
	Не использовал Readux так как с самого начала думал, что нельзя использовать
	Хотя с ним было бы проще..

	Думаю еще бы через 72ч доделал бы

	Если я вам не подойду, то можно ревьюкода в виде комментариев?
	я собираюсь все равно доделать
*/
function App() {
	const dispatch = useDispatch()
	const { rows, loading } = useSelector((state) => state.rows)
	const { nameColumn, search, strictСontent, toSmallerNumber } = useSelector(
		(state) => state.sort,
	)

	const [sortRowsArr, setSortRowsArr] = React.useState([])
	const [currentPage, setCurrentPage] = React.useState(1)
	const [postsPerPage] = React.useState(10)

	// Получаем данные для таблицы
	React.useEffect(() => {
		async function fetchTableRows() {
			try {
				//Загружается
				dispatch(setLoading(false))
				//Запрашиваем таблицу
				const { data } = await axios.get(`/get`)

				dispatch(setRows(data))
				//Загрузилась
				dispatch(setLoading(true))
			} catch (err) {
				//Запрос не удался
				console.warn(err)
				alert('Request failed')
			}
		}
		fetchTableRows()
	}, [])

	//Сортируем по названию колонки
	React.useEffect(() => {
		if (toSmallerNumber) {
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
			setSortRowsArr(sortRowsArr.slice().sort(SortArrayByNameColumn))
		} else {
			function SortArrayByNameColumn(x, y) {
				if (nameColumn === 'id') {
					if (Number(x.id) < Number(y.id)) return 1
					if (Number(x.id) > Number(y.id)) return -1
				}
				if (nameColumn === '') {
					if (Number(x.id) < Number(y.id)) return 1
					if (Number(x.id) > Number(y.id)) return -1
				}
				if (nameColumn === 'name') {
					return y.name.localeCompare(x.name)
				}
				if (nameColumn === 'quantity') {
					if (x.quantity < y.quantity) return 1
					if (x.quantity > y.quantity) return -1
				}
				if (nameColumn === 'distance') {
					if (Number(x.distance) < Number(y.distance)) return 1
					if (Number(x.distance) > Number(y.distance)) return -1
				}
			}
			setSortRowsArr(sortRowsArr.slice().sort(SortArrayByNameColumn))
		}
	}, [loading, nameColumn, toSmallerNumber])

	//Поиск слов
	React.useEffect(() => {
		if (!strictСontent) {
			if (search) {
				const wordSearch = search.toLowerCase()

				const sortSearchArr = []

				for (const name in rows) {
					if (Object.hasOwnProperty.call(rows, name)) {
						const i = rows[name]
						if (i.name.toLowerCase().includes(wordSearch)) {
							sortSearchArr.push(i)
						}
					}
				}
				setSortRowsArr(sortSearchArr)
			} else {
				setSortRowsArr(rows)
			}
		} else {
			if (search) {
				const wordSearch = search.toLowerCase()

				const sortSearchArr = []

				for (const name in rows) {
					if (Object.hasOwnProperty.call(rows, name)) {
						const i = rows[name]
						if (i.name.toLowerCase() === wordSearch) {
							sortSearchArr.push(i)
						}
					}
				}
				setSortRowsArr(sortSearchArr)
			} else {
				setSortRowsArr(rows)
			}
		}
		setCurrentPage(1)
	}, [loading, search, strictСontent])

	// Получаем сколько кнопок пагинации будет
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentRows = sortRowsArr.slice(indexOfFirstPost, indexOfLastPost)

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	return (
		<div className='wrapper'>
			<main className='page'>
				<Table rows={currentRows} loading={loading} />
				<div className='table__container'>
					<Pagination
						postsPerPage={postsPerPage}
						totalRows={sortRowsArr.length}
						paginate={paginate}
						loading={loading}
					/>
				</div>
			</main>
		</div>
	)
}

export default App
