import styled from "styled-components"

const Container =styled.div`
    color: 181D2B;
    z-index: 2;

    .green_button{
        background-color: #00FF00;
        border: 2px solid white;
    }
    .red_button{
        background-color: #F00B1C;
        border: 2px solid white;
    }
    .blue_button{
        background-color: #627FFF;
        border: 2px solid white;
    }
    .pink_button{
        background-color: #D659E5;
        border: 2px solid white;
    }

`

function WildCardPopUp({playerTurn, setPlayerTurn, clockWise, displayWildCard, playedCardsState}){
    
    function resetWildCardPopUp(){
        displayWildCard(false)
    }

    const GreenCard = {"emblem": "thief_0", "value": "0"} 
    const RedCard =  {"emblem": "illusionist_0", "value": "0"}
    const BlueCard = { "emblem": "bard_0", "value": "0"}
    const PinkCard = { "emblem": "druid_0", "value": "0"}
    
    
    function setPlayedCardGreen(){
        playedCardsState.unshift(GreenCard)

        if ("player_1" === playerTurn && clockWise === true){
            setPlayerTurn("player_2")
            return}
        if ("player_1" === playerTurn && clockWise === false){
            setPlayerTurn("player_4")
            return}
        if ("player_2" === playerTurn && clockWise === true){
            setPlayerTurn("player_3")
            return}
        if ("player_2" === playerTurn && clockWise === false){
            setPlayerTurn("player_1")
            return}
        if ("player_3" === playerTurn && clockWise === true){
            setPlayerTurn("player_4")
            return}
        if ("player_3" === playerTurn && clockWise === false){
            setPlayerTurn("player_2")
            return}
        if ("player_4" === playerTurn && clockWise === true){
            setPlayerTurn("player_1")
            return}
        if ("player_4" === playerTurn && clockWise === false){
            setPlayerTurn("player_3")
            return}
        

    }
    function setPlayedCardStateRed(){
        playedCardsState.unshift(RedCard)

        if ("player_1" === playerTurn && clockWise === true){
            setPlayerTurn("player_2")
            return}
        if ("player_1" === playerTurn && clockWise === false){
            setPlayerTurn("player_4")
            return}
        if ("player_2" === playerTurn && clockWise === true){
            setPlayerTurn("player_3")
            return}
        if ("player_2" === playerTurn && clockWise === false){
            setPlayerTurn("player_1")
            return}
        if ("player_3" === playerTurn && clockWise === true){
            setPlayerTurn("player_4")
            return}
        if ("player_3" === playerTurn && clockWise === false){
            setPlayerTurn("player_2")
            return}
        if ("player_4" === playerTurn && clockWise === true){
            setPlayerTurn("player_1")
            return}
        if ("player_4" === playerTurn && clockWise === false){
            setPlayerTurn("player_3")
            return}
    }

    function setPlayedCardStateBlue(){
        playedCardsState.unshift(BlueCard)

        if ("player_1" === playerTurn && clockWise === true){
            setPlayerTurn("player_2")
            return}
        if ("player_1" === playerTurn && clockWise === false){
            setPlayerTurn("player_4")
            return}
        if ("player_2" === playerTurn && clockWise === true){
            setPlayerTurn("player_3")
            return}
        if ("player_2" === playerTurn && clockWise === false){
            setPlayerTurn("player_1")
            return}
        if ("player_3" === playerTurn && clockWise === true){
            setPlayerTurn("player_4")
            return}
        if ("player_3" === playerTurn && clockWise === false){
            setPlayerTurn("player_2")
            return}
        if ("player_4" === playerTurn && clockWise === true){
            setPlayerTurn("player_1")
            return}
        if ("player_4" === playerTurn && clockWise === false){
            setPlayerTurn("player_3")
            return}
    }
    function setPlayedCardStatePink(){
        playedCardsState.unshift(PinkCard)

        if ("player_1" === playerTurn && clockWise === true){
            setPlayerTurn("player_2")
            return}
        if ("player_1" === playerTurn && clockWise === false){
            setPlayerTurn("player_4")
            return}
        if ("player_2" === playerTurn && clockWise === true){
            setPlayerTurn("player_3")
            return}
        if ("player_2" === playerTurn && clockWise === false){
            setPlayerTurn("player_1")
            return}
        if ("player_3" === playerTurn && clockWise === true){
            setPlayerTurn("player_4")
            return}
        if ("player_3" === playerTurn && clockWise === false){
            setPlayerTurn("player_2")
            return}
        if ("player_4" === playerTurn && clockWise === true){
            setPlayerTurn("player_1")
            return}
        if ("player_4" === playerTurn && clockWise === false){
            setPlayerTurn("player_3")
            return}

    }
    
    return (
        <Container>
                <h4> Choose the Next Color: </h4>
                <button className="green_button" onClick={()=> {resetWildCardPopUp(); setPlayedCardGreen()} }> GREEN </button>
                <button className="red_button" onClick={()=> {resetWildCardPopUp(); setPlayedCardStateRed() } }> RED </button> 
                <button className="blue_button" onClick={()=> {resetWildCardPopUp(); setPlayedCardStateBlue() } }> BLUE </button> 
                <button className="pink_button" onClick={()=> {resetWildCardPopUp(); setPlayedCardStatePink() } }> PINK </button> 
        </Container>
    )
}
export default WildCardPopUp;