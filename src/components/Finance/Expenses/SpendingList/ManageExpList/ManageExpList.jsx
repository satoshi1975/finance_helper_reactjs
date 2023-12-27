import { Box, FormControl, FormLabel, Input } from '@mui/joy'
import React from 'react'
import classess from './ManageExpList.module.scss'
import { useForm } from 'react-hook-form'
import { AddTransaction } from './AddTransaction/AddTransaction.jsx'
import MonthYearSelector from './SortMonth/SortMonth.jsx'

export const ManageExpList = () => {
	return (
		<Box className={classess.managearea}>
			<AddTransaction />
			<MonthYearSelector />
		</Box>
	)
}
