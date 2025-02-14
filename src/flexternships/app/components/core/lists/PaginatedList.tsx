import { ParsedPaginatedData } from '@/flexternships/constraints/types/core-types';
import { cn } from '@/flexternships/lib/utils';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Spinner from '../Spinner';

/**
 * Metadata for pagination state
 */
type PaginationMetadata = {
  /** Current page number (0-based) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of records available */
  totalRecords: number;
  /** Whether there are more pages to load */
  hasNextPage: boolean;
};

/**
 * A generic list component that handles pagination
 * @template T The type of items in the list
 * @param props Component props
 * @param props.renderItem Function to render each item in the list
 * @param props.loadMore Function to load the next page of data
 * @param props.pageSize Number of items per page (default: 10)
 * @param props.className Optional CSS class name
 * @returns Paginated list component
 */
function PaginatedList<T>({
  renderItem,
  loadMore,
  pageSize = 10,
  loader = <Spinner className="size-10" />,
  className,
}: {
  renderItem: (item: T) => React.ReactNode;
  loadMore: () => Promise<ParsedPaginatedData<T>>;
  pageSize?: number;
  loader?: React.ReactNode;
  className?: string;
}) {
  /** Default metadata state for pagination */
  const DEFAULT_METADATA: PaginationMetadata = {
    currentPage: 0,
    pageSize,
    totalRecords: 0,
    hasNextPage: true,
  };

  const [metadata, setMetadata] = useState<PaginationMetadata>(DEFAULT_METADATA);
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Fetches the next page of data if available and not already loading
   * Updates the data and metadata state with new values
   */
  const fetchData = async () => {
    if (isLoading || !metadata.hasNextPage) return;

    setIsLoading(true);
    try {
      const { data: newData, metadata: newMetadata } = await loadMore();
      setData((cur) => [...cur, ...newData]);
      setMetadata(newMetadata);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles scroll events to detect when user reaches end of list
   * Triggers loading of more data when scrolled to bottom
   */
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;

    if (isAtBottom) {
      fetchData();
    }
  }, [fetchData]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Setup scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div ref={containerRef} className={cn('overflow-y-auto', className)}>
      {data.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
      {isLoading && <div className="p-4">{loader}</div>}
    </div>
  );
}

export default PaginatedList;
