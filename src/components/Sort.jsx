import React, { useContext } from 'react'
import cn from 'classnames'

import iconFilter from '../assets/img/codicon_filter.svg'
import iconFilterFilled from '../assets/img/codicon_filter-filled.svg'
import icondropDown from '../assets/img/fe_drop-down.svg'
import iconClose from '../assets/img/close.svg'

import { setNameColumn, setSearch } from '../Redux/slices/sortSlice'
import { useDispatch, useSelector } from 'react-redux'

function Sort({ keyNames }) {
	const dispatch = useDispatch()
	const { search, nameColumn } = useSelector((state) => state.sort)

	const [open, setOpen] = React.useState(false)
	const [dropDown, setDropDown] = React.useState(false)

	const sortRef = React.useRef(null)
	const searchRef = React.useRef(search)
	const selectRef = React.useRef('')

	// Исключаем слово 'date' из рендеринга
	let exclusion = keyNames.indexOf('date')
	keyNames.splice(exclusion, exclusion)

	// если клик не по sort__popup, то скрываем
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			const _event = event

			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setOpen(false)
				setDropDown(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => document.body.removeEventListener('click', handleClickOutside)
	}, [])

	function Search(val) {
		dispatch(setSearch(val))
	}

	return (
		<div ref={sortRef} className='Sort'>
			<button className='iconFilter-button' onClick={() => setOpen(!open)}>
				<img
					className='iconFilter'
					src={open === true ? iconFilterFilled : iconFilter}
					alt='icon'
				/>
			</button>
			<div className={cn('sort__popup', { active: open })}>
				<ul>
					<li>
						<div className='select'>
							<input
								ref={selectRef}
								value={nameColumn}
								disabled
								style={{ textTransform: 'capitalize' }}
								className='input'
							/>
							<img
								className={
									dropDown === true ? 'icondropDown active' : 'icondropDown'
								}
								onClick={() => setDropDown(!dropDown)}
								src={icondropDown}
								alt='icon'
							/>
							<img
								className='close'
								onClick={() => {
									dispatch(setNameColumn(''))
								}}
								src={iconClose}
							/>
							{dropDown && (
								<div className='sort__popup_name'>
									<ul>
										{keyNames?.map((name, i) => (
											<li
												onClick={() => {
													dispatch(setNameColumn(name))
												}}
												key={i}
												style={{ textTransform: 'capitalize' }}>
												{name}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</li>
					<li>
						<input
							ref={searchRef}
							onInput={() => Search(searchRef.current.value)}
							className='Search input'
						/>
					</li>
					{/* onChange={(value) => setSearchValue(value)} */}
					<li>
						<button className='Сondition__button'> = </button>
						<button className='Сondition__button'> ?= </button>
						<button className='Сondition__button'> ᐱ </button>
						<button className='Сondition__button'> ᐯ </button>
					</li>
					{/* <li>
							<button style={{ width: '100%', height: '45px' }} type='submit'>
								Сортировать
							</button> 
						</li> */}
				</ul>
			</div>
		</div>
	)
}

export default Sort
