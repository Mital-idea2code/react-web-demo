import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import logo from "./assets/wlogo2.png";
// import logo from "./assets/logo.png";
import Scroll from "react-scroll";
const Link = Scroll.Link;

export default function Header() {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <HeaderContainer>
      <Navbar.Wrapper>
        <Navbar.Logo>
          {" "}
          <img src={logo} alt="Logo" className="header_logo" />
        </Navbar.Logo>

        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          <Navbar.Item>
            <Link
              activeClass="active"
              to="about_us"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="header_link"
            >
              About Us
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link
              activeClass="active"
              to="services"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="header_link"
            >
              Services
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link
              activeClass="active"
              to="team"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="header_link"
            >
              Team
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link
              activeClass="active"
              to="contact_us"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="header_link"
            >
              Contact Us
            </Link>
          </Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
    </HeaderContainer>
  );
}
const Styles = {
  Wrapper: styled.main`
    display: flex;
    background-color: white;
    height: 100vh;
  `,
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 0 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #11c5b4;

    // 40em == 640px
    @media only screen and (max-width: 40em) {
      width: 100vw;
      bottom: 0;
    }
  `,
  Logo: styled.h1``,
  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;

      top: 0;

      margin: 0;
      height: 100%;

      flex-direction: column;

      background-color: #11c5b4;
      padding: 1rem 3rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `,
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 2rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: white;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.6rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.6rem;
    }
  `,
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  background-color: #11c5b4;
  color: white;
`;

const LogoContainer = styled.div`
  margin-right: auto;
  font-size: 150%;
  padding: 0px 16px;
`;

const HeaderTitle = styled.div`
  padding: 16px 16px;
  cursor: pointer;
  vertical-align: middle;
`;
