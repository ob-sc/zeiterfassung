import PropTypes from 'prop-types';
import { FiChevronRight } from 'react-icons/fi';
import { Box, IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import useHomeContext from '../../../context/HomeContext';
import yup from '../../../validation/yup';
import useCommonStyles from '../../../styles/common';
import { useCreateAnmeldung } from '../../../api/useAngemeldet';
import { nowTimeString } from '../../../util/stringUtil';
import AhAutocomplete from '../../../components/AhAutocomplete';
import TimeInput from '../../../components/TimeInput';
import { Formik } from 'formik';

function AControl({ aushilfen, handleSelection }) {
  const common = useCommonStyles();
  const postMutation = useCreateAnmeldung();

  const { state, updateAngemeldet } = useHomeContext();

  const init = {
    ahid: state?.selected?.id ?? null,
    date: format(new Date(), 'yyyy-MM-dd'),
    start: nowTimeString,
  };

  const validationSchema = yup.object().shape({
    ahid: yup.number().required(),
    date: yup.date().required(),
    start: yup.string().required(),
  });

  return (
    <Formik
      initialValues={init}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        postMutation.mutate(values, {
          onSuccess: () => {
            setSubmitting(false);
            updateAngemeldet(true);
          },
        });
      }}
    >
      {(props) => (
        <Box className={common.flexRowCenterStartWrap} clone>
          <form onSubmit={props.handleSubmit}>
            <Box m={1} p={1} className={common.mdItem}>
              <AhAutocomplete
                name="ahid"
                aushilfen={aushilfen}
                handleSelection={handleSelection}
                formik={props}
              />
            </Box>
            <Box m={1} p={1}>
              <TimeInput
                label="Beginn"
                name="start"
                value={props.values.start}
                onChange={props.handleChange}
                error={props.touched.start && !!props.errors.start}
                helperText={props.touched.start && props.errors.start}
              />
            </Box>
            <Box m={1} p={1}>
              <IconButton
                type="submit"
                edge="start"
                color="inherit"
                className={common.iconButton}
                disabled={
                  props.isSubmitting ||
                  state.angemeldet ||
                  state.selected === null
                }
              >
                <FiChevronRight />
              </IconButton>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
}

AControl.propTypes = {
  aushilfen: PropTypes.object.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default AControl;
