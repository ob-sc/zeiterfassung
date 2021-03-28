import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { FiDelete } from 'react-icons/fi';
import { useDeleteAnmeldung } from '../../../api/useAngemeldet';
import useCommonStyles from '../../../styles/common';

const useStyles = makeStyles((theme) => ({
  listItem: {
    border: '1px solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.light,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
}));

function AngemeldetList({ selectedAh, handleSelection, angemeldet }) {
  const { isLoading, data } = angemeldet;
  const common = useCommonStyles();
  const classes = useStyles();

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
              selected={selectedAh?.data?.id === ahid}
              onClick={() => handleSelection(angemeldetAh)}
            >
              <ListItemText primary={name} secondary={start} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteMutation.mutate({ id: id })}
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

export default AngemeldetList;

// container mit border und dann entweder list
// oder wenn isEmpty dann text niemand angemeldet

// iserror einbauen
// date gestern einbauen

// <Chip variant="outlined" color="primary" onDelete={handleDelete} avatar={<Avatar>F</Avatar>} />
