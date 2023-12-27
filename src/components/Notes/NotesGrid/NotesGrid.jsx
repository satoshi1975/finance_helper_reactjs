import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Card, CardContent, Typography, Pagination } from '@mui/material'
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchSearchNotes,
	setCurrentPage,
	setEditOrSelect,
} from '../../../redux/slices/notes'
import classess from './NotesGrid.module.scss'
import Button from '@mui/joy/Button'
import axios from '../../../axios'
import AddNote from '../NoteAdd/NoteAdd'
import { NoteContent } from '../NoteContent/NoteContent'
import NoteSections from '../NotesSections/NotesSections'
import Close from '@mui/icons-material/Close'

export const NotesGrid = () => {
	const [input, setInput] = useState('')
	const [tags, setTags] = useState([])
	const [tagInput, setTagInput] = useState('')
	const [isNoteContent, setIsNoteContent] = useState(false)
	const [noteContentId, setNoteContentId] = useState(null)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setEditOrSelect(true))
	}, [])

	const handleDeleteNote = id => {
		axios
			.delete('/notes/' + id)
			.then(response => {
				debouncedSearch(input)
			})
			.catch(error => console.error('Delete note error:', error))
	}
	const debouncedSearch = useCallback(
		debounce(searchTerm => {
			dispatch(fetchSearchNotes({ search: searchTerm, group: '' }))
		}, 500),
		[dispatch]
	)
	useEffect(() => {
		if (true) {
			debouncedSearch(input)
		}
		return () => {
			debouncedSearch.cancel()
		}
	}, [input, debouncedSearch])
	const { data, currentPage, notesPerPage } = useSelector(
		state => state.searchNotes
	)

	const indexOfLastNote = currentPage * notesPerPage
	const indexOfFirstNote = indexOfLastNote - notesPerPage
	const currentNotes = data.slice(indexOfFirstNote, indexOfLastNote)

	const handlePageChange = (event, value) => {
		dispatch(setCurrentPage(value))
	}
	const handleCloseNote = (isShow, id) => {
		isShow ? dispatch(setEditOrSelect(false)) : dispatch(setEditOrSelect(true))
		setIsNoteContent(isShow)
		setNoteContentId(id)
	}
	const DateTimeFormater = date => {
		const newDate = new Date(date)
		const formattedDateTime = newDate.toLocaleString('ru-RU', {
			day: '2-digit', // День
			month: '2-digit', // Месяц
			year: 'numeric', // Год
			hour: '2-digit', // Часы
			minute: '2-digit', // Минуты
			second: '2-digit', // Секунды
		})
		return formattedDateTime
	}
	return (
		<div className={classess.notegridarea}>
			{isNoteContent ? (
				<NoteContent
					isShow={isNoteContent}
					noteId={noteContentId}
					changeShow={handleCloseNote}
				/>
			) : null}
			<div className={classess.searchinputs}>
				<AddNote data={input} />
				<input
					placeholder='search'
					className={classess.notesearchinput}
					type='text'
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<NoteSections />
			</div>
			<div className={classess.notegrid}>
				<Grid container spacing={2} style={{ minHeight: 293 + 'px' }}>
					{currentNotes.map(item => (
						<Grid key={item.id} item xs={12} sm={6} md={4}>
							<Card
								key={item.id}
								className={classess.notecard}
								onClick={() => handleCloseNote(true, item._id)}
							>
								<CardContent className={classess.cardcontent}>
									<div>
										<Typography fontSize='20px' variant='body1'>
											{item.title}{' '}
										</Typography>
										<Typography fontSize='10px' variant='body1'>
											{DateTimeFormater(item.createdAt)}{' '}
										</Typography>
									</div>
									<Button onClick={() => handleDeleteNote(item._id)}>
										{<Close />}{' '}
									</Button>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
				<Pagination
					className={classess.notespagin}
					count={Math.ceil(data.length / notesPerPage)}
					page={currentPage}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	)
}
