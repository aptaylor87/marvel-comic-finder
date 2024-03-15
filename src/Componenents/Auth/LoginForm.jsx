import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({login}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    let result = await login(formData);
    if (result.success) {
      navigate("/search", {replace: true});
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
      marginTop="15px"
      minWidth="70%"
      component="form"
      sx={{
        "& .MuiTextField-root": {m: 1, width: "25ch"},
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5">Log In</Typography>
      <TextField
        required
        id="username"
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        required
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      {formErrors.length ? <Alert severity="error">{formErrors}</Alert> : null}

      <Button type="submit" variant="contained">
        Log in
      </Button>
    </Box>
  );
}

export default LoginForm;
