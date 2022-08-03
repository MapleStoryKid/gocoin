import { Helmet } from "react-helmet";
import {  useQuery } from '@tanstack/react-query'
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";
import { GiTwoCoins } from "react-icons/gi";





const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const CoinsList = styled.ul`
li:hover{
  box-shadow: 0 0 35px #4cd137;
  background-color: #fbc531;

}
`;

const Coin = styled.li`
background-color: ${(props) => props.theme.cardBgColor};
color: ${(props) => props.theme.textColor};
transition: all 0.4s ease;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 2px solid white;
  a {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ThemeBtn = styled.label`
top: 30px;
right: 30px;
position: absolute;
width: 60px;
height: 30px;
background-color: #28292c;
border-radius: 50px;
cursor: pointer;

input {
  position: absolute;
  display: none;}

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: 0.3s;
  }

  input:checked ~ span {
    background-color: #d8dbe0;
  }
  
  span::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: inset 15px 0px 0px 0px yellow;
    background-color: #28292c;
    transition: 0.3s;
  }
  
  input:checked ~ span::before {
    transform: translateX(30px);
    background-color: #28292c;
    box-shadow: none;
  }


`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (

    <Container>
      <ThemeBtn><input onClick={toggleDarkAtom} type="checkbox" /><span></span> </ThemeBtn>
      <Helmet>
        <title>コイン</title>
      </Helmet>

      <Header>
       <Title> <GiTwoCoins />コイン</Title>
        
      </Header>
      {isLoading ? (
        <Loader>ローディング中...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
   
    </Container>
    
  );
}


export default Coins;