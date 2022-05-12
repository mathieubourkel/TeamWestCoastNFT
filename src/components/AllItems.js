import { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import React from 'react';

function AllItems({ state }) {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const loadMarketplaceItems = async () => {

      const itemCount = await state.marketContract.itemCount();
      let items = []
      for (let i = 1; i <= itemCount; i++) {
        const item = await state.marketContract.items(i);
        if (!item.sold) {

            const uri = "toto";
        //   const uri = await nft.tokenURI(item.tokenId)  A MODIFIER
          const response = await fetch(uri);
          const metadata = await response.json();
          const totalPrice = await state.marketContract.getTotalPrice(item.itemId);
          items.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          })
        }
      }
      setLoading(false)
      setItems(items)
    }
  
    const buyMarketItem = async (item) => {
      await (await state.marketContract.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
      loadMarketplaceItems()
    }
  
    useEffect(() => {
      loadMarketplaceItems()
    }, [])
    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    )
    return (
      <div className="flex justify-center">
        {items.length > 0 ?
          <div className="px-5 container">
              <div>
                  <h1>ONGLET FILTER</h1>
                </div>
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {items.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body color="secondary">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className='d-grid'>
                        <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                          {/* Buy for {ethers.utils.formatEther(item.totalPrice)} ETH */}
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          : (
            <main style={{ padding: "1rem 0" }}>
              <h2>No listed assets</h2>
            </main>
          )}
      </div>
    );
  }

export default AllItems;