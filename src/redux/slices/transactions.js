import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAddTransaction = createAsyncThunk(
	'transactions/fetchAddTransaction',
	async params => {
		const { data } = await axios.post('/transactions', params)
		return data
	}
)
export const fetchGetTransactions = createAsyncThunk(
	'transactions/fetchGetTransactions',
	async params => {
		const { data } = await axios.get('/transactions', params)
		return data
	}
)

export const fetchTransByMonth = createAsyncThunk(
	'notes/fetchTransByMonth',
	async searchTerm => {
		const { data } = await axios.get(
			`transactions/search/?year=${searchTerm.year}&month=${searchTerm.month}`
		)
		return data
	}
)

export const fetchDeleteTransactions = createAsyncThunk(
	'transactions/fetchDeleteTransactions',
	async params => {
		console.log('params', params.ids)
		const { data } = await axios.delete('/transactions', { data: params })
		return data
	}
)
const DeleteTransactions = createSlice({
	name: 'remove transactions',
	initialState: { idsList: [], status: 'loaded' },
	reducers: {
		setList: (state, action) => {
			state.idsList = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchDeleteTransactions.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchDeleteTransactions.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchDeleteTransactions.rejected, state => {
				state.status = 'error'
			})
	},
})
const MonthYearSlices = createSlice({
	name: 'select month year',
	initialState: {
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		data: [],
		status: 'loading',
	},
	reducers: {
		setMonth: (state, action) => {
			state.month = action.payload
		},
		setYear: (state, action) => {
			state.year = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTransByMonth.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchTransByMonth.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchTransByMonth.rejected, state => {
				state.status = 'error'
			})
	},
})

const TransactionsControllerSlice = createSlice({
	name: 'transactions',
	initialState: { data: null, status: 'loading' },
	extraReducers: builder => {
		builder
			.addCase(fetchAddTransaction.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchAddTransaction.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchAddTransaction.rejected, state => {
				state.status = 'error'
			})
			.addCase(fetchGetTransactions.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchGetTransactions.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchGetTransactions.rejected, state => {
				state.status = 'error'
			})
	},
})
export const { setMonth, setYear } = MonthYearSlices.actions
export const { setList } = DeleteTransactions.actions
export const transactionsSearchReducer = MonthYearSlices.reducer
export const transactionsControllReducer = TransactionsControllerSlice.reducer
export const transactionsDelete = DeleteTransactions.reducer
