import { Box } from '@mui/joy'
import React from 'react'
import classess from './SpendingList.module.scss'
import { ManageExpList } from './ManageExpList/ManageExpList'
import DataTable from './TransactionsList/TransactionsList'

export const SpendingList = () => {
	return (
		<Box className={classess.spendlistarea}>
			<ManageExpList />
			<DataTable />
		</Box>
	)
}
