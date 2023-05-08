import React, {useCallback, useEffect, useState} from 'react';
import {Table} from "antd";

const TableWithPagination = ({
    isLoading,
    dataSource,
    columns,
    fetchData,
    saveCurrentPage,
    initialPage = 1,
    initialPageSize = 5,
    hasMore = true,
    expandable
}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);
    const [hasNextPage, setHasNextPage] = useState(hasMore);

    useEffect(() => {
        setHasNextPage(hasMore);
    }, [hasMore]);

    useEffect(() => {
        setCurrentPage(initialPage);
        setCurrentPageSize(initialPageSize);
    }, [initialPage, initialPageSize]);

    // Handle pagination change by updating the current page and page size.
    // Then, fetch data using the provided fetchData function.
    const handlePaginationChange = useCallback(
        (page, pageSize) => {
            setCurrentPage(page);
            setCurrentPageSize(pageSize);
            fetchData({ page, limit: pageSize }).then((result) => {
                const hasMore = result.payload.hasMore;
                setHasNextPage(hasMore);
            });
            saveCurrentPage(page, pageSize);
        },
        [fetchData],
    );

    // Render the Table component with the necessary props for pagination and loading state.

    return (
        <Table
            expandable={expandable}
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={{
                current: currentPage,
                total: hasNextPage
                    ? currentPage * currentPageSize + 1
                    : currentPage * currentPageSize,
                defaultPageSize: initialPageSize,
                showSizeChanger: true,
                pageSize: currentPageSize,
                pageSizeOptions: ['5', '10', '20', '30'],
                onChange: handlePaginationChange,
                onShowSizeChange: handlePaginationChange,
            }}
            rowKey={record => record.id}
            loading={isLoading}
            style={{width: "100%"}}
        />
    );
};

export default TableWithPagination;