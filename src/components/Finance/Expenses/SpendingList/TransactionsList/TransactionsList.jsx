import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import classess from './TransactionsList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchGetTransactions,
	fetchTransByMonth,
	setList,
} from '../../../../../redux/slices/transactions'

import { set } from 'react-hook-form'
const columns = [
	{ field: 'title', headerName: 'Description', width: 130 },
	{ field: 'type', headerName: 'Type', width: 130 },
	{
		field: 'amount',
		headerName: 'Amount',
		type: 'number',
		width: 90,
	},
]

export default function DataTable() {
	const dispatch = useDispatch()
	const [transactionsList, setTransactionsList] = useState([])
	const year = useSelector(state => state.yearmonthtrans.year)
	const month = useSelector(state => state.yearmonthtrans.month)
	const data = useSelector(state => state.yearmonthtrans.data)
	useEffect(() => {
		dispatch(fetchTransByMonth({ year, month }))
	}, [dispatch, year, month])

	const onSelected = ids => {
		dispatch(setList(ids))
	}

	return (
		<div className={classess.transactionslist}>
			<DataGrid
				rows={data}
				columns={columns}
				getRowId={transactionsList => transactionsList._id}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				onRowSelectionModelChange={ids => onSelected(ids)}
				checkboxSelection
			/>
		</div>
	)
}
