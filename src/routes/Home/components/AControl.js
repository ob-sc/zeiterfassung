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
import useForm from '../../../hooks/useForm';

function AControl({ aushilfen, state, handleSelection }) {
  const [selectedAh] = state;
  const common = useCommonStyles();
  const postMutation = useCreateAnmeldung();
  const [beginn, setBeginn] = useState(nowTimeString);

  const init = {
    ahid: selectedAh?.id ?? null,
    start: beginn,
  };

  const schema = yup.object().shape({
    ahid: yup.number().min(0).required(),
    date: yup.date().required(),
    start: yup.string().required(),
  });

  const handleAnmeldung = (ahid, start) => {
    const date = format(new Date(), 'yyyy-MM-dd');
    const values = {
      ahid,
      date,
      start,
    };

    postMutation.mutate(values);
  };

  const formik = useForm(init, postMutation, schema);

  return (
    <Box className={common.flexRowCenterStartWrap}>
      <Box m={1} p={1} className={common.mdItem}>
        <AhAutocomplete
          name="ahid"
          aushilfen={aushilfen}
          state={state}
          handleSelection={handleSelection}
          formik={formik}
        />
      </Box>
      <Box m={1} p={1}>
        <TimeInput
          beginn={beginn}
          setBeginn={setBeginn}
          label="Beginn"
          name="start"
        />
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
