import { Routes, Route } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { Switch } from "react-dom";
import "./App.css";
import "./index.css"
import styled from "styled-components";
import Footer from "./components/footer";
import GameTablesList from "./components/Game_tables_list";
import UserInfo from "./components/User_information";
import ActiveGame from "./components/Active_Game_Table";
import React from "react";
import { useState, useEffect } from "react";

const Container = styled.div``;

function App() {
  let navigate=useNavigate()

  return (
    <Container>
      <div className="header-first">
      <img
          src="https://media.istockphoto.com/vectors/abstract-vaporwave-cube-background-vector-id1011629528?k=20&m=1011629528&s=612x612&w=0&h=oZg2mmr_wVTxBdkVeVrHfYNbyiyUpSnu6OvyjQmIYVQ="
          alt="LOGO"
        />
      </div>
        <h1 className="main-title">Welcome to Um!</h1>
        <h2> A game of skill, luck, and patience.</h2>
        <button onCLick={navigate('/game')}> Start </button>
      <Routes>
        <Route path="/games" element={<GameTablesList />}></Route>
        <Route path="/user" element={<UserInfo />}></Route>
        <Route path="/game" element={<ActiveGame />}></Route>
      </Routes>
      <Footer/>
    </Container>
  );
}

export default App;
