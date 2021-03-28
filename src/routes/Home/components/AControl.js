import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiChevronRight } from 'react-icons/fi';
import { Box, IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import yup from '../../../validation/yup';
import useCommonStyles from '../../../styles/common';
import { useCreateAnmeldung } from '../../../api/useAngemeldet';
import { nowTimeString } from '../../../util/stringUtil';
import AhAutocomplete from '../../../components/AhAutocomplete';
import TimeInput from '../../../components/TimeInput';
import useToastContext from '../../../context/ToastContext';

const schema = yup.object().shape({
  ahid: yup.number().min(0).required(),
  date: yup.date().required(),
  start: yup.string().required(),
});

function AControl({ aushilfen, state, handleSelection }) {
  const [selectedAh] = state;
  const { addError } = useToastContext();
  const common = useCommonStyles();
  const createMutation = useCreateAnmeldung();
  const [beginn, setBeginn] = useState(nowTimeString);

  const handleAnmeldung = (ahid, start) => {
    const date = format(new Date(), 'yyyy-MM-dd');
    const values = {
      ahid,
      date,
      start,
    };

    schema
      .validate(values)
      .then((valid) => {
        if (valid === true) createMutation.mutate(values);
      })
      .catch((err) => {
        addError({ message: err.errors });
      });
  };

  return (
    <Box className={common.flexRowCenterStartWrap}>
      <Box m={1} p={1} className={common.mdItem}>
        <AhAutocomplete
          aushilfen={aushilfen}
          state={state}
          handleSelection={handleSelection}
        />
      </Box>
      <Box m={1} p={1}>
        <TimeInput beginn={beginn} setBeginn={setBeginn} label="Beginn" />
      </Box>
      <Box m={1} p={1}>
        <IconButton
          edge="start"
          color="inherit"
          className={common.iconButton}
          onClick={() => handleAnmeldung(selectedAh?.data?.id, beginn)}
        >
          <FiChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}

AControl.propTypes = {
  aushilfen: PropTypes.object.isRequired,
  state: PropTypes.array.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default AControl;
