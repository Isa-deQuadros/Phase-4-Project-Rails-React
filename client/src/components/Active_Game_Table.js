import styled from "styled-components";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

import My_Hand from "./My_Hand";
import Other_Player2 from './other_players_hands/Other_Player2'
import Other_Player3 from './other_players_hands/Other_Player3'
import Other_Player4 from './other_players_hands/Other_Player4'
import PlayedCardPile from './PlayedCardPile' 
import WildCardPopUp from './WildCardComponent'
import backOfCard from '../cards/Back_of_Card.png'
import turnDirection from '../cards/clockwise-arrows.png'
import counterDirection from '../cards/counter-arrows.png'



const Container = styled.div`
    color: white;
    background-color: #181D2B;
    h3{ 
        text-align: center;
        font-size: 30px;
    }
    .clockwise-turn-direction{
        height: 430px;
        width: 520px;
        animation-name: spin;
        animation-duration: 7900ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        z-index: 1;
        position: absolute;
        margin: -127px 464px;
        opacity: 30%
    }
    @keyframes spin{
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }
    .counter-turn-direction{
        height: 430px;
        width: 520px;
        animation-name: reverse-spin;
        animation-duration: 7900ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        z-index: 1;
        position: absolute;
        margin: -127px 464px;
        opacity: 30%
    }
    @keyframes reverse-spin{
        from {transform:rotate(0deg);}
        to {transform:rotate(-360deg);}
    }

    button{
        border: 2px solid red;
        border-radius: 25px;
        font-size: 15px;
        height: 25px;
        margin: 0px 30px 0px 30px;
        width: 150px;
        z-index: 2;
    }
    .game-buttons{
        display: flex;
        justify-content: center;
    }

    .top-hands{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 0px 28px;
        height: 300px;
    }
    .player1{
        grid-column: 1;
        overflow:auto;
    }
    .player2{
        grid-column: 3;
        overflow:auto;
    }
    .bottom-hands{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        height: 300px;
        margin: 0px 28px;
    }
    .player3{
        grid-column:3;
        overflow:auto;
    }
    .player4{
        grid-column: 1;
        overflow:auto;
    }
    .deck-titles{
        display: flex;
        justify-content: center;
        z-index: 2;
    }
    h6{
        font-size: 20px;
        margin: 0px 30px;
    }
    .decks{
        display: flex;
        justify-content: center;
        z-index: 2;
    }
    .piles{ 
        margin: 20px 50px;
        z-index: 2;
    }
`
const StyledLink=styled(Link)`
    border: 2px solid red;
    border-radius: 14px;
    color: white;
    display: flex;
    justify-content: center;
    margin: 0px 30px 0px 0px;
    padding: 8px 10px;
    position: absolute;
    right: 30px;
    top: 30px;
    text-decoration: none;
    width: fit-content;
    &:hover{
        background-color: #F00B1C;
        color: black;
    }
`

