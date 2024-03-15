import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";

import {CircularProgress} from "@mui/material";
import { Link } from "react-router-dom";
import BackendAPI from "../../api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import CharacterCard from "./CharacterCard";
import Button from "@mui/material/Button";

/** Shows search page, with two boxes to select characters and then run a search for comics. .
 *
 * On mount, loads characters from API.
 *
 * This is routed to at /search
 *
 * Routes -> { SearchResults }
 */

function Search() {

  const [characters, setCharacters] = useState(null);
  const [options, setOptions] = useState(null);

  // Used in the button that appears once the two characters are chosen. 
  const [searchCharOne, setSearchCharOne] = useState(null)
  const [searchCharTwo, setSearchCharTwo] = useState(null)

  useEffect(() => {
    async function getCharacters() {
      let characters = await BackendAPI.getCharacters();
      let options = [];
      characters.forEach((char) => {
        options.push({label: char.name, id: char.id});
      });
      setOptions(options);
      setCharacters(characters);
    }
    getCharacters();
  }, []);

  if (!characters || !options) return <CircularProgress />

  function showButton() {
    let link = `/comics/search/${searchCharOne}/${searchCharTwo}/0`
    return (
      <Link to={link}>
      <Button type="submit" variant="contained">
        Run Search
      </Button>
    </Link>
    )
  }

  return (
    <Container maxWidth="lg">
      <CharacterCard options={options} character={searchCharOne} setChar={setSearchCharOne} characters={characters} />
      <CharacterCard options={options} character={searchCharTwo} setChar={setSearchCharTwo} characters={characters} />
      {searchCharOne && searchCharTwo ? showButton() : null}

    </Container>
  );
}

export default Search;
