import React from 'react'
import classess from './Notes.module.scss'
import NoteSections from '../../components/Notes/NotesSections/NotesSections'
import { NotesGrid } from '../../components/Notes/NotesGrid/NotesGrid'

export const Notes = () => {
	return (
		<div className={classess.notesarea}>
			{/* <NoteSearch /> */}
			<div className={classess.notecontainer}>
				<NotesGrid />
				{/* <NoteSections /> */}
			</div>
		</div>
	)
}
