import { Box } from '@mui/material'
import React from 'react'
import classess from './Statistic.module.scss'
import { useSelector } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const ExpStatistic = () => {
	const expenses = useSelector(state => state.yearmonthtrans.data)

	const expensesByType = expenses.reduce((acc, expense) => {
		acc[expense.type] = (acc[expense.type] || 0) + expense.amount
		return acc
	}, {})

	const data = {
		labels: Object.keys(expensesByType),
		datasets: [
			{
				data: Object.values(expensesByType),
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
				hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
			},
		],
	}
	const options = {
		tooltips: {
			callbacks: {
				label: function (context) {
					const label = context.label || ''
					const value = context.parsed.y
					return `${label}: ${value}`
				},
			},
		},
	}

	return (
		<Box className={classess.statarea}>
			<Doughnut data={data} options={options} />
		</Box>
	)
}
