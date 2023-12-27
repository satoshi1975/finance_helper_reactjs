import * as React from 'react'
import Box from '@mui/joy/Box'
import Tooltip from '@mui/joy/Tooltip'
import Button from '@mui/joy/Button'

export default function FinanceSections() {
	return (
		<Box
			sx={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}
		>
			<Tooltip variant='solid'>
				<Button variant='solid'>Expenses</Button>
			</Tooltip>
			<Tooltip svariant='solid'>
				<Button variant='solid'>Solid</Button>
			</Tooltip>
		</Box>
	)
}
