import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import { Menu, MenuItem } from '@mui/material'
import classess from './NotesSections.module.scss'
import Button from '@mui/joy/Button'
import Add from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import Textarea from '@mui/joy/Textarea'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchNotes } from '../../../redux/slices/notes'

function DropdownButton(input) {
	const [anchorEl, setAnchorEl] = useState(null)
	const [menuItems, setMenuItems] = useState([])
	const [isAddGroup, setIsAddGroup] = useState(false)
	const [isActiveAdd, setIsActiveAdd] = useState(true)
	const open = Boolean(anchorEl)
	const { select } = useSelector(state => state.editOrSelect)
	const dispatch = useDispatch()
	useEffect(() => {
		console.log('start_inp', input)
		axios
			.get('/groups')
			.then(response => {
				setMenuItems(response.data) // предполагаем, что ответ содержит массив элементов
			})
			.catch(error => console.error('Ошибка при запросе данных:', error))
	}, [])

	const handleEnterGroupName = () => {
		setIsAddGroup(true)
	}
	const closeGroupInput = () => {
		setIsAddGroup(false)
	}
	const isValidName = name => {
		if (name.length === 0 || name.length > 20) {
			setIsActiveAdd(true)
		} else {
			setIsActiveAdd(false)
		}
	}
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
		setIsAddGroup(false)
	}
	const handleSortGroup = id => {
		dispatch(fetchSearchNotes({ search: '', group: id }))
		setAnchorEl(null)
		setIsAddGroup(false)
	}

	return (
		<div>
			<Button
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				Select group
			</Button>
			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
			>
				{isAddGroup ? (
					<>
						<Textarea onChange={e => isValidName(e.target.value)}>
							add group
						</Textarea>

						<Button
							disabled={isActiveAdd}
							className={classess.subnewgroupbtn}
							startDecorator={<Add />}
						></Button>
						<Button
							className={classess.clsnewgroupbtn}
							startDecorator={<Close />}
							onClick={closeGroupInput}
						></Button>
					</>
				) : (
					<Button
						onClick={handleEnterGroupName}
						startDecorator={<Add />}
						className={classess.addgroupbtn}
					>
						Add group
					</Button>
				)}
				<MenuItem
					className={classess.allgroupbtn}
					onClick={() => handleSortGroup('')}
				>
					All
				</MenuItem>
				{menuItems.map((item, index) => (
					<MenuItem key={index} onClick={() => handleSortGroup(item._id)}>
						{item.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}

export default DropdownButton
