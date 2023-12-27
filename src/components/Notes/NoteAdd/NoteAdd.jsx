import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import classess from './NoteAdd.module.scss'
import { fetchSearchNotes, fetchMyNotes } from '../../../redux/slices/notes'
import Textarea from '@mui/joy/Textarea'
import Button from '@mui/joy/Button'
import Add from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { fetchAuth } from '../../../redux/slices/auth'
import { fetchAddNote } from '../../../redux/slices/notes'

// import Close from '@mui/icons-material/Close'
function AddNote(props) {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const dispatch = useDispatch()
	const handleOpenForm = () => setIsFormOpen(true)
	const handleCloseForm = () => setIsFormOpen(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			title: '',
			text: '',
		},
	})

	const onSubmit = async params => {
		// event.preventDefault()

		try {
			params.group = ''
			console.log(params)
			const data = await dispatch(fetchAddNote(params))
			handleCloseForm()
			setTitle('')
			setText('')
			dispatch(fetchSearchNotes({ search: props.data, group: '' }))
			console.log(isFormOpen)
		} catch (error) {
			console.error('Ошибка при отправке заметки:', error)
		}
	}

	return (
		<div>
			<Button startDecorator={<Add />} onClick={handleOpenForm}>
				Add note
			</Button>

			{isFormOpen && (
				<div className='modal'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={classess.newnoteform}
					>
						<Textarea
							className={classess.notetitle}
							type='text'
							// value={title}
							{...register('title', { required: 'Enter title' })}
							// onChange={e => setTitle(e.target.value)}
							placeholder='Note title'
						/>
						<Textarea
							className={classess.notetext}
							// value={text}
							{...register('text', { required: 'Enter text' })}
							// onChange={e => setText(e.target.value)}
							color='primary'
							placeholder='Note text'
							minRows={2}
							variant='solid'
						/>
						{/* <button type='submit'>Отправить</button> */}
						{/* <button className='' onClick={handleCloseForm}>
							Закрыть
						</button>
             */}
						{/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<Button startDecorator={<Add />}>Add to cart</Button>
							<Button endDecorator={<KeyboardArrowRight />} color='success'>
								Go to checkout
							</Button>
						</Box> */}
						<Button
							type='submit'
							className={classess.addnotebtn}
							startDecorator={<Add />}
						>
							Add note
						</Button>
						<Button
							onClick={handleCloseForm}
							startDecorator={<Close />}
							className={classess.closebtn}
						>
							Close
						</Button>
					</form>
				</div>
			)}
		</div>
	)
}

export default AddNote
