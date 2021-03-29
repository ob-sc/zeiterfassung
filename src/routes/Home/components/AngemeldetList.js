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
import useHomeContext from '../../../context/HomeContext';
import { useDeleteAnmeldung } from '../../../api/useAngemeldet';
import useCommonStyles from '../../../styles/common';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: '1px solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.light,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
}));

function AngemeldetList({ handleSelection, angemeldet }) {
  const { isLoading, data } = angemeldet;
  const common = useCommonStyles();
  const classes = useStyles();

  const { state, updateAngemeldet } = useHomeContext();

  const deleteMutation = useDeleteAnmeldung();

  const isEmpty = data.length === 0;

  return !isLoading ? (
    <List dense={true} className={common.mdItem}>
      {!isEmpty ? (
        data.map((angemeldetAh) => {
          const { id, ahid, date, nachname, start, vorname } = angemeldetAh;
          const name = `${vorname} ${nachname}`;
          return (
            <ListItem
              key={id}
              className={classes.listItem}
              selected={state?.selected?.data?.id === ahid}
              onClick={() => handleSelection(angemeldetAh)}
            >
              <ListItemText primary={name} secondary={start} />
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
          <ListItemText primary="Keine Aushilfe angemeldet" />
        </ListItem>
      )}
    </List>
  ) : (
    <CircularProgress />
  );
}

AngemeldetList.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  angemeldet: PropTypes.object.isRequired,
};

export default AngemeldetList;
