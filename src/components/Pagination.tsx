import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onFirstPage: () => void;
	onLastPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	onFirstPage,
	onLastPage
}) => {
	const pageRange = 3; // Number of pages to show on each side of the current page
	const startPage = Math.max(1, currentPage - pageRange);
	const endPage = Math.min(totalPages, currentPage + pageRange);

	return (
		<div className="flex items-center justify-center space-x-2 sm:space-x-4">
			<button
				onClick={onFirstPage}
				className={`rounded border p-1 text-sm sm:p-2 sm:text-base ${
					currentPage === 1
						? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
						: "dark:border-dark bg-white dark:bg-gray-700 dark:text-gray-300"
				}`}
			>
				First
			</button>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`rounded border p-1 text-sm sm:p-2 sm:text-base ${
					currentPage === 1
						? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
						: "dark:border-dark bg-white dark:bg-gray-700 dark:text-gray-300"
				}`}
			>
				Prev
			</button>
			{Array.from({ length: endPage - startPage + 1 }, (_, index) => (
				<button
					key={startPage + index}
					onClick={() => onPageChange(startPage + index)}
					className={`rounded border p-1 text-sm sm:p-2 sm:text-base ${
						currentPage === startPage + index
							? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
							: "dark:border-dark bg-white dark:bg-gray-700 dark:text-gray-300"
					}`}
				>
					{startPage + index}
				</button>
			))}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`rounded border p-1 text-sm sm:p-2 sm:text-base ${
					currentPage === totalPages
						? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
						: "dark:border-dark bg-white dark:bg-gray-700 dark:text-gray-300"
				}`}
			>
				Next
			</button>
			<button
				onClick={onLastPage}
				className={`rounded border p-1 text-sm sm:p-2 sm:text-base ${
					currentPage === totalPages
						? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
						: "dark:border-dark bg-white dark:bg-gray-700 dark:text-gray-300"
				}`}
			>
				Last
			</button>
		</div>
	);
};

export default Pagination;
