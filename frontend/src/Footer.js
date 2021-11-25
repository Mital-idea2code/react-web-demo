import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { SocialIcon } from "react-social-icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RoomIcon from "@material-ui/icons/Room";
import { Phone } from "@material-ui/icons";
import Input from "./Input";
import logo from "./assets/wlogo1.png";
import Scroll from "react-scroll";
const Link = Scroll.Link;

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        {" "}
        <Grid container spacing={4}>
          <Grid item md={3} className="textCenter">
            <img src={logo} alt="Logo" className="slideImg" />
          </Grid>
          <Grid item md={3} className="textCenter w_100">
            <FooterHeading>Quick Link</FooterHeading>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItemLink href="#" className="footer_link">
                <Link
                  activeClass="active"
                  to="about_us"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="textCenter"
                >
                  About Us
                </Link>
              </ListItemLink>
              <ListItemLink href="#" className="footer_link">
                <Link
                  activeClass="active"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="textCenter"
                >
                  Services
                </Link>
              </ListItemLink>
              <ListItemLink href="#" className="footer_link">
                <Link
                  activeClass="active"
                  to="team"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="textCenter"
                >
                  Team
                </Link>
              </ListItemLink>
              <ListItemLink href="#" className="footer_link">
                <Link
                  activeClass="active"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="textCenter"
                >
                  Contact Us
                </Link>
              </ListItemLink>
            </List>
          </Grid>
          <Grid item md={3} className="textCenter">
            <FooterHeading className="textCenter">Reach Us</FooterHeading>
            <FooterAddress className="textCenter">
              <RoomIcon />
              Office No 603, Subh Square, Lal Darwaja, Patel Vadi, Surat,
              Gujarat 395004
            </FooterAddress>
            <FooterSocial>
              <SocialIcon
                className="fs_icon"
                bgColor="#fff"
                url="https://facebook.com/jaketrent"
                network="facebook"
              />
              <SocialIcon
                className="fs_icon"
                bgColor="#fff"
                url="https://twitter.com/jaketrent"
                network="twitter"
              />
              <SocialIcon
                className="fs_icon"
                bgColor="#fff"
                url="https://linkedin.com/in/jaketrent"
                network="linkedin"
              />
              <SocialIcon
                className="fs_icon"
                bgColor="#fff"
                url="https://instagram.com/in/jaketrent"
                network="instagram"
              />
              <SocialIcon
                className="fs_icon"
                bgColor="#fff"
                url="https://google.com/in/jaketrent"
                network="google"
              />
            </FooterSocial>
          </Grid>
          <Grid item md={3} className="textCenter w_100">
            <FooterHeading className="textCenter">Subscribe Us</FooterHeading>
            <Form>
              <Input type="email" placeholder="Enter Your Email Address" />
              <button>Send</button>
            </Form>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
}
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    margin-bottom: 2rem;
  }
  button {
    width: 100%;
    max-width: 150px;
    min-width: 150px;
    height: 40px;
    border: none;
    margin: 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #fff;
    color: #11c5b4;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const FooterContainer = styled.div`
  background-color: #11c5b4;
  min-height: 150px;
  margin-top: 60px;
  padding: 30px 0px 0px 0px;
  color: #fff;
`;

const FooterSocial = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const FooterHeading = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const FooterAddress = styled.div`
  display: flex;
`;

const Footerphone = styled.div`
  margin-top: 10px;
  display: flex;
`;
