import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Route, Switch, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { getCoinInfo, getCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

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
const GoBack = styled.div`
  font-size: 45px;
  color: ${(props) => props.theme.boxColor};
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  color: ${(props) => props.theme.textColor};

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: #a4b0be;
  line-height: 1.2;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.div`
  background-color: #718093;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    transition: none;
    font-size: 15px;
    font-weight: 400;
    padding: 7px 0px;
    display: block;
    text-align: center;
    text-transform: uppercase;
  }
`;

function CoinDetail({ toggleMode }) {
  const { state } = useLocation();
  const { coinId } = useParams();
  const { data: infoData, isLoading: infoIsLoading } = useQuery(
    ["info", coinId],
    () => getCoinInfo(coinId)
  );
  const { data: tickersData, isLoading: tickersIsLoading } = useQuery(
    ["tickers", coinId],
    () => getCoinTickers(coinId),
    {
      refetchInterval: 30000,
    }
  );
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const loading = infoIsLoading || tickersIsLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name || infoData?.name}</title>
      </Helmet>
      <Header>
        <GoBack>
          <Link to={"/"}>◀</Link>
        </GoBack>
        <Title>{state?.name || infoData?.name}</Title>
        <ChangeMode onClick={toggleMode}>☯</ChangeMode>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply.toLocaleString()}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route
              path={`/:coinId/price`}
              component={() => Price({ tickersData })}
            />
            <Route
              path={`/:coinId/chart`}
              component={() => Chart({ coinId })}
            />
          </Switch>
        </>
      )}
    </Container>
  );
}
export default CoinDetail;
