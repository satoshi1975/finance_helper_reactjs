import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import classes from './Sections.module.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

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

			<Button className={classes.section}>Exchange rate</Button>
			<Button className={classes.section}>Somo more</Button>
		</Container>
	)
}

export default Sections
