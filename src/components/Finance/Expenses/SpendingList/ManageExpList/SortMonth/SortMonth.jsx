import React, { useState } from 'react'
import { TextField, MenuItem, Button, Box } from '@mui/material'
import classess from './SortMonth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchDeleteTransactions,
	fetchTransByMonth,
	setMonth,
	setYear,
} from '../../../../../../redux/slices/transactions'

function MonthYearSelector({ onSearch }) {
	const dispatch = useDispatch()
	const year = useSelector(state => state.yearmonthtrans.year)
	const month = useSelector(state => state.yearmonthtrans.month)
	const [year_m, setYearValue] = useState(new Date().getFullYear())
	const [month_m, setMonthValue] = useState(new Date().getMonth() + 1)
	const ids = useSelector(state => state.deleteTransactions.idsList)

	let isDelete = ids.length > 0

	const handleYearChange = event => {
		setYearValue(event.target.value)
		dispatch(setYear(event.target.value))
	}

	const handleMonthChange = event => {
		setMonthValue(event.target.value)
		dispatch(setMonth(event.target.value))
		// console.log(month_m)
	}

	const handleDelete = () => {
		dispatch(fetchDeleteTransactions({ ids: ids }))
		// console.log(year_m)
		// console.log(month_m)
		dispatch(fetchTransByMonth({ year, month }))
	}

	// Генерация списка годов
	const years = Array.from(
		new Array(20),
		(val, index) => new Date().getFullYear() - index
	)
	// Месяцы
	const months = Array.from(new Array(12), (val, index) => index + 1)

	return (
		<Box display='flex' gap={2} className={classess.yearmonthsort}>
			<TextField
				select
				label='Год'
				value={year_m}
				className={classess.chooseyear}
				onChange={handleYearChange}
				variant='outlined'
			>
				{years.map(yearOption => (
					<MenuItem key={yearOption} value={yearOption}>
						{yearOption}
					</MenuItem>
				))}
			</TextField>

			<TextField
				select
				label='Месяц'
				value={month_m}
				className={classess.choosemonth}
				onChange={handleMonthChange}
				variant='outlined'
			>
				{months.map(monthOption => (
					<MenuItem key={monthOption} value={monthOption}>
						{monthOption}
					</MenuItem>
				))}
			</TextField>
			{isDelete ? (
				<Button
					className={classess.sbmtbtn}
					variant='contained'
					color='error'
					onClick={handleDelete}
				>
					Delete
				</Button>
			) : (
				<div></div>
			)}
		</Box>
	)
}

export default MonthYearSelector
