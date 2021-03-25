import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';

function AngemeldetList({ angemeldet }) {
  const notEmpty = angemeldet.length > 0;

  return (
    <List>
      {notEmpty ? (
        angemeldet.map(() => {
          return (
            <ListItem>
              <ListItemText primary="text1" secondary={'text2'} />
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <ListItemText primary="Niemand angemeldet" />
        </ListItem>
      )}
    </List>
  );
}

AngemeldetList.propTypes = { angemeldet: PropTypes.array.isRequired };

export default AngemeldetList;
