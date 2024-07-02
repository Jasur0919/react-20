import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { ServiceTable } from '../../components/ui';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({ field1: '', field2: '' });
  const [errors, setErrors] = React.useState({ field1: false, field2: false });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleValidation = () => {
    let valid = true;
    let newErrors = { field1: false, field2: false };

    if (inputValues.field1.trim() === '') {
      newErrors.field1 = true;
      valid = false;
    }

    if (inputValues.field2.trim() === '') {
      newErrors.field2 = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Perform submit actions
      console.log('Submitted:', inputValues);
      handleClose();
    }
  };

  return (
    <>
      <Button
        sx={{
          bgcolor: "rgba(35, 137, 218, 1)",
          color: "white",
          '&:hover': { bgcolor: "rgba(35, 137, 218, 1)" },
          mb: '20px',
          marginRight: "0"
        }}
        onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Enter Verification Code
            </Typography>
            <TextField
              label="Field 1"
              name="field1"
              value={inputValues.field1}
              onChange={handleChange}
              error={errors.field1}
              helperText={errors.field1 ? 'Field 1 is required' : ''}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
      <ServiceTable />
    </>
  );
}
