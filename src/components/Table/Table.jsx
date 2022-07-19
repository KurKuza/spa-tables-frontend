import React from 'react'
import Sort from '../Sort'
import RowBody from './RowBody'

function Table({ rows, loading }) {
	const [keyNames, setKeyNames] = React.useState([])

	React.useEffect(() => {
		async function keys() {
			//Проверяю есть ли ключи у объекта
			//и если есть, вытягиваю ,чтобы назвать колонки
			if (rows[0] !== undefined || null) {
				const keys = await Object.keys(rows[0])
				setKeyNames(keys)
			}
		}
		keys()
	}, [rows])


	return (
		<section className='table'>
			<div className='table__container'>
				{!loading ? (
					'Loading..'
				) : (
					<div style={{ position: 'relative' }}>
						<Sort keyNames={keyNames} />
						<table className='table__content method-2'>
							<thead>
								<tr>
									{keyNames?.map((name, i) => (
										<th key={i} style={{ textTransform: 'capitalize' }}>
											{name}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{rows?.map((data, i) => (
									<RowBody data={data} key={i} />
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</section>
	)
}

export default Table
