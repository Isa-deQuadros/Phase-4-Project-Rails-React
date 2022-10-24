import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css"
import styled from "styled-components";
import LandingPage from "./components/Landing_page";
import GameTablesList from "./components/Game_tables_list";
import UserInfo from "./components/User_information";
import ActiveGame from "./components/Active_Game_Table";

const Container = styled.div``;

function App(){

  return (
    <Container>
      <Routes>
        < Route path="/" element={<LandingPage />}></Route>
        <Route path="/games" element={<GameTablesList />}></Route>
        <Route path="/user" element={<UserInfo />}></Route>
        <Route path="/game" element={<ActiveGame />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
