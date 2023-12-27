import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import classes from './Register.module.scss'
import { Navigate } from 'react-router-dom'
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth'

export const Register = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,

		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullname: 'satoshi nnn',
			email: 'testemail3@mail.com',
			password: '12345',
		},
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister(values))

		if (!data.payload) {
			return alert('Registration error')
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
			<Typography className={classes.registertitle}>Registration</Typography>
			<form className={classes.loginform} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label='Full name'
					error={Boolean(errors.fullname?.message)}
					helperText={errors.fullname?.message}
					{...register('fullName', { required: 'Enter your full name' })}
					fullWidth
				/>
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
					className={classes.registerbtn}
					disabled={!isValid}
				>
					Register
				</Button>
			</form>
		</div>
		//  </Paper>
	)
}
