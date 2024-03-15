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
      marginTop="50px"
      minWidth="70%"
      sx={{ textAlign: 'center' }}
    >
      <Typography variant="h3" marginBottom="20px">Marvel Comic Finder</Typography> {/* Added marginBottom */}
      <Typography variant="body1" marginBottom="20px"> {/* Added marginBottom */}
        Welcome! Check out to the search function in the upper navigation to see
        what this application is all about. You'll be able to pick two
        characters from Marvel comics and see a list of all comics featuring
        both. Create an account to add comics to your own reading list.
      </Typography>
      {currentUser ? (
        <Typography variant="body1" marginBottom="20px"> {/* Added marginBottom */}
          Welcome back {currentUser.username}!
        </Typography>
      ) : (
        <Box display="flex" flexDirection="row" marginTop="30px">
          <Button
            component={Link}
            to="/login"
            variant="contained"
            style={{ marginRight: "8px" }}
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
