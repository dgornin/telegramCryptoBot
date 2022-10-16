import React, { useState, createContext } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import Link from "next/link";

export default function Header() {
    const [currentAccount, setCurrentAccount] = useState();
    const Context = createContext()
    
    async function handleLogInClick() {
        const { ethereum } = window;
        if (!ethereum) {
          alert("You don't have metamask");
        }
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <Menu style={{ marginTop: "20px" }}>
        <Link href="/">
          <Menu.Item header>Main page</Menu.Item>
        </Link>
        <Link href="/create">
          <Menu.Item
            name='Create note'
          />
        </Link>
        <Link href="/check">
          <Menu.Item
            name='Check note'
          />
        </Link>
          <Menu.Item position="right">
          {!currentAccount ? (
            <Button primary onClick={handleLogInClick}>
              Вход
            </Button>
          ) : (
            <Link href="/user">
              <Button primary onClick={handleLogInClick}>
                {currentAccount}
              </Button>
            </Link>
          )}
          </Menu.Item>
        </Menu>
      );
}
