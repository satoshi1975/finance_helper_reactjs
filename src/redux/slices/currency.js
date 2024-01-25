import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Freecurrencyapi from '@everapi/freecurrencyapi-js'
import Papa from 'papaparse'

const freecurrencyapi = new Freecurrencyapi(
	'fca_live_Ti7CsJOUBz0GRJvQQjjMGwX2Pv1a29yz62CbDUHb'
)

export const fetchExchangeRates = createAsyncThunk(
	'exchangeRates/fetchExchangeRates',
	async () => {
		const response = await fetch('/exchange_rates.csv')
		const csvText = await response.text()
		return new Promise((resolve, reject) => {
			Papa.parse(csvText, {
				header: true,
				complete: results => {
					const filteredData = results.data
						.filter(row => row.date === '21/01/2024')
						.map(row => ({
							currency: row.currency,
							value: row.value,
						}))
					resolve(filteredData)
				},
				error: reject,
			})
		})
	}
)

export const fetchCurrency = createAsyncThunk(
	'currency/fetchCurrency',
	async ({ base_currency, currencies }) => {
		const response = await freecurrencyapi.latest({
			base_currency: base_currency,
			currencies: currencies,
		})
		return response
	}
)

const exchangeRatesSlice = createSlice({
	name: 'exchangeRates',
	initialState: {
		data: [],
		status: 'idle',
	},
	extraReducers: builder => {
		builder
			.addCase(fetchExchangeRates.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchExchangeRates.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchExchangeRates.rejected, state => {
				state.status = 'error'
			})
	},
})

const selectBaseCurrency = createSlice({
	name: 'baseCurrency',
	initialState: {
		currency: 'USD',
	},
	reducers: {
		setBaseCurrency: (state, action) => {
			state.currency = action.payload
		},
	},
})

const currencySlice = createSlice({
	name: 'currency',
	initialState: {
		data: null,
		status: 'idle',
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCurrency.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchCurrency.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchCurrency.rejected, state => {
				state.status = 'error'
			})
	},
})

export default currencySlice.reducer
export const { setBaseCurrency } = selectBaseCurrency.actions
export const BaseCurrency = selectBaseCurrency.reducer
export const ExchangeRates = exchangeRatesSlice.reducer
