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

const App = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	React.useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])
	// const { page } = useSelector(state => state.routing)
	return (
		<>
			<Header />
			<Container className={classes.maincontainer}>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Register />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/finance' element={<Finance />} />
				</Routes>
			</Container>
		</>

		// <>
		// 	<Header />
		// 	{/* <Body> */}
		// 	<Login />
		// 	{/* <Routes>
		// 			<Route path='/login' element={<Login />} />
		// 		</Routes> */}
		// 	{/* </Body> */}
		// </>
	)
}

export default App
