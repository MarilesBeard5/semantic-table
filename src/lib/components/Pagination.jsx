import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import { Menu } from 'semantic-ui-react'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

/**
 * Helper method for creating a range of numbers
 * getRange(1, 5) => [1, 2, 3, 4, 5]
 */
const getRange = (from, to, step = 1) => {
	let i = from
	const range = []

	while (i <= to) {
		range.push(i)
		i += step
	}

	return range
}

const Pagination = (props) => {
	const { records = [], rowLimit = 15, pageNeighbours = 0 } = props
	const [currentPage, setCurrentPage] = useState(1)

	const totalRecords = useMemo(() => {
		return records.filter((r) => r.checked != false).length
	}, [records])

	const totalPages = useMemo(() => {
		return Math.ceil(totalRecords / rowLimit)
	}, [totalRecords, rowLimit])

	/**
	 * Let's say we have 10 pages and we set pageNeighbours to 2
	 * Given that the current page is 6
	 * The pagination control will look like the following:
	 *
	 * (1) < {4 5} [6] {7 8} > (10)
	 *
	 * (x) => terminal pages: first and last page(always visible)
	 * [x] => represents current page
	 * {...x} => represents page neighbours
	 */
	const fetchPageNumbers = () => {
		/**
		 * totalNumbers: the total page numbers to show on the control
		 * totalBlocks: totalNumbers + 2 to cover for the left(...) and right(...) symbols
		 */
		const totalNumbers = pageNeighbours * 2 + 3
		const totalBlocks = totalNumbers + 2

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - pageNeighbours)
			const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
			let pages = getRange(startPage, endPage)

			/**
			 * hasLeftSpill: has hidden pages to the left
			 * hasRightSpill: has hidden pages to the right
			 * spillOffset: number of hidden pages either to the left or to the right
			 */
			const hasLeftSpill = startPage > 2
			const hasRightSpill = totalPages - endPage > 1
			const spillOffset = totalNumbers - (pages.length + 1)

			switch (true) {
				// handle: (1) < {5 6} [7] {8 9} (10)
				case hasLeftSpill && !hasRightSpill: {
					const extraPages = getRange(startPage - spillOffset, startPage - 1)
					pages = [LEFT_PAGE, ...extraPages, ...pages]
					break
				}

				// handle: (1) {2 3} [4] {5 6} > (10)
				case !hasLeftSpill && hasRightSpill: {
					const extraPages = getRange(endPage + 1, endPage + spillOffset)
					pages = [...pages, ...extraPages, RIGHT_PAGE]
					break
				}

				// handle: (1) < {4 5} [6] {7 8} > (10)
				case hasLeftSpill && hasRightSpill:
				default: {
					pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
					break
				}
			}

			return [1, ...pages, totalPages]
		}

		return getRange(1, totalPages)
	}

	const pages = fetchPageNumbers()

	const goToPage = (page) => {
		const { onPageChanged = (f) => f } = props
		const currentPage = totalPages <= 0 ? 1 : Math.max(0, Math.min(page, totalPages))
		const paginationData = {
			currentPage,
			records,
		}

		setCurrentPage(onPageChanged(paginationData))
	}

	useEffect(() => {
		goToPage(1)
	}, [])

	const handleClick = (page) => (evt) => {
		goToPage(page)
	}

	return (
		<>
			{!totalRecords || !totalPages == 1 ? null : (
				<Menu
					floated='right'
					pagination
					style={{
						width: props.width <= 427 ? props.width / 2 : 'max-content',
						overflow: 'auto',
					}}
				>
					{pages.map((page, index) => {
						if (page === LEFT_PAGE)
							return (
								<Menu.Item
									key={`menu-item-${index}`}
									index={page}
									style={{ cursor: 'default' }}
								>
									...
								</Menu.Item>
							)
						if (page === RIGHT_PAGE)
							return (
								<Menu.Item
									key={`menu-item-${index}`}
									index={page}
									style={{ cursor: 'default' }}
								>
									...
								</Menu.Item>
							)

						return (
							<Menu.Item
								key={`menu-item-${index}`}
								onClick={handleClick(page)}
								index={page}
								style={{
									backgroundColor:
										page === (!isNaN(currentPage) && currentPage) &&
										'#1e56aa15',
								}}
							>
								{page}
							</Menu.Item>
						)
					})}
				</Menu>
			)}
		</>
	)
}

Pagination.propTypes = {
	totalRecords: PropTypes.number.isRequired,
	rowLimit: PropTypes.number,
	pageNeighbours: PropTypes.number,
	onPageChanged: PropTypes.func,
}

export default Pagination
