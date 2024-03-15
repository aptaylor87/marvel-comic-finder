import React, {useState, useEffect, useContext} from "react";

import ComicsList from "./ComicsList";
import UserContext from "../Auth/UserContext";

import Box from "@mui/material/Box";

// import {CircularProgress} from "@mui/material";
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
import {CircularProgress} from "@mui/material";


/**Reading List.
 *
 * Routed at /readinglist
 * 
 * Gets a list of the comics on the current user's reading list through the backend API.
 * 
 * Renders ComicsList and Comic Card to generate the list. 
 * 
 * 
 * 
 */

function ReadingList() {
    const [comics, setComics] = useState(null);
    const { currentUser } = useContext(UserContext);
  
    useEffect(() => {
      // Check if currentUser exists before accessing its properties
      if (currentUser && currentUser.username) {
        async function getComics() {
          let comics = await BackendAPI.getComics(currentUser.username);
          setComics(comics);
        }
        getComics();
      }
    }, [currentUser]); // Include currentUser in the dependency array to trigger effect when it changes
  
    // If currentUser or currentUser.username is null or undefined, render loading indicator
    if (!currentUser || !currentUser.username) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="auto"
          marginTop="15px"
          width="70%"
        >
          <CircularProgress />
        </Box>
      );
    }
  
    // Render ComicsList component with comics data
    return <ComicsList comics={comics} />;
  }

export default ReadingList;
