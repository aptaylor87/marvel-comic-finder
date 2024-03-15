import React, {useState, useEffect, useContext} from "react";
import UserContext from "../Auth/UserContext";

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

function ComicCard({ id, name, description, imageURL, imageType }) {
    let image = `${imageURL}/landscape_medium.${imageType}`
    const {currentUser} = useContext(UserContext);
    function buttons() {

        async function addToReadingList() {
            let user = await BackendAPI.addReadingList(currentUser.username, id)
            return;
        }

        if (currentUser && currentUser.comics.includes(id)) {
            return ( 
                <Button disabled size="small">Added to List</Button>
            )
        } else if (currentUser) {
            return (
                <Button size="small" onClick={addToReadingList}>Add to Reading List</Button>
            )
        } else {
            return (
                <Button disabled size="small">Sign in to create reading list</Button>
            )
        }
        
    }
    return (
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="auto"
        marginTop="15px"
        minWidth="70%" 
          
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          
        >
      <Card sx={{maxWidth: 345}}>
        <CardMedia
          sx={{height: 200}}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          {buttons()}
          
        </CardActions>
      </Card>

      </Box>
    );
}

export default ComicCard;