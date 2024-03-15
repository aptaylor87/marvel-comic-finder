import React, {useState, useEffect, useContext} from "react";
import {useParams, Link} from "react-router-dom";

import ComicsList from "./ComicsList";

import Box from "@mui/material/Box";
import UserContext from "../Auth/UserContext";

import {CircularProgress} from "@mui/material";
import BackendAPI from "../../api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function SearchResults() {
  const {charOneId, charTwoId, offset} = useParams();

  const [comics, setComics] = useState(null);

  const {currentUser} = useContext(UserContext);

  function showPrevButton() {
    if (!comics) {
        return <CircularProgress />
      }
    let prevLink = `/comics/search/${charOneId}/${charTwoId}/${
        Number(offset) - 20
      }`;

    return (
        <Link to={prevLink}>
          <Button type="submit" variant="contained">
            Previous
          </Button>
        </Link>
    )
  }

  function showForwardButton() {
    let forwardLink = `/comics/search/${charOneId}/${charTwoId}/${
        Number(offset) + 20
      }`;

    return (
        <Link to={forwardLink}>
          <Button type="submit" variant="contained">
            Forward
          </Button>
        </Link>
    )
  }

  useEffect(() => {
    async function getComics() {
      let comics = await BackendAPI.searchComics(charOneId, charTwoId, offset);
      setComics(comics);
    }
    getComics();
  }, [offset]);

  return (
    <>
      <ComicsList comics={comics} />
      {offset > 0 ? showPrevButton() : null}
      {showForwardButton()}
    </>
  );
}

export default SearchResults;