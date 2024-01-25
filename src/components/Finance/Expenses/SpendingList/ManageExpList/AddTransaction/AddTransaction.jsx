import { Box, Button, Input, Option } from '@mui/joy'
import Select, { selectClasses } from '@mui/joy/Select'
import React from 'react'
import classess from './AddTransaction.module.scss'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { NumericFormat } from 'react-number-format'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Add from '@mui/icons-material/Add'
import {
	fetchAddTransaction,
	fetchTransByMonth,
} from '../../../../../../redux/slices/transactions'
import { useDispatch, useSelector } from 'react-redux'

export const AddTransaction = () => {
	const dispatch = useDispatch()
	const year = useSelector(state => state.yearmonthtrans.year)
	const month = useSelector(state => state.yearmonthtrans.month)
	const data = useSelector(state => state.yearmonthtrans.data)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			title: 'fewf',
			amount: 0,
			type: '',
		},
	})

	const onSubmit = async params => {
		try {
			const data = await dispatch(fetchAddTransaction(params))
			dispatch(fetchTransByMonth({ year, month }))
			reset()
			// reset({
			// 	title: '',
			// 	amount: '',
			// 	type: '',
			// })
		} catch (error) {
			console.error('Ошибка при отправке заметки:', error)
		}
	}

	return (
		<Box>
			<Box className={classess.addtransactionform}>
				<form className={classess.form} onSubmit={handleSubmit(onSubmit)}>
					<Input
						color='neutral'
						{...register('title', { required: 'Enter description' })}
						size='sm'
						variant='outlined'
						placeholder='desc'
					/>

					<Input
						{...register('amount', { required: 'Enter amount' })}
						placeholder='Amount'
						size='sm'
						slotProps={{
							input: {
								component: NumericFormatAdapter,
							},
						}}
					/>

					<Select
						placeholder='Select a type'
						{...register('type', { required: 'Select a type' })}
						indicator={<KeyboardArrowDown />}
						size='sm'
						sx={{
							width: 240,
							[`& .${selectClasses.indicator}`]: {
								transition: '0.2s',
								[`&.${selectClasses.expanded}`]: {
									transform: 'rotate(-180deg)',
								},
							},
						}}
					>
						<Option value='dog'>Transport</Option>
						<Option value='cat'>Food</Option>
						<Option value='fish'>Rent</Option>
						<Option value='bird'>Else</Option>
					</Select>

					<Button
						startDecorator={<Add />}
						size='sm'
						type='submit'
						aria-label='sdad'
					>
						Add operation
					</Button>
				</form>
			</Box>
		</Box>
	)
}

const NumericFormatAdapter = React.forwardRef(function NumericFormatAdapter(
	props,
	ref
) {
	const { onChange, ...other } = props

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			onValueChange={values => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				})
			}}
			thousandSeparator={false}
			valueIsNumericString
			prefix=''
		/>
	)
})

NumericFormatAdapter.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}
