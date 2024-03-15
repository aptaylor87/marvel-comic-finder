import React, {useState, useEffect} from "react";

import ComicCard from "./ComicCard";

import Box from "@mui/material/Box";

// import {CircularProgress} from "@mui/material";
import BackendAPI from "../../api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

/**Comic List
 *
 * Routed at /readinglist and Search Results
 * 
 * Takes a list of comics from parent routes and renders comic cards for each. 
 * 
 * 
 */


function ComicsList({ comics }) {
    if (!comics) {
        return null; // or display a loading indicator or message
      }
    return(
        <Container maxWidth="md">
    {comics.map((comic) => (
      <ComicCard
        key={comic.id}
        id={comic.id}
        name={comic.name}
        description={comic.description}
        imageURL={comic.imageURL}
        imageType={comic.imageType}
      />
    ))}
  </Container>
    )
   

}

export default ComicsList;
