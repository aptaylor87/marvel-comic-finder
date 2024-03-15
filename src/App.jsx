import {useState, useEffect} from "react";

import NavBar from "./Routing/NavBar";
import MarvelRoutes from "./Routing/MarvelRoutes";
import BackendAPI from "./api";

import UserContext from "./Componenents/Auth/UserContext";
import {jwtDecode} from "jwt-decode";
import useLocalStorage from "./Hooks/useLocalStorage";

import Container from "@mui/material/Container";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "marvel-token";

/** Marvel Comic Finder application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API.  This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for some API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          // put the token on the Api class so it can use it to call the API.
          BackendAPI.token = token;
          let currentUser = await BackendAPI.getCurrentUser(username);
          setCurrentUser(currentUser);
          // setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   *
   */
  async function signup(signupData) {
    try {
      let token = await BackendAPI.signup(signupData);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("signup failed", errors);
      return {success: false, errors};
    }
  }

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function login(loginData) {
    try {
      let token = await BackendAPI.login(loginData);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("login failed", errors);
      return {success: false, errors};
    }
  }

  return (
    <Container>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser}}>
        <NavBar logout={ logout } />
        <MarvelRoutes signup={signup} login={login}> </MarvelRoutes>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
