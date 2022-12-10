import { useState,useEffect } from "react"
import { Container,Table, Spinner } from "react-bootstrap"
import "./Cryptocss.css"

const Crypto = () => {

    const[cryptoCoins,setCrptoCoins]=useState([])
	
  useEffect(() => {
  (async()=>{
       const response= await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
       const cryptoCoin= await response.json() 
       setCrptoCoins(cryptoCoin)
  }    

  )()
}, []);
  

  return (
    <>
     <Container>
      {cryptoCoins.length ? (
        <Table hover variant="dark">
          <tbody>
            {cryptoCoins.map((coin) => (
              <tr className="crypto-row" key={coin.id}>
              <td style={{ textAlign: 'left', paddingLeft: '50px' }}>
                <img src={coin.image} alt="coin" height={30} /> {coin.name}
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price}</td>
              <td>${coin.total_volume}</td>
              <td>{coin.price_change_24h.toFixed(2)}%</td>
              <td>${coin.market_cap}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Spinner animation="border" />
      )}
      </Container>
    </>
  );
};

export default Crypto;