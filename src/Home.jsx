import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "./Componenents/Auth/UserContext";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Home() {
  const {currentUser} = useContext(UserContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
      marginTop="15px"
      minWidth="70%"
    >
      <Typography variant="h5">Marvel Comic finder</Typography>

      <Typography variant="body1">
        Welcome! Navigate to the search function in the upper navigation to see
        what this application is all about. You'll be able to pick two
        characters from Marvel comics and see a list of all comics featuring
        both. Create an account to add comics to your own reading list.
      </Typography>
      {currentUser ? (
        <Typography variant="body1">
          Welcome back {currentUser.username}
        </Typography>
      ) : (
        <Box display="flex">
          <Button
            component={Link}
            to="/login"
            variant="contained"
            style={{marginRight: "8px"}}
          >
            Login
          </Button>
          <Button component={Link} to="/signup" variant="contained">
            Signup
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Home;
