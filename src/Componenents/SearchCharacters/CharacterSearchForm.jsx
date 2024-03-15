import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";

// import {CircularProgress} from "@mui/material";
import BackendAPI from "../../api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";


/** Search widget.
 *
 * Appears on Search within character boxes. Runs an Autocomplete that 
 *
 * This form just sets the search characters in state, which updates the character box to show a character card instead. 
 *
 * { Search } -> CharacterSearchForm
 */

function CharacterSearchForm( { options,  setChar } ) {

    const [selectedCharacter, setSelectedCharacter] = useState(null);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here
        setChar(selectedCharacter.id)

      };

      const handleKeyPress = (event) => {
        if (event.key === "Enter" && selectedOption !== null) {
          handleSubmit();
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
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          onSubmit={handleSubmit}
        >
            <Card sx={{maxWidth: 345}}>
        <Autocomplete
          disablePortal
          id="charselect"
          options={options}
          sx={{width: 300}}
          value={selectedCharacter}
          onChange={(event, newValue) => {
            setSelectedCharacter(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Character" onKeyPress={handleKeyPress}  />}
        />
        <Button type="submit" variant="contained">Add</Button>
        </Card>
      </Box>
    );
  }
  
  export default CharacterSearchForm;