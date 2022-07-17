import React, { useContext } from 'react'
import iconFilter from '../assets/img/codicon_filter.svg'
import iconFilterFilled from '../assets/img/codicon_filter-filled.svg'
import icondropDown from '../assets/img/fe_drop-down.svg'
import iconClose from '../assets/img/close.svg'
import { UserContext } from './../UserContext'

function Sort({ keyNames }) {
	const [open, setOpen] = React.useState(false)
	const [dropDown, setDropDown] = React.useState(false)
	const [selectSearch, setSelectSearch] = React.useState('')

	const sortRef = React.useRef(null)
	const selectRef = React.useRef(selectSearch)

	const { setNameColumn } = useContext(UserContext)

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


	return (
		<div ref={sortRef} className='Sort'>
			<button className='iconFilter-button' onClick={() => setOpen(!open)}>
				<img
					className='iconFilter'
					src={open === true ? iconFilterFilled : iconFilter}
					alt='icon'
				/>
			</button>

			{open && (
				<div className={'sort__popup'}>
					<ul>
						<li>
							<div className='select'>
								<input
									ref={selectRef}
									value={selectSearch}
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
									onClick={() => {
										setSelectSearch('')
										setNameColumn('')
									}}
									src={iconClose}
								/>
								{dropDown && (
									<div className='sort__popup_name'>
										<ul>
											{keyNames?.map((name, i) => (
												<li
													onClick={() => {
														setSelectSearch(name)
														setNameColumn(name)
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
							<input className='Search input' />
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
			)}
		</div>
	)
}

export default Sort
