import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchMyNotes = createAsyncThunk(
	'notes/fetchMyNotes',
	async params => {
		const { data } = await axios.get('/notes', params)
		return data
	}
)
export const fetchSearchNotes = createAsyncThunk(
	'notes/fetchSearchNotes',
	async searchTerm => {
		const { data } = await axios.get(
			`/search?search=${searchTerm.search}&group=${searchTerm.group}`
		)
		return data
	}
)
export const fetchEditNote = createAsyncThunk(
	'notes/fetchEditNote',
	async props => {
		console.log(`RES/notes/` + props.id, props.params)
		const { data } = await axios.patch(`/notes/` + props.id, props.params)
		return data
	}
)
// export const fetchNotesGroups = createAsyncThunk(
// 	'notes/fetchNotesGroups',
// 	async searchTerm => {
// 		const { data } = await axios.get(`/groups`)
// 		return data
// 	}
// )

export const fetchAddNote = createAsyncThunk(
	'notes/fetchAddNote',
	async params => {
		const { data } = await axios.post('/notes', params)
		return data
	}
)

const initialState = {
	data: [],
	currentPage: 1,
	notesPerPage: 9,
	status: 'loading',
}

const editOrSelectGroupSlice = createSlice({
	name: 'edit or select',
	initialState: { select: true },
	reducers: {
		setEditOrSelect: (state, action) => {
			state.select = action.payload
		},
	},
})

const noteControllerSlice = createSlice({
	name: 'controller',
	initialState: { data: null, status: 'loading' },
	extraReducers: builder => {
		builder
			.addCase(fetchAddNote.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchAddNote.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchAddNote.rejected, state => {
				state.status = 'error'
				state.data = null
			})
			.addCase(fetchEditNote.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchEditNote.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchEditNote.rejected, state => {
				state.status = 'error'
				state.data = null
			})
	},
})

const searchSlice = createSlice({
	name: 'search',
	initialState: { data: [], status: false, currentPage: 1, notesPerPage: 9 },
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setSearchResult: (state, action) => {
			// state.currentPage = action.payload
			state.data = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchSearchNotes.pending, state => {
				state.status = 'loading'
				state.data = []
				state.currentPage = 1
				state.notesPerPage = 9
			})
			.addCase(fetchSearchNotes.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
				state.currentPage = 1
				state.notesPerPage = 9
			})
			.addCase(fetchSearchNotes.rejected, state => {
				state.status = 'error'
				state.data = []
				state.currentPage = 1
				state.notesPerPage = 9
			})
	},
})

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setSearchResult: (state, action) => {
			// state.currentPage = action.payload
			state.data = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMyNotes.pending, state => {
				state.status = 'loading'
				state.data = []
				state.currentPage = 1
				state.notesPerPage = 9
			})
			.addCase(fetchMyNotes.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
				state.currentPage = 1
				state.notesPerPage = 9
			})
			.addCase(fetchMyNotes.rejected, (state, error) => {
				state.status = 'error'
				state.data = []
				state.currentPage = 1
				state.notesPerPage = 9
			})
	},
})

export const { setCurrentPage, setSearchResult } = searchSlice.actions
export const { setEditOrSelect } = editOrSelectGroupSlice.actions
// export const { setCurrentPage, setSearchResult } = noteControllerSlice.actions
export const editOrSelectGroupReducer = editOrSelectGroupSlice.reducer
export const notesReducer = notesSlice.reducer
export const notesControlReducer = noteControllerSlice.reducer

export const searchReducer = searchSlice.reducer
