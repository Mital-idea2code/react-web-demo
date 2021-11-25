import React from "react";
import logo from "./assets/b1.jpg";
import about from "./assets/about.gif";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Services from "./Services";
import { Button } from "@material-ui/core";
import Team from "./Team";
import GoogleMapReact from "google-map-react";
import Input from "./Input";
import Footer from "./Footer";
import ScrollButton from "./ScrollButton";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Body() {
  const defaultProps = {
    center: {
      lat: 21.196102,
      lng: 72.815766,
    },
    zoom: 11,
  };

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: 21.196102, lng: 72.815766 },
      map,
      title: "Office No 603, Subh Square, Lal Darwaja, Patel Vadi, Surat",
    });
    return marker;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <BodyContainer>
      <LogoContainer>
        <div>
          <Slider {...settings}>
            <div>
              <img src={logo} alt="Logo" className="slideImg" />
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <img src={logo} alt="Logo" className="slideImg" />
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <img src={logo} alt="Logo" className="slideImg" />
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>

        {/* <img src={logo} alt="Logo" className="slideImg" /> */}
      </LogoContainer>

      <Container>
        <AboutContainer name="about_us">
          <HeadingDiv>
            <HeadingTag>About Us</HeadingTag>
            <Subheading>
              {" "}
              This template is ready to use, so you don't need to change
              anything at a component level, unless you want to customize the
              default
            </Subheading>
          </HeadingDiv>
          <Grid container spacing={3}>
            <Grid item md={6} className="textCenter">
              <img src={about} alt="Logo" className="slideImg" />
            </Grid>
            <Grid item md={6}>
              <Paratag>
                <FirstLetter>T</FirstLetter>his template is ready to use, so you
                don't need to change anything at a component level, unless you
                want to customize the default styling.
              </Paratag>
              <Paratag>
                This template is ready to use, so you don't need to change
                anything at a component level, unless you want to customize the
                default styling.This template is ready to use, so you don't need
                to change anything at a component level, unless you want to
                customize the default styling.
              </Paratag>
              <Paratag>
                This template is ready to use, so you don't need to change
                anything at a component level, unless you want to customize the
                default styling.This template is ready to use, so you don't need
                to change anything at a component level, unless you want to
                customize the default styling.
              </Paratag>
              <Button variant="contained" className="btnStyle">
                Read More >>
              </Button>
            </Grid>
          </Grid>
        </AboutContainer>
        <ServiceContainer name="services">
          <HeadingDiv>
            <HeadingTag>Our Services</HeadingTag>
            <Subheading>
              {" "}
              This template is ready to use, so you don't need to change
              anything at a component level, unless you want to customize the
              default
            </Subheading>
          </HeadingDiv>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Services />
            </Grid>
            <Grid item md={3}>
              <Services />
            </Grid>
            <Grid item md={3}>
              <Services />
            </Grid>
            <Grid item md={3}>
              <Services />
            </Grid>
          </Grid>
        </ServiceContainer>
      </Container>
      <CounterContainer>
        <HeadingDiv>
          <HeadingWhiteTag>Become a Partner</HeadingWhiteTag>
          <SubheadingWhite>
            {" "}
            This template is ready to use, so you don't need to change anything
            at a component level, unless you want to customize the default
          </SubheadingWhite>
        </HeadingDiv>
        <Button variant="contained" className="btnWhiteStyle">
          Contact Us >>
        </Button>
      </CounterContainer>
      <Container>
        <TeamContainer name="team">
          <HeadingDiv>
            <HeadingTag>Our Team</HeadingTag>
            <Subheading>
              {" "}
              This template is ready to use, so you don't need to change
              anything at a component level, unless you want to customize the
              default
            </Subheading>
          </HeadingDiv>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Team />
            </Grid>
            <Grid item md={4}>
              <Team />
            </Grid>
            <Grid item md={4}>
              <Team />
            </Grid>
          </Grid>
        </TeamContainer>
        <ContactContainer name="contact_us">
          <Grid container>
            <Grid item md={4} className="contact_box">
              <HeadingDiv>
                <HeadingTag>Contact Us</HeadingTag>
                <Subheading>
                  {" "}
                  This template is ready to use, so you don't need to change
                  anything at a component
                </Subheading>
              </HeadingDiv>
              <Form>
                <Input placeholder="Full Name" />
                <Input type="email" placeholder="Email" />
                <Input placeholder="Subject" />
                <Input type="textarea" placeholder="message" />
                <button>Submit</button>
              </Form>
            </Grid>
            <Grid item md={8}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAlguTXtDLdzz5mUk8KbujxOZrKEYfoy4E",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              ></GoogleMapReact>
            </Grid>
          </Grid>
        </ContactContainer>
      </Container>
      <Footer />
      <ScrollButton />
    </BodyContainer>
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
    max-width: 400px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #11c5b4;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;
const AnyReactComponent = styled.div`
  width: 100%;
  height: 100%;
`;
const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const HeadingTag = styled.h1`
  color: #11c5b4;
  text-align: center;
  padding-bottom: 5px;
  display: table-cell;

  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px #11c5b4;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }
`;

const HeadingWhiteTag = styled.h1`
  color: #fff;
  text-align: center;
  padding-bottom: 5px;
  display: table-cell;

  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px #fff;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }
`;

const Subheading = styled.p`
  color: grey;
  text-align: center;
  max-width: 800px;
  margin: auto;
  margin-bottom: 40px;
  line-height: 20px;
  letter-spacing: 2px;
`;

const SubheadingWhite = styled.p`
  color: #fff;
  text-align: center;
  max-width: 800px;
  margin: auto;
  margin-bottom: 10px;
  line-height: 20px;
  letter-spacing: 2px;
`;

const AboutContainer = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
`;

const ServiceContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const HeadingDiv = styled.div`
  text-align: -webkit-center;
  margin: 20px;
`;

const Paratag = styled.p`
  text-align: justify;
  color: grey;
  line-height: 20px;
  letter-spacing: 2px;
  margin-top: 40px;
`;

const FirstLetter = styled.p`
  background-color: #11c5b4;
  color: white;
  padding: 15px 20px;
  text-align: center;
  border-radius: 50%;
  display: initial;
  line-height: 40px;
`;

const CounterContainer = styled.div`
  background-color: #11c5b4;
  min-height: 200px;
  padding: 10px !important;
  margin-top: 60px;
  margin-bottom: 60px;
  text-align: center;
`;

const TeamContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
`;

const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;