function ActiveGame(){

    const players = ["player_1", "player_2", "player_3", "player_4"]
    const [playerTurn, setPlayerTurn] = useState(players[0]) 
    const [clockWise, setClockwise]= useState(true)
    const [initialTurn, setInitialTurn] = useState(true)
    const [displayCard, setDisplayCard] = useState(false)
    const [playerState, setPlayerState] = useState(players)
    const [startingCard, setStartingCard] = useState([])

    const [completeDeck, setCompleteDeck] = useState([])
    const [drawingDeckState, setDrawingDeckState] = useState([])
    
    const [playedCards, setPlayedCards] = useState([])
    const thePlayedCardsArray = []
    let Player4Hand =[]
    const [player4HandState, setPlayer4HandState] = useState([Player4Hand])
    let Player3Hand = []
    const [player3HandState, setPlayer3HandState] = useState([Player3Hand])
    let Player2Hand = []
    const [ player2HandState, setPlayer2HandState] = useState([Player2Hand])
    let MyHand = []
    const [myHandState, setMyHandState] = useState(MyHand)
    const [gameInProgress, setGameInProgress] = useState(false)
    const [gameEnd, setGameEnds] = useState(false)
    const [displayWildCard, setDisplayWildCard] = useState(false)
    

    useEffect( ()=>{
        fetch("http://localhost:3000/cards")
        .then(res => res.json())
        .then(data => {setCompleteDeck(data)
                        setDrawingDeckState(data)    
        })
    }, [])

    function startingTheGame(){
    
        const startingCards = drawingDeckState.filter(eachCard=>{
            if (eachCard.value !== "wild" && eachCard.value !== "draw_4")
                return eachCard

        })
    
            setGameInProgress(true)
            const newCard = getARandomCard(startingCards)
            const deckToDrawFrom = startingCards.indexOf(newCard)
            startingCards.splice(deckToDrawFrom, 1)
            setPlayedCards([newCard])
            
    }

    function getARandomCard(arrayOfCards){
        const randomIndex = Math.floor(Math.random()* arrayOfCards.length)
        const randomCard = arrayOfCards[randomIndex]
        return randomCard
    }

    function firstPlayedCard(arrayOfCards){
        const randomIndex = Math.floor(Math.random()* arrayOfCards.length)
        const randomCard = arrayOfCards[randomIndex]
        setPlayedCards( randomCard )
    }


    function startingCardDeck(){
        drawingDeckState.filter(eachCard=>{
            if (eachCard.value !== "wild" || eachCard.value !== "draw_4")
            setStartingCard([eachCard])                
            
    })}
    


        function whenDrawingDeckisZero(){
            if (drawingDeckState < 80)
            setDrawingDeckState([completeDeck])
        }

        // Wild Card Logic

        function player1WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = myHandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
            const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
                myHandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
        }

        function player2WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = player2HandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
            const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
                player2HandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
        }

        function player3WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = player3HandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
            const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
                player3HandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
        }

        function player4WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = player4HandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
            const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
                player4HandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
        
        }

    function draw4WildPlayer1(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
            if ("player_1" === playerTurn && clockWise === true){
            
                setPlayer2HandState([Card1, Card2, Card3, Card4, ...player2HandState])
                return}
        
            if ("player_1" === playerTurn && clockWise === false){
            
                setPlayer4HandState ([Card1, Card2, Card3, Card4, ...player4HandState])
                return}
    }

    function draw4WildPlayer2(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)

        const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete) 
        
            if ("player_2" === playerTurn && clockWise === true){
            
                setPlayer3HandState([Card1, Card2, Card3, Card4, ...player3HandState])

                return}
        if ("player_2" === playerTurn && clockWise === false){
            
            setMyHandState ([Card1, Card2, Card3, Card4, ...myHandState])
            return}
    }

    function draw4WildPlayer3(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        if ("player_3" === playerTurn && clockWise === true){
            
            setPlayer4HandState([Card1, Card2, Card3, Card4, ...player4HandState])
            return}
        if ("player_3" === playerTurn && clockWise === false){
            
            setPlayer2HandState ([Card1, Card2, Card3, Card4, ...player2HandState])
            return}
    }

    function draw4WildPlayer4(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)

        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        if ("player_4" === playerTurn && clockWise === true){
            
            setMyHandState([Card1, Card2, Card3, Card4, ...myHandState])
            return}
        if ("player_4" === playerTurn && clockWise === false){
            
            setPlayer3HandState ([Card1, Card2, Card3, Card4, ...player3HandState])
            return}
    }

    function StartingSevenCards(){ 
    const card1 = getARandomCard(completeDeck)
    const card2 = getARandomCard(completeDeck)
    const card3 = getARandomCard(completeDeck)
    const card4 = getARandomCard(completeDeck)
    const card5 = getARandomCard(completeDeck)
    const card6 = getARandomCard(completeDeck)
    const card7 = getARandomCard(completeDeck)
    
    return([card1, card2, card3, card4, card5, card6, card7])     
    }

    function startingHands(){
        setMyHandState(StartingSevenCards)
        setPlayer2HandState(StartingSevenCards)
        setPlayer3HandState(StartingSevenCards)
        setPlayer4HandState(StartingSevenCards)

        setDisplayCard(true)  
    }

    function addsCardToHand(){
        if (drawingDeckState < 70){ 
            setDrawingDeckState([completeDeck])}
        const newCard = getARandomCard(drawingDeckState)
        const deckToDrawFrom = drawingDeckState.indexOf(newCard)
        drawingDeckState.splice(deckToDrawFrom, 1)

            console.log("DECK TO DRAW FROM:", deckToDrawFrom)
        
        
        if ("player_1" === playerTurn)
            return setMyHandState([newCard, ...myHandState])

        else if ("player_2" === playerTurn)
            return setPlayer2HandState([newCard, ...player2HandState])

        else if ("player_3" === playerTurn)
            return setPlayer3HandState([newCard, ...player3HandState])

        else if ("player_4" === playerTurn)
            return setPlayer4HandState([newCard, ...player4HandState])
    }

    // Player Turn Logic & Card Logic for number cards

    function player1Turn(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        
        console.log("last card played", lastCardPlayed)
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)

        setInitialTurn(false)
        if ("player_1" === playerTurn && clockWise === true)
            return setPlayerTurn("player_2") 
        else if ("player_1" ===playerTurn && clockWise === false)
            return setPlayerTurn("player_4")
        
        }else alert("illegal move")} 
    }
    
    function player2Turn(card){
            const lastCardPlayed = playedCards[0]
                if (typeof(card) === "undefined")
                {lastCardPlayed = playedCards[1]}
            if (lastCardPlayed) {
            
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){ 

        const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)

        if ("player_2" === playerTurn && clockWise === true)
            return setPlayerTurn("player_3") 
        else if ("player_2" === playerTurn && clockWise === false)
            return setPlayerTurn("player_1")
        
        }else alert("Illegal move")} 
    }
    
    function player3Turn(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)

        if ("player_3" === playerTurn && clockWise === true)
            return setPlayerTurn("player_4")
        else if ("player_3" === playerTurn && clockWise === false)
            return setPlayerTurn("player_2")
            
        }else alert("Illegal move")} 
    } 

    function player4Turn(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
            
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){ 
        
                const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        if ("player_4" === playerTurn && clockWise === true )
            return setPlayerTurn("player_1")  
        else if ("player_4" === playerTurn && clockWise === false)
            return setPlayerTurn("player_3")      
            }else alert("illegal move")}
    }

    // ADD 2 card logic
    function player1Add2(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
            
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_1" === playerTurn && clockWise === true){
            
            setPlayer2HandState([card1, card2, ...player2HandState])
            setPlayerTurn("player_2")
            return }
        if ("player_1" === playerTurn && clockWise === false) {
            
            setPlayer4HandState ([card1, card2, ...player4HandState])
            setPlayerTurn("player_4")
            return }
    }else alert("Illegal Move")} 
    } 

    function player2Add2(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) { 
        
        
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
            const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_2" === playerTurn && clockWise === true){
            
            setPlayer3HandState([card1, card2, ...player3HandState])
            setPlayerTurn("player_3")
            return}
        if ("player_2" === playerTurn && clockWise === false){
            
            setMyHandState ([card1, card2, ...myHandState])
            setPlayerTurn("player_1")
            return}
        }else alert("Illegal Move")} 
    }

    function player3Add2(card){
        
        const lastCardPlayed = playedCards[0]
                if (typeof(card) === "undefined")
                {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {

            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_3" === playerTurn && clockWise === true){
            setPlayer4HandState([card1, card2, ...player4HandState])
            setPlayerTurn("player_4")
            return}
        if ("player_3" === playerTurn && clockWise === false){
            
            setPlayer2HandState ([card1, card2, ...player2HandState])
            setPlayerTurn("player_2")
            return}
        }else alert("Illegal Move")} 
    }

    function player4Add2(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
            if (lastCardPlayed) {
        
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
            
        })
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_4" === playerTurn && clockWise === true){
            
            setMyHandState([card1, card2, ...myHandState])
            setPlayerTurn("player_1")
            return}
        if ("player_4" === playerTurn && clockWise === false){
            
            setPlayer3HandState ([card1, card2, ...player3HandState])
            setPlayerTurn("player_3")
            return}
    
        }else alert("Illegal Move")} 
    }

    /// REVERSE CARD LOGIC 
    useEffect(()=>{
        if (initialTurn)
            return 
        else if ("player_4" === playerTurn && clockWise === false)
            return setPlayerTurn("player_3") 
        else if ("player_4" === playerTurn && clockWise === true)
            return setPlayerTurn("player_1")
        else if ("player_3" === playerTurn && clockWise === false)
            return setPlayerTurn("player_2") 
        else if ("player_3" === playerTurn && clockWise === true)
            return setPlayerTurn("player_4")
        else if ("player_2" === playerTurn && clockWise === false)
            return setPlayerTurn("player_1")
        else if ("player_2" === playerTurn && clockWise === true)
            return setPlayerTurn("player_3")
        else if ("player_1" === playerTurn && clockWise === false)
            return setPlayerTurn("player_4")   
        else if ("player_1" === playerTurn && clockWise === true)     
            return setPlayerTurn("player_2")
    }, [clockWise])

    function player1HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")} }
    
    function player2HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){

        const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
    })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")}}
    
    function player3HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")}}

    function player4HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")}}

    // Skip Card Logic

    function player1Skip(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
        const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setInitialTurn(false)
        if ("player_1" === playerTurn && clockWise === true)
            return setPlayerTurn("player_3") 
        else if ("player_1" === playerTurn && clockWise === false)    
            return setPlayerTurn("player_3")   
        }else alert("illegal move")}}
    
    function player2Skip(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
            const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
    })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)

        if ("player_2" === playerTurn && clockWise === true)
            return setPlayerTurn("player_4") 
        else if ("player_2" === playerTurn && clockWise === false)
            return setPlayerTurn("player_4") 
        }else alert("illegal move")}}
    
    function player3Skip(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        if ("player_3" === playerTurn && clockWise === true)
            return setPlayerTurn("player_1") 
        else if ("player_3" === playerTurn && clockWise === false)
            return setPlayerTurn("player_1") 
        }else alert("illegal move")} }

    function player4Skip(card){
        const lastCardPlayed = playedCards[0]
                if (typeof(card) === "undefined")
                {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        const lastCardPlayed = playedCards[0]
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
    
        if ("player_4" === playerTurn && clockWise === true)
            return setPlayerTurn("player_2")
        else if ("player_4" === playerTurn && clockWise === false)
            return setPlayerTurn("player_2")
    }else alert("Illegal Move")} 
    }    

    return(
        <Container>

                    <h3> It's {playerTurn}'s turn </h3> 
            <div className="game-buttons"> 
                <button onClick={startingTheGame}>Start Game</button>
                <button onClick={startingHands}> Distribute Hands </button>
            </div>
            

            <div className="top-hands"> 
                <div className="player1"> 
                    <My_Hand 
                    playerTurn={playerTurn}
                    player1WildCard={player1WildCard}
                    completeDeck={completeDeck}
                    displayCard={displayCard} 
                    player1Turn={player1Turn} 
                    player1Skip={player1Skip} 
                    player1HandleReverse={player1HandleReverse} 
                    myHandState={myHandState}
                    player1Add2={player1Add2}
                    draw4WildPlayer1={draw4WildPlayer1}
                />
                </div>

                <div className="player2"> 
                    <Other_Player2 
                    playerTurn={playerTurn}
                    player2WildCard={player2WildCard}
                    displayCard={displayCard} 
                    completeDeck={completeDeck}
                    player2Turn={player2Turn} 
                    player2Skip={player2Skip} 
                    player2HandleReverse={player2HandleReverse} 
                    player2HandState={player2HandState}
                    player2Add2={player2Add2}
                    draw4WildPlayer2={draw4WildPlayer2}/>
                    </div>
            </div>

                <div className="deck-elements"> 
                    {clockWise? 
                        <img  id="turn-img" className="clockwise-turn-direction" src={turnDirection} alt="turn arrows" />
                    :
                        <img  id="turn-img" className="counter-turn-direction" src={counterDirection} alt="turn arrows" />
                    }

                    <div className="deck-titles"> 
                        <h6> Played Deck </h6>
                        <h6> Drawing Deck</h6>
                    </div>
                    <div className="decks">
                        <div className="piles">
                            <PlayedCardPile 
                            playedCardsState={playedCards} 
                            displayCard={displayCard} 
                            completeDeck={completeDeck}
                            />
                        </div>
                        {displayWildCard? <WildCardPopUp playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} clockWise={clockWise} playedCardsState={playedCards} displayWildCard={setDisplayWildCard}/> : null}
                        <div className="piles"> 
                            <img onClick={ addsCardToHand} src={backOfCard} alt="the back the cards" height={100} width={75}/>
                        </div>
                    </div>
                </div>

            <div className="bottom-hands">
            <div className='player4'>
                <Other_Player4
                    playerTurn={playerTurn}
                    player4WildCard={player4WildCard}
                    displayCard={displayCard} 
                    completeDeck={completeDeck}
                    player4Turn={player4Turn} 
                    player4Skip={player4Skip} 
                    player4HandleReverse={player4HandleReverse}
                    player4HandState={player4HandState}
                    player4Add2={player4Add2} 
                    draw4WildPlayer4={draw4WildPlayer4}
                />
                </div> 
                
                <div className='player3'>
                <Other_Player3
                    playerTurn={playerTurn}
                    player3WildCard={player3WildCard}
                    displayCard={displayCard} 
                    completeDeck={completeDeck}
                    player3Turn={player3Turn} 
                    player3Skip={player3Skip} 
                    player3HandleReverse={player3HandleReverse} 
                    player3HandState={player3HandState}
                    player3Add2={player3Add2}
                    draw4WildPlayer3={draw4WildPlayer3}
                />
                </div>
            </div>

            <StyledLink to="/"> Exit Game </StyledLink>
        </Container>
    )
}
export default ActiveGame;
