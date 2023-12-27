import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import { Menu, MenuItem } from '@mui/material'
import classess from './NoteSetGroup.module.scss'
import Button from '@mui/joy/Button'
import Add from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import Textarea from '@mui/joy/Textarea'
import { useSelector } from 'react-redux'

export const NoteSetGroup = ({ noteContent, setContent }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [menuItems, setMenuItems] = useState([])
	const [isAddGroup, setIsAddGroup] = useState(false)
	const [isActiveAdd, setIsActiveAdd] = useState(true)
	const open = Boolean(anchorEl)

	useEffect(() => {
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
		console.log(name)
		if (name.length === 0 || name.length > 20) {
			setIsActiveAdd(true)
		} else {
			setIsActiveAdd(false)
		}
	}
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleChooseGroup = id => {
		console.log('state', noteContent)
		setContent(id)
		console.log('state2', noteContent)
		// setAnchorEl(null)
		// setIsAddGroup(false)
	}

	const handleClose = () => {
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
				{/* <MenuItem onClick={handleClose}>hi</MenuItem> */}
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						className={
							item._id === noteContent.group ? classess.selectedgroup : ''
						}
						onClick={() => handleChooseGroup(item._id)}
					>
						{item.name}
					</MenuItem> // Измените в соответствии со структурой вашего ответа
				))}
			</Menu>
		</div>
	)
}
