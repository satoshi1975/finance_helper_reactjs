import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Header from './components/Header/NavBar'
import Container from '@mui/material/Container'
import './styles-app.scss'
import classes from './assets/styles/Global.module.scss'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Notes } from './pages/Notes/Notes'
import { Finance } from './pages/Finance/Finance'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'
import { Currency } from './pages/Currency/Currency'

const App = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	React.useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])

	return (
		<>
			<Header />
			<Container className={classes.maincontainer}>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Register />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/finance' element={<Finance />} />
					<Route path='/currency' element={<Currency />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
