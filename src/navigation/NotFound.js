// Imports
import React from 'react';

// UI Inports
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { ROOT } from './routes';

const NotFound = () => {
  return (
    <>
      <Link to={ROOT}>Home</Link>
      <Typography>404: page not found!</Typography>
    </>
  );
};

export default NotFound;
