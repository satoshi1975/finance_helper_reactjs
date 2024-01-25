import { Box } from '@mui/material'
import React from 'react'
import classess from './Expenses.module.scss'
import { ExpStatistic } from './Statistic/Statistic'
import { SpendingList } from './SpendingList/SpendingList'
export const Expenses = () => {
	return (
		<Box className={classess.expensesarea}>
			<ExpStatistic />
			<SpendingList />
		</Box>
	)
}
