import Player1_Card from "./Player1_Card"
import styled from "styled-components";


const Container=styled.div`
    .myCards{
        overflow:auto;
    }
`
function PlayerHand({ completeDeck={completeDeck}, 
    player1Turn, 
    player1Skip, 
    player1HandleReverse, 
    displayCard,
    myHandState,
    player1Add2, 
    draw4WildPlayer1,
    puttingDownCardsP1,
    player1WildCard,
    playerTurn
}){

    
    
return(
    <Container>
        <h2> Player 1 </h2>

        <div className="myCards">
            <Player1_Card 
                onClick={myHandState} 
                card={completeDeck} 
                displayCard={displayCard} 
                myHandState={myHandState} 
                player1Turn={player1Turn}  
                player1Skip={player1Skip}
                player1HandleReverse={player1HandleReverse} 
                player1Add2={player1Add2}
                draw4WildPlayer1={draw4WildPlayer1}
                puttingDownCardsP1={puttingDownCardsP1}
                player1WildCard={player1WildCard} 
                playerTurn={playerTurn}/>
        </div>
    </Container>
)
}

export default PlayerHand;