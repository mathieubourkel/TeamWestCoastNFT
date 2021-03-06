import { Navbar, Form, FormControl, Button, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import React from 'react';
import marketplace from "./marketplace.png";

const Navigation = ({ state, web3Handler, account, balance }) => {
    return(
            <Navbar collapseOnSelect bg="light" expand="lg">
              <Container fluid>
                
                <Navbar.Brand as={Link} to = "/" className='mx-auto'><img className='me-3' src={marketplace} alt ="Logo" /></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                <Form className="mx-auto w-50 ">
                    <FormControl type="search" placeholder="Search items, and collections" aria-label="Search" style={{borderRadius: "10px"}}/>
                  </Form>
                <Nav className="d-flex mx-auto" style={{ maxHeight: '100px' }}>
                    <Nav.Link as={Link} to ="/" className='mx-4'>All NFTs</Nav.Link>
                    <Nav.Link as={Link} to ="collections" className='mx-4'>Collections</Nav.Link>
                    <NavDropdown title="Create" id="createlink" className='mx-4'>
                      <NavDropdown.Item as={Link} to ="create-item">Item</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to ="create-collection">Collection</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Wallet" id="createlink" className='mx-4'>
                      <NavDropdown.Item as={Link} to ="my-items">My items</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to ="my-collections">My Collections</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  {account ? (
                    <Nav.Link
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button nav-button btn-sm mx-4">
                    <Button>
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                    </Button>
                    <div>ETH: {balance.slice(0,9)}</div>

                </Nav.Link>
                  ) : ( <NavDropdown title="Connect Wallet" id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={web3Handler}>MetaMask</NavDropdown.Item>
                    </NavDropdown> )}
                </Navbar.Collapse>
              </Container>
          </Navbar>
    )
}

export default Navigation;