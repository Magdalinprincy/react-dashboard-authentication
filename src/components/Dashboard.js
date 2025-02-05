import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  // Get user data from Redux store
  const users = useSelector((state) => state.user.userData); // Assuming userData is an array in your Redux store

  // Calculate user count
  const userCount = users.length;

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
        fontFamily: 'Afacad, sans-serif', // Added font family for entire dashboard
      }}
    >

      <Typography
        variant="h6"
        sx={{
          color: 'rgb(58, 31, 140)',
          fontSize: '20px',
          marginBottom: '20px',
          fontFamily: 'Afacad, sans-serif', // Added font family
        }}
      >
        Total Users: {userCount}
      </Typography>

      {/* List of user profiles */}
      <Box
        sx={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'rgb(58, 31, 140)',
            fontSize: '18px',
            marginBottom: '10px',
            fontFamily: 'Afacad, sans-serif', // Added font family
          }}
        >
          User Profiles
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.userId}>
              <ListItemText
                primary={user.name}
                secondary={
                  <>
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone}</div>
                    <div>User ID: {user.userId}</div>
                  </>
                }
                sx={{
                  fontFamily: 'Afacad, sans-serif', // Added font family for user profile details
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
