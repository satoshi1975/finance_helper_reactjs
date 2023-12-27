import { Box, Button, FormControl, FormLabel, Input, Option } from '@mui/joy'
import Select, { selectClasses } from '@mui/joy/Select'
import React, { useEffect } from 'react'
import classess from './AddTransaction.module.scss'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { NumericFormat } from 'react-number-format'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Add from '@mui/icons-material/Add'
import {
	fetchAddTransaction,
	fetchTransByMonth,
	setMonth,
} from '../../../../../../redux/slices/transactions'
import { useDispatch, useSelector } from 'react-redux'
// import { Select } from '@mui/material'

export const AddTransaction = () => {
	const dispatch = useDispatch()
	const year = useSelector(state => state.yearmonthtrans.year)
	const month = useSelector(state => state.yearmonthtrans.month)
	const data = useSelector(state => state.yearmonthtrans.data)
	// useEffect(() => {
	// 	dispatch(fetchTransByMonth({ year, month }))
	// }, [dispatch, year, month])

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			title: '',
			amount: '',
			type: '',
		},
	})

	const onSubmit = async params => {
		try {
			const data = await dispatch(fetchAddTransaction(params))
			dispatch(fetchTransByMonth({ year, month }))
			console.log(data)
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

					<FormControl>
						<Input
							{...register('amount', { required: 'Enter amount' })}
							// onChange={event => setValue(event.target.value)}
							placeholder='Amount'
							size='sm'
							slotProps={{
								input: {
									component: NumericFormatAdapter,
								},
							}}
						/>
					</FormControl>
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
						<Option value='dog'>Dog</Option>
						<Option value='cat'>Cat</Option>
						<Option value='fish'>Fish</Option>
						<Option value='bird'>Bird</Option>
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
