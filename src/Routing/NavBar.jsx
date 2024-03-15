import React, {useContext} from "react";
import {Link as RouterLink} from "react-router-dom";
import UserContext from "../Componenents/Auth/UserContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <>
        <Button component={RouterLink} to="/search" color="inherit">
          Search
        </Button>
        <Button component={RouterLink} to="/readinglist" color="inherit">
          Reading List
        </Button>
        <Button component={RouterLink} to="/" color="inherit" onClick={logout}>
          Logout
        </Button>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <Button component={RouterLink} to="/search" color="inherit">
          Search
        </Button>
        <Button component={RouterLink} to="/login" color="inherit">
          Login
        </Button>
        <Button component={RouterLink} to="/signup" color="inherit">
          Sign up
        </Button>
      </>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none' }} color="inherit">
          Marvel Comic Finder
        </Typography>

        {currentUser ? loggedInNav() : loggedOutNav()}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
