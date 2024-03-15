import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";

// import {CircularProgress} from "@mui/material";
import BackendAPI from "../../api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import CharacterSearchForm from "./CharacterSearchForm";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

/** Character cards.
 *
 *
 * After completing the character search form, the chosen character is set in state which renders this card, replacing the form.
 * 
 * Displays a button to remove the character from state. 
 * 
 * { Search } -> Charactercards
 */

function CharacterCard({options, character, setChar, characters}) {

    function removeChar() {
        setChar(null)
    }
  function showForm() {
    return <CharacterSearchForm options={options} setChar={setChar} />;
  }

  function showCard(cardcharacter, characteroptions) {
    if (!characteroptions) {
        return null;
      }

    let thischar = characteroptions.find(char => char['id'] === cardcharacter)

    let charName = thischar.name
    let charImage = `${thischar.imageURL}/landscape_medium.${thischar.imageType}`
    let charDescription = thischar.description
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="auto"
        marginTop="70px" 
        minWidth="70%"
      >
        <Card sx={{ width: 345, height: 460 }}> {/* Set the height here */}
          <CardMedia sx={{ height: 200 }} image={charImage} title="lizard" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {charName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {charDescription}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={removeChar}>
              Change
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {character ? showCard(character, characters) : showForm()}
    </Container>
  );
}

export default CharacterCard;
