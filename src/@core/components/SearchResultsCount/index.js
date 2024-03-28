import React from 'react';

const SearchResultsCount = ({ metaData }) => {
  return (
    <p className="font-medium-1 fw-bolder">
      Search Results Found
      {metaData?.total_records < 10
        ? ` 0${metaData?.total_records === 0 ? '' : metaData?.total_records}`
        : ` ${metaData?.total_records}`}
    </p>
  );
};

export default SearchResultsCount;
