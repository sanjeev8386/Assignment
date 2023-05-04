import React from 'react';
import DataTable from 'react-data-table-component';
import { usePagination } from '../../hooks';
import Spinner from '../../components/Spinner';

const AssetImg = ({ url }) => <img height="50px" width="50px" src={url} />;

const columns = [
  {
    name: 'Title',
    selector: (row) => row.title
  },
  {
    name: 'Description',
    selector: (row) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
        {row.description.substring(0, 40) + '...'}
      </div>
    )
  },
  {
    name: 'Image',
    selector: (row) => row.url,
    format: (row) => <AssetImg url={row.url} />
  }
];

function AssetTable() {
  const { data, total, loading, setPerPage, perPage, gotoPage } = usePagination('/asset');

  const handlePageChange = (page) => {
    gotoPage(page, perPage);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      highlightOnHover
      pagination
      paginationServer
      paginationTotalRows={total}
      progressPending={loading}
      progressComponent={<Spinner />}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
      paginationPerPage={perPage}
      paginationServerOptions={{ persistSelectedOnPageChange: true }}
    />
  );
}

export default AssetTable;
