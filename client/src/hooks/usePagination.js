import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PAGE_SIZE = 10;

const usePagination = (url) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(PAGE_SIZE);

  const fetchData = useCallback(
    async (pageNo, urlParams = {}) => {
      setLoading(true);
      try {
        const response = await axios({
          url,
          params: {
            pageNo,
            pageSize: perPage,
            ...urlParams,
          },
        });
        setData(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error => ', error);
        setLoading(false);
      }
    },
    [url]
  );

  const gotoPage = (pageNo, urlParams = {}) => {
    setCurrentPage(pageNo);
    fetchData(pageNo, { ...urlParams });
  };

  useEffect(() => {
    fetchData(currentPage, {pageNo: currentPage, pageSize: perPage});
  }, [fetchData, perPage]);

  const pages = Array.from(
    { length: Math.ceil(total / perPage) },
    (v, i) => i + 1
  );

  return {
    data,
    gotoPage,
    currentPage,
    pages,
    total,
    loading,
    fetchData,
    setPerPage,
    perPage
  };
};

export { usePagination };
