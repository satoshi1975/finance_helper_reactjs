import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import styles from './AuthBtns.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuth } from '../../../redux/slices/auth'

const AuthBtns = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	const onClickLogout = () => {
		if (window.confirm('Are you sure you want to quite?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	}

	return (
		<Container className={styles.btnContainer}>
			{isAuth ? (
				<>
					<Button onClick={onClickLogout} sx={{ color: 'orange' }}>
						Log out
					</Button>
				</>
			) : (
				<>
					<Link to='/login'>
						<Button sx={{ color: 'orange' }}>Login</Button>
					</Link>
					<Link to='/registration'>
						<Button sx={{ color: 'orange' }}>Registration</Button>
					</Link>
				</>
			)}
		</Container>
	)
}

export default AuthBtns
