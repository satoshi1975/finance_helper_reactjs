import React, { useState } from 'react'
import classess from './Finance.module.scss'
import { Box, Container } from '@mui/material'
import { Expenses } from '../../components/Finance/Expenses/Expenses'
import FinanceSections from '../../components/Finance/FinanceSections/FinanceSections'
export const Finance = () => {
	const [curSection, setCurSection] = useState('')
	return (
		<Box className={classess.financearea}>
			<FinanceSections />
			<Box className={classess.financecontent}>
				<Expenses />
			</Box>
		</Box>
	)
}
