import React, { useState } from 'react'
import classess from './Currency.module.scss'
import { Box, Container } from '@mui/material'
import { CurrencyRate } from '../../components/Currency/CurrencyRate/CurrencyRate'
export const Currency = () => {
	return (
		<Box className={classess.currencyArea}>
			<Box className={classess.currencyCards}>
				<CurrencyRate />
			</Box>
		</Box>
	)
}
