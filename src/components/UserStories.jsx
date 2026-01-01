import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  {
    field: 'titre',
    headerName: 'Titre',
    width: 180,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 130,
  },
  {
    field: 'statut',
    headerName: 'Status',
    width: 130,
  },
//   {
//     field: 'critereAcceptation',
//     headerName: 'Acceptance Criteria',
//     width: 280,
//   },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function UserStories({stories}) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={stories}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
