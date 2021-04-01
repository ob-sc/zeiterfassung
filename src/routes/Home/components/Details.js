import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import BorderContainer from '../../../components/BorderContainer';
import useHomeContext from '../../../context/HomeContext';
import useCommonStyles from '../../../styles/common';
import { localDate } from '../../../util/dateUtil';

function ADetails() {
  const common = useCommonStyles();
  const { state } = useHomeContext();

  const isSelected = state.selected !== null;

  const date = localDate(state.selected?.angemeldet?.date);

  const rows = [
    { key: 'Datum', value: date },
    { key: 'Beginn', value: 1 },
    { key: 'Ende', value: 2 },
    { key: 'Arbeitszeit', value: 3 },
    { key: 'Gehalt', value: 4 },
  ];

  return (
    <BorderContainer
      mx={4}
      border={isSelected}
      classArray={[common.mdItem, common.flexColumnCenter]}
    >
      {!isSelected ? (
        <div></div>
      ) : (
        <Table aria-label="simple table" size="small">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </BorderContainer>
  );
}

export default ADetails;

/*
fs_kontrolle
id
nachname
norlohn
personalnr
reg_date
samlohn
sonlohn
station
status
vorname
*/
