'use client';

import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  queryParams?: Record<string, string>;
}

export default function Pagination({ totalPages, currentPage, baseUrl, queryParams = {} }: PaginationProps) {
  // Generate pagination numbers
  const generatePagination = (currentPage: number, totalPages: number): (number | string)[] => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If current page is among the first 3 pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    // If current page is among the last 3 pages
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // If current page is somewhere in the middle
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const paginationRange = generatePagination(currentPage, totalPages);

  // If there's only 1 page, don't render pagination
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* Previous page button */}
        {currentPage > 1 && (
          <Link
            href={{
              pathname: baseUrl,
              query: { ...queryParams, page: (currentPage - 1).toString() },
            }}
            className="px-2 py-1 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            aria-label="Previous page"
          >
            &laquo;
          </Link>
        )}

        {/* Page numbers */}
        {paginationRange.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <Link
              key={`page-${page}`}
              href={{
                pathname: baseUrl,
                query: { ...queryParams, page: page.toString() },
              }}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        )}

        {/* Next page button */}
        {currentPage < totalPages && (
          <Link
            href={{
              pathname: baseUrl,
              query: { ...queryParams, page: (currentPage + 1).toString() },
            }}
            className="px-2 py-1 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            aria-label="Next page"
          >
            &raquo;
          </Link>
        )}
      </nav>
    </div>
  );
}
