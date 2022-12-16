import React from 'react'
import * as g from './GamePageStyle'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __GameInfoGet, __GameFirstGet, __GameLastPost } from '../../redux/modules/GameSlice'


export default function GamePage() {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameData = useSelector((state) => state.gameInfo.data)
  //test
  const goFirst = (e) => {
    e.preventDefault();
    navigate("/start");
    dispatch(__GameFirstGet());
  };
  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(__GameFirstGet());
  };
  const leftGo = (e) => {
    e.preventDefault();
    navigate(`/game/${GameID}/${gameData.data[0].leftId}`)
  };
  const rightGo = (e) => {
    e.preventDefault();
    navigate(`/game/${GameID}/${gameData.data[0].rightId}`)
  };
  const resultGo = (e) => {
    e.preventDefault();
    dispatch(__GameLastPost({GameID, QID}));
    setTimeout(()=> navigate(`/gameResult/${GameID}/${QID}`), 500);    
  };


  useEffect(() => {
    id.id == "start"
      ? dispatch(__GameFirstGet())
      : dispatch(__GameInfoGet({ GameID, QID }));
  }, [id]);

  const leftImg = `../../img/gameImg/${gameData.data[0] && gameData.data[0].leftId == null ? (2) : (gameData.data[0] && gameData.data[0].leftId)}.webp`         
  const rightImg = `../../img/gameImg/${gameData.data[0] && gameData.data[0].rightId == null ? (2) : (gameData.data[0] && gameData.data[0].rightId)}.webp`
  const GameID = (gameData.data[1] && gameData.data[1].gameId === null ? ("1") : gameData.data[1] && gameData.data[1].gameId)
  const QID = parseInt(id.id)
  const VCharacter = '../../img/gameCommonImg/happy.gif'
  const FCharacter = '../../img/gameCommonImg/unhappy.gif'

  return (
    <g.totalWrap>
      {QID >= 32 ? (
          <g.balanceButtonWrapFinal>
              <g.gameResultIcon/>
              <g.gameResultText>
                "결과가 나왔어요~ <br/>
                자, 어디로 갈 지 한번 알아볼까요?"
              </g.gameResultText>
              <g.balanceButtonFinal onClick={resultGo}>
                게임결과보기
              </g.balanceButtonFinal>         
          </g.balanceButtonWrapFinal>
      ) : (
         <g.balanceViewWrap>

           <g.balanceBlackWrap/>

          <g.balanceButtonWrap>
            <g.balanceButtonBH>
            <g.balanceButton alt="left img" src={leftImg} onClick={leftGo}/>
            <g.balanceButtonHover src={VCharacter}/>
            <g.balanceButtonRightHover src={FCharacter}/>
            <g.balanceText onClick={leftGo}>{gameData.data[0] && gameData.data[0].leftAnswer}</g.balanceText>
            </g.balanceButtonBH>
            <g.balanceButtonBH>
            <g.balanceButton alt="right img" src={rightImg} onClick={rightGo}/>
            <g.balanceButtonHover src={VCharacter}/>
            <g.balanceButtonLeftHover src={FCharacter}/>
            <g.balanceText onClick={rightGo}>{gameData.data[0] && gameData.data[0].rightAnswer}</g.balanceText>
            </g.balanceButtonBH>
          </g.balanceButtonWrap>
          <g.vsLogo/>
          <g.moving>
            <g.firstWrap onClick={goFirst}></g.firstWrap>
            <g.wrapDiv></g.wrapDiv>
            <g.homeWrap onClick={goHome}></g.homeWrap>
          </g.moving>
          </g.balanceViewWrap>
      )}
    </g.totalWrap>
  );
}
