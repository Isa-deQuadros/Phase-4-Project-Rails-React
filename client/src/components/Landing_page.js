import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  .border{
    border-top-color: #F00B1C; //red
    border-right: #627FFF; // blue
    border-left: #3BE43B; // green
    border-bottom: #D659E5; // pink
    border-radius: 50%;
    border-style: solid;
    border-width: 20px;
    height: 500px;
    margin: 40px 400px;
    position: absolute;
    width: 600px;
  }

  .text{
    align-items: center;
    color: white;
    padding: 180px 0px;
    text-align: center ;
  }
  h1{ font-size: 70px;}
  h2{ font-size: 27px;}
`
const StyledLink = styled(Link)`
  border: 2px solid white;
  border-radius: 25px;
  color: #F00B1C;
  display: flex;
  justify-content: center;
  margin: 10px auto;
  padding: 10px 15px;
  text-decoration: none;
  width: fit-content;
  font-size: 30px;

  &:hover{
    background-color: #3BE43B;
    color: white;
  }
`

function LandingPage() {

  return (
    <Container>
        <div className="border"></div>
        <div className="text" >
          <h1> Welcome to UNO</h1>
          <h2> A game of skill, luck, and patience.</h2>
        </div>
        <StyledLink to="/game"> Start Playing </StyledLink>
    </Container>
  );
}
export default LandingPage;
