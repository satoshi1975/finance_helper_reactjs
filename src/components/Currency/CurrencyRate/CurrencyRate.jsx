import React, { useEffect, useState } from 'react'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import { Input, Button } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import classess from './CurrencyRate.module.scss'
import {
	fetchCurrency,
	fetchExchangeRates,
} from '../../../redux/slices/currency'
export const CurrencyRate = () => {
	const dispatch = useDispatch()
	const exchangeRates = useSelector(state => state.exchangeRates.data)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const itemsPerPage = 9
	const filteredData = exchangeRates.filter(rate =>
		rate.currency.toLowerCase().includes(searchTerm.toLowerCase())
	)
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

	const paginate = pageNumber => setCurrentPage(pageNumber)

	// Вычисление общего количества страниц
	const pageCount = Math.ceil(filteredData.length / itemsPerPage)

	useEffect(() => {
		dispatch(fetchExchangeRates())
	}, [dispatch])

	return (
		<Box className={classess.mainRateField}>
			<Input
				onChange={e => setSearchTerm(e.target.value)}
				color='neutral'
				size='sm'
				value={searchTerm}
				variant='outlined'
				placeholder='currency search'
			/>
			<Box
				sx={{
					width: '100%',
					maxWidth: 1000,
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
					gap: 3,
				}}
				className={classess.rateCardsList}
			>
				{currentItems.map((rate, index) => (
					<Card variant='soft' key={index}>
						<CardContent>
							<Typography level='title-md'>{rate.currency}</Typography>
							<Typography>{rate.value}</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
			<div className={classess.pagination}>
				{Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
					<Button
						className={classess.paginationBtn}
						variant='solid'
						key={number}
						onClick={() => paginate(number)}
					>
						{number}
					</Button>
				))}
			</div>
		</Box>
	)
}
