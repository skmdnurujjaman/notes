/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   isLoggedIn();
  // }, []);

  // const isLoggedIn = () => {
  //   let userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/mynotes");
  //   }
  // };
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro">
            <div>
              <h1 className="title">Welcome to Notes</h1>
              <p className="subtitle">One safe place for all your notes</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingButton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="landingButton" variant="info">
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
