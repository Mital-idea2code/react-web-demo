import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import team from "./assets/team2.jpeg";
import { SocialIcon } from "react-social-icons";
import styled from "styled-components";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "center",
    background: "#8080801a",
  },
  media: {
    height: 140,
  },
  pos: {
    marginBottom: 12,
  },
  card_social: {
    textAlign: "center",
  },
});

export default function Team() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={team}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Team Leader
          </Typography>
        </CardContent>
        <SocialContainer>
          <SocialIcon
            className="s_icon"
            url="https://facebook.com/jaketrent"
            network="facebook"
          />
          <SocialIcon
            className="s_icon"
            url="https://twitter.com/jaketrent"
            network="twitter"
          />
          <SocialIcon
            className="s_icon"
            url="https://linkedin.com/in/jaketrent"
            network="linkedin"
          />
          <SocialIcon
            className="s_icon"
            url="https://instagram.com/in/jaketrent"
            network="instagram"
          />
          <SocialIcon
            className="s_icon"
            url="https://google.com/in/jaketrent"
            network="google"
          />
        </SocialContainer>
      </CardActionArea>
    </Card>
  );
}

const SocialContainer = styled.div`
      text:align:center;
      margin-bottom:20px
`;
