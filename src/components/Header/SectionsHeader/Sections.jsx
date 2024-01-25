import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import classes from './Sections.module.scss'
import { useNavigate } from 'react-router-dom'

const Sections = () => {
	const navigate = useNavigate()
	return (
		<Container className={classes.sections}>
			<Button className={classes.section} onClick={() => navigate('/finance')}>
				My finances
			</Button>

			<Button className={classes.section} onClick={() => navigate('/notes')}>
				My Notes
			</Button>

			<Button className={classes.section} onClick={() => navigate('/currency')}>
				Exchange rate
			</Button>
			<Button className={classes.section}>Somo more</Button>
		</Container>
	)
}

export default Sections
