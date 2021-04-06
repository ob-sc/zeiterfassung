import PropTypes from 'prop-types';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Box, IconButton } from '@material-ui/core';
import { Formik } from 'formik';
import { format } from 'date-fns';
import useHomeContext from '../../../context/HomeContext';
import yup from '../../../validation/yup';
import useCommonStyles from '../../../styles/common';
import { useCreateAnmeldung } from '../../../api/useAngemeldet';
import { nowTimeString } from '../../../util/stringUtil';
import AhAutocomplete from '../../../components/AhAutocomplete';
import TimeInput from '../../../components/TimeInput';

function AControl({ aushilfen, handleSelection }) {
  const common = useCommonStyles();
  const anmelden = useCreateAnmeldung();

  const { state, updateAngemeldet } = useHomeContext();

  const init = {
    ahid: state.selected?.id ?? null,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: nowTimeString,
  };

  // eintragen hier als nicht required?
  const validationSchema = yup.object().shape({
    ahid: yup.number().required(),
    date: yup.date().required(),
    time: yup.string().required('Zeit angeben'),
  });

  // 2x flexRowCenterStartWrap damit time und submit gleichen breakpoint haben
  return (
    <Formik
      initialValues={init}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { ahid, date, time } = values;
        const anmeldung = { ahid, date, start: time };
        anmelden.mutate(anmeldung, {
          onSuccess: () => {
            setSubmitting(false);
            updateAngemeldet(true);
          },
        });
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box className={common.flexRowCenterStartWrap}>
            <Box m={1} p={1} className={common.lgItem}>
              <AhAutocomplete
                name="ahid"
                aushilfen={aushilfen}
                handleSelection={handleSelection}
                formik={props}
              />
            </Box>
            <Box className={common.flexRowCenterStartWrap}>
              <Box m={1} p={1}>
                <TimeInput
                  label="Beginn"
                  name="time"
                  value={props.values.time}
                  onChange={props.handleChange}
                  error={props.touched.time && !!props.errors.time}
                  helperText={props.touched.time && props.errors.time}
                />
              </Box>
              <Box m={1} p={1} width={40}>
                <IconButton
                  type="submit"
                  edge="start"
                  color="inherit"
                  className={common.iconButton}
                  disabled={props.isSubmitting || state.selected === null}
                >
                  {state.angemeldet ? <FiLogOut /> : <FiLogIn />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
}

AControl.propTypes = {
  aushilfen: PropTypes.object.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default AControl;
