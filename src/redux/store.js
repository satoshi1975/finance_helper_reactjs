import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import {
	transactionsControllReducer,
	transactionsDelete,
	transactionsSearchReducer,
} from './slices/transactions'
import currencyReducer, { BaseCurrency, ExchangeRates } from './slices/currency'

import {
	notesReducer,
	searchReducer,
	notesControlReducer,
	editOrSelectGroupReducer,
} from './slices/notes'

const store = configureStore({
	reducer: {
		auth: authReducer,
		myNotes: notesReducer,
		searchNotes: searchReducer,
		controlNotes: notesControlReducer,
		editOrSelect: editOrSelectGroupReducer,
		transactionEdit: transactionsControllReducer,
		yearmonthtrans: transactionsSearchReducer,
		deleteTransactions: transactionsDelete,
		currency: currencyReducer,
		baseCurrency: BaseCurrency,
		exchangeRates: ExchangeRates,
	},
})

export default store
