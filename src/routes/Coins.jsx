import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoins } from "../api";

const Container = styled.div`
  width: 500px;
  margin: 20px auto;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  place-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  grid-column-start: 2;
  font-size: 48px;
`;

const ChangeMode = styled.div`
  font-size: 50px;
  cursor: pointer;
  color: ${(props) => props.theme.btnColor};
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  a {
    display: block;
    width: 100%;
    padding: 10px 20px;
    text-align: center;
    font-size: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

function Coins({ toggleMode }) {
  const { data, isLoading } = useQuery("Coins", getCoins);
  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <ChangeMode onClick={toggleMode}>☯</ChangeMode>
      </Header>
      <CoinsList>
        {isLoading && "Loading..."}
        {data?.slice(0, 100).map((c) => (
          <Coin key={c.id}>
            <Link
              to={{
                pathname: `/${c.id}`,
                state: {
                  name: c.name,
                  symbol: c.symbol,
                  rank: c.rank,
                },
              }}
            >
              {c.symbol}
            </Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}
export default Coins;
