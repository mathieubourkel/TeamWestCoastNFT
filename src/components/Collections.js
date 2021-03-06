import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from 'react-bootstrap'
import React from 'react';

const Collections = ({ state, collections, setCollections, collectionExplore, setCollectionExplore }) => {

    const loadMarketplaceCollections = async () => {
      const collectionCountTemp = await state.marketContract.collectionCount();
      const collectionCount = collectionCountTemp.toNumber();
      let collections = [];

      for (let i = 1; i <= collectionCount; i++) {

        const collection = await state.marketContract.collections(i);
        const collectionOwner = await collection.owner;
        const collectionAddress = await collection.collectionAddress;
        const uri = await collection.uri;
        const response = await fetch(uri);
        const metadata = await response.json();
        collections.push({
            collectionId: collection.collectionId,
            artistName: metadata.artistName,
            owner: collection.owner,
            artistSymbol: metadata.artistSymbol,
            image: metadata.image,
            owner: collectionOwner,
            address: collectionAddress
        })
      }
        setCollections(collections);
      
    }
  
    const goToCollection = async (collectionMap) => {
        setCollectionExplore(collectionMap);
    }
  
    useEffect(() => {
      loadMarketplaceCollections();
    }, [])

    return (
      <div className="flex justify-center">
        {collections.length > 0 ?
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {collections.map((collectionMap, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card className="d-flex align-items-stretch img-thumbnail">
                    <Card.Img variant="top" src={collectionMap.image} className='images' />
                    <Card.Body color="secondary">
                      <Card.Title>{collectionMap.artistName}</Card.Title>
                      <Card.Text>
                        {collectionMap.artistSymbol}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className='d-grid'>
                        <Button as={Link} to ="items-by-collection" onClick={() => goToCollection(collectionMap)} variant="primary" size="lg">
                          Explore
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          : (
            <div className="row coiny">
              <div className="col-md-8 mx-auto text-center text-warning mt-5">
                <h3 className=''>No listed collections</h3>
              </div>
            </div>
          )}
      </div>
    );
  }

export default Collections;