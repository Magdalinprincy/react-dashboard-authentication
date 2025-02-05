import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../redux/userSlice';

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.user.userData);

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    userId: '',
  });

  const [previousData, setPreviousData] = useState({
    email: '',
    phone: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userData')) || storedUser;
    if (savedData && savedData.userId) {
      setPreviousData({
        email: savedData.email,
        phone: savedData.phone,
      });
    } else {
      const newUserId = `user-${Date.now()}`;
      setInitialValues((prev) => ({
        ...prev,
        userId: newUserId,
      }));
    }
  }, [storedUser]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    
    const isEmailChanged = values.email !== previousData.email;
    const isPhoneChanged = values.phone !== previousData.phone;
    
    // Check if the email and phone combination already exists
    if (!isEmailChanged && !isPhoneChanged && previousData.email && previousData.phone) {
      console.log('User data already exists:', {
        email: values.email,
        phone: values.phone
      });
      setSnackbarMessage('User data already exists!');
      setOpenSnackbar(true);
      setSubmitting(false);
      // Clear form after showing the message
      resetForm();
      return;
    }

    let newUserId = values.userId;
    // Generate new userID if either email or phone (or both) have changed
    if (isEmailChanged || isPhoneChanged) {
      newUserId = `user-${Date.now()}`;
      console.log('UserID changed because:', {
        emailChanged: isEmailChanged,
        phoneChanged: isPhoneChanged,
        oldUserId: values.userId,
        newUserId: newUserId
      });
    }

    const userData = { ...values, userId: newUserId };
    
    // Update previous data for next comparison
    setPreviousData({
      email: values.email,
      phone: values.phone,
    });

    dispatch(saveUserData(userData));
    localStorage.setItem('userData', JSON.stringify(userData));

    // Clear form and show success message
    resetForm();
    setFieldsToEmpty();
    setUnsavedChanges(false);
    setSnackbarMessage('User data submitted successfully!');
    setOpenSnackbar(true);
    setSubmitting(false);
  };

  // Function to explicitly set fields to empty
  const setFieldsToEmpty = () => {
    setInitialValues({
      name: '',
      address: '',
      email: '',
      phone: '',
      userId: `user-${Date.now()}`,
    });
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: 'rgb(247, 241, 220)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {['name', 'address', 'email', 'phone'].map((field) => (
              <div key={field} style={{ textAlign: 'center' }}>
                <TextField
                  name={field}
                  value={values[field]}
                  onChange={(e) => {
                    setFieldValue(field, e.target.value);
                    setUnsavedChanges(true);
                  }}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  sx={{
                    fontSize: '18px',
                    fontFamily: 'Afacad, sans-serif',
                    width: '250px',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    '& input': {
                      textAlign: 'center',
                      fontSize: '18px',
                      fontFamily: 'Afacad, sans-serif',
                      color: 'rgb(43, 15, 128)',
                      padding: '12px',
                    },
                    '& .MuiInputBase-root': {
                      borderBottom: '1px solid rgb(58, 31, 140)',
                    },
                  }}
                />
                {errors[field] && touched[field] && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {errors[field]}
                  </div>
                )}
              </div>
            ))}
            <Button
              type="submit"
              sx={{
                backgroundColor: 'rgb(58, 31, 140)',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'Afacad, sans-serif',
                padding: '2px 20px',
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'rgb(58, 31, 140)',
                  border: '2px solid rgb(58, 31, 140)',
                },
                transition: 'background-color 0.3s ease, color 0.3s ease',
                marginTop: '20px',
              }}
            >
              Save
            </Button>
          </form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default UserForm;

