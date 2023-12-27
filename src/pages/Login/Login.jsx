import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import classes from './Login.module.scss'
import { Navigate } from 'react-router-dom'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'

export const Login = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: 'testemail3@mail.com',
			password: '12345',
		},
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchAuth(values))

		if (!data.payload) {
			return alert('Login error')
		}

		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		// <Paper>
		<div className={classes.logincontainer}>
			<Typography className={classes.logintitle}>Login</Typography>
			<form className={classes.loginform} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label='Email'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', { required: 'Enter email' })}
					fullWidth
				/>
				<TextField
					label='Password'
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Enter password' })}
					fullWidth
				/>
				<Button
					type='submit'
					size='large'
					variant='contained'
					className={classes.loginbtn}
				>
					login
				</Button>
			</form>
		</div>
		//  </Paper>
	)
}
