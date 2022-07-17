import React from 'react'

function RowBody({data}) {
	return (
		<tr>
			<td>{data.id}</td>
			<td>{data.date}</td>
			<td>{data.name}</td>
			<td>{data.quantity}</td>
			<td>{data.distance}</td>
		</tr>
	)
}

export default RowBody
