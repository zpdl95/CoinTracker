import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  span {
    color: ${(props) => props.theme.accentColor};
  }
`;
const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 3px solid ${(props) => props.theme.boxColor};
  border-bottom: 3px solid ${(props) => props.theme.boxColor};
`;
const GridColumn = styled.div`
  color: ${(props) => props.theme.textColor};
  div {
    padding: 5px 8px;
  }
  &:first-child {
    div:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.boxColor};
    }
  }
  &:last-child {
    div {
      text-align: right;
    }
  }
`;
function Price({ tickersData }) {
  return (
    <Container>
      <Title>
        <span>Main</span> Price $(달러)
      </Title>
      <PriceGrid>
        <GridColumn>
          <div>현재가</div>
          <div>거래량</div>
          <div>24시간 가격변화</div>
          <div>역대최고가</div>
          <div>시가총액</div>
        </GridColumn>
        <GridColumn>
          <div>{tickersData.quotes.USD.price.toLocaleString()}</div>
          <div>{tickersData.quotes.USD.volume_24h.toLocaleString()}</div>
          <div>{tickersData.quotes.USD.percent_change_24h}%</div>
          <div>{tickersData.quotes.USD.ath_price.toLocaleString()}</div>
          <div>{tickersData.quotes.USD.market_cap.toLocaleString()}</div>
        </GridColumn>
      </PriceGrid>
    </Container>
  );
}
export default Price;
