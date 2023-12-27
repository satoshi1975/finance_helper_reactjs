import React, { useState, useEffect } from 'react'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import { useForm } from 'react-hook-form'
import { Textarea } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import axios from '../../../axios'
import classess from './NoteContent.module.scss'
import Sheet from '@mui/joy/Sheet'
import DropdownButton from '../NotesSections/NotesSections'
import { NoteSetGroup } from '../NoteSetGroup/NoteSetGroup'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchEditNote,
	fetchSearchNotes,
	setEditOrSelect,
} from '../../../redux/slices/notes'

export const NoteContent = ({ isShow, noteId, changeShow }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [menuItems, setMenuItems] = useState([])
	const [noteContent, setNoteContent] = useState({})
	const [selectGroup, setSelectGroup] = useState()
	const [isEditBtnDisable, setIsEditBtnDisable] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		// console.log('SELECT', select)
		axios
			.get('/note/' + noteId)
			.then(response => {
				console.log(response.data)
				setNoteContent({
					title: response.data.title,
					text: response.data.text,
					group: response.data.group,
				})
			})
			.catch(error => console.error('Ошибка при запросе данных:', error))
	}, [])
	const handlerDisableEditText = (text, defaultVal) => {
		setIsEditBtnDisable(text === defaultVal)
	}
	const {
		register,
		handleSubmit,
		formState: {},
	} = useForm({
		defaultValues: {
			title: noteContent.title,
			text: noteContent.text,
			group: noteContent.group,
		},
	})

	useEffect(() => {
		console.log('myVariable изменилась:', noteContent)
		// Вы можете добавить здесь дополнительную логику обработки изменений
	}, [noteContent])

	const handlerSubmitEditNote = async params => {
		try {
			params.group = noteContent.group
			// console.log(params)
			const data = await dispatch(fetchEditNote({ id: noteId, params }))
			console.log(data)
			changeShow(false)
			await dispatch(fetchSearchNotes({ search: '', group: '' }))
		} catch (error) {
			console.error('Ошибка при отправке заметки:', error)
		}
	}
	const handleChangeGroup = async id => {
		// setNoteContent((noteContent.group = id))
		setNoteContent(noteContent => {
			return {
				...noteContent,
				group: id,
			}
		})
		// console.log('type', noteContent)
		// const data = await dispatch(
		// 	fetchEditNote({ id: noteId, params: noteContent })
		// )
		// console.log('finally', noteContent)
		// setNoteContent((noteContent.group = id))
	}

	return (
		<Modal open={isShow} onClose={() => changeShow(false, null)}>
			<ModalDialog color='primary' layout='center' size='lg' variant='soft'>
				<form
					onSubmit={handleSubmit(handlerSubmitEditNote)}
					className={classess.editnoteform}
				>
					<ModalClose />

					<Textarea
						{...register('title', { required: 'Enter title' })}
						type='text'
						className={classess.edittitleinput}
						onChange={e =>
							handlerDisableEditText(e.target.value, noteContent.title)
						}
						defaultValue={noteContent.title}
					></Textarea>
					<Textarea
						{...register('text', { required: 'Enter text note' })}
						variant='solid'
						color='primary'
						className={classess.edittextinput}
						type='text'
						onChange={e =>
							handlerDisableEditText(e.target.value, noteContent.text)
						}
						defaultValue={noteContent.text}
					></Textarea>
					<div className={classess.selectgroup}>
						<NoteSetGroup
							noteContent={noteContent}
							setContent={handleChangeGroup}
							className={classess.selectgroupbtn}
						/>
					</div>
					<Button type='submit' disabled={isEditBtnDisable}>
						Save
					</Button>
				</form>
			</ModalDialog>
		</Modal>
	)
}
