
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import { useSpring, animated } from '@react-spring/web';
// import { useState } from 'react';
// import { ServiceTable } from '../../components/ui';

// const Fade = React.forwardRef(function Fade(props, ref) {
//   const {
//     children,
//     in: open,
//     onClick,
//     onEnter,
//     onExited,
//     ownerState,
//     ...other
//   } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter(null, true);
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited(null, true);
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {React.cloneElement(children, { onClick })}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element.isRequired,
//   in: PropTypes.bool,
//   onClick: PropTypes.any,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
//   ownerState: PropTypes.any,
// };

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function SpringModal() {
//   const [open, setOpen] = useState(false);
//   const [inputValues, setInputValues] = useState({ field1: '', field2: '' });
//   const [errors, setErrors] = useState({ field1: false, field2: false });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues({
//       ...inputValues,
//       [name]: value,
//     });
//   };

//   const handleValidation = () => {
//     let valid = true;
//     let newErrors = { field1: false, field2: false };

//     if (inputValues.field1.trim() === '') {
//       newErrors.field1 = true;
//       valid = false;
//     }

//     if (inputValues.field2.trim() === '') {
//       newErrors.field2 = true;
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async () => {
//     if (handleValidation()) {
//       try {
//         const response = await fetch('/api/create-service', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(inputValues),
//         });

//         if (response.status === 201) {
//           console.log('Service created successfully:', inputValues);
//           handleClose();
//         } else {
//           console.error('Failed to create service:', response.status);
//         }
//       } catch (error) {
//         console.error('Error creating service:', error);
//       }
//     }
//   };

//   return (
//     <>
//       <Button
//         sx={{
//           bgcolor: "rgba(35, 137, 218, 1)",
//           color: "white",
//           '&:hover': { bgcolor: "rgba(35, 137, 218, 1)" },
//           mb: '20px',
//           marginRight: "0"
//         }}
//         onClick={handleOpen}
//       >
//         Add
//       </Button>
//       <Modal
//         aria-labelledby="spring-modal-title"
//         aria-describedby="spring-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             TransitionComponent: Fade,
//           },
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={modalStyle}>
//             <Typography style={{ textAlign: "center" }} id="spring-modal-title" variant="h6" component="h2">
//               Create Service
//             </Typography>
//             <TextField
//               label="Field 1"
//               name="field1"
//               value={inputValues.field1}
//               onChange={handleChange}
//               error={errors.field1}
//               helperText={errors.field1 ? 'Name is required' : ''}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Field 2"
//               name="field2"
//               value={inputValues.field2}
//               onChange={handleChange}
//               error={errors.field2}
//               helperText={errors.field2 ? 'Price is required' : ''}
//               fullWidth
//               margin="normal"
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               fullWidth
//             >
//               Submit
//             </Button>
//           </Box>
//         </Fade>
//       </Modal>
//       <ServiceTable />
//     </>
//   );
// }




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
  const [open, setOpen] = useState(false);
  const [inputValues, setInputValues] = useState({ name: '', price: '' });
  const [errors, setErrors] = useState({ name: false, price: false });

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
    let newErrors = { name: false, price: false };

    if (inputValues.name.trim() === '') {
      newErrors.name = true;
      valid = false;
    }

    if (inputValues.price.trim() === '' || isNaN(inputValues.price)) {
      newErrors.price = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      try {
        const response = await fetch('https://service.olimjanov.uz/v1/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual token
          },
          body: JSON.stringify({
            name: inputValues.name,
            price: parseFloat(inputValues.price),
          }),
        });

        if (response.status === 201) {
          console.log('Service created successfully:', inputValues);
          handleClose();
        } else {
          console.error('Failed to create service:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error creating service:', error);
      }
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
            <Typography style={{ textAlign: "center" }} id="spring-modal-title" variant="h6" component="h2">
              Create Service
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              error={errors.name}
              helperText={errors.name ? 'Name is required' : ''}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={inputValues.price}
              onChange={handleChange}
              error={errors.price}
              helperText={errors.price ? 'Price is required and must be a number' : ''}
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
