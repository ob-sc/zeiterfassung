import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FiDelete } from 'react-icons/fi';
import clsx from 'clsx';
import useHomeContext from '../../../context/HomeContext';
import { useDeleteAnmeldung } from '../../../api/useAngemeldet';
import useCommonStyles from '../../../styles/common';
import { anmeldungIsToday } from '../../../util/dateUtil';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: '1px solid',
    borderRadius: 4,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  normalBorder: { borderColor: theme.palette.primary.light },
  errorBorder: { borderColor: theme.palette.error.main },
}));

function AList({ handleSelection, angemeldet }) {
  const { isLoading, data } = angemeldet;
  const common = useCommonStyles();
  const { listItem, normalBorder, errorBorder } = useStyles();
  const { state, updateAngemeldet } = useHomeContext();
  const deleteMutation = useDeleteAnmeldung();

  const isEmpty = data.length === 0;

  return (
    <List dense={true} className={common.mdItem}>
      {!isLoading ? (
        data.map((angemeldetAh) => {
          const { id, ahid, date, nachname, start, vorname } = angemeldetAh;
          const name = `${vorname} ${nachname}`;
          const { string, anmeldungToday } = anmeldungIsToday(date, start);
          return (
            <ListItem
              key={id}
              className={clsx(
                listItem,
                anmeldungToday ? normalBorder : errorBorder
              )}
              selected={state.selected?.data?.id === ahid}
              onClick={() => handleSelection(angemeldetAh)}
            >
              <ListItemText primary={name} secondary={string} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    updateAngemeldet(false);
                    deleteMutation.mutate({ id });
                  }}
                >
                  <FiDelete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )}
      {isEmpty && !isLoading && (
        <ListItem>
          <ListItemText primary="Keine Aushilfe angemeldet" secondary=":(" />
        </ListItem>
      )}
    </List>
  );
}

AList.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  angemeldet: PropTypes.object.isRequired,
};

export default AList;
