import React, { useEffect, useState } from 'react'
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks, 
  NavBtn, 
  NavIcon,
  NavBtnLink, 
} from './NavbarElements';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib'; 
import { animateScroll as scroll } from 'react-scroll'; 

import { ethers } from "ethers";

import icon from '../../images/icon.png';

import NFT from "../../artifacts/contracts/NftStaking.sol/NFTStakingVault.json";

export default function Navbar({toggle,callback,connected,contract}) {

  const contractAddress = "0x8CDE14d3EECBF465Da610F1B2f0523B2A529be12";//"0x18B4A94E454FD6cF3979B1c0E481Cbf259dC6164";

	const DoConnect = async (bool) => {
		console.log('Connecting....');
		try {
			// Get network provider and web3 instance.	
			let provider = new ethers.providers.Web3Provider(window.ethereum);

			await window.ethereum.request({method: "eth_requestAccounts"});

			// Use web3 to get the user's accounts.
			const signer = provider.getSigner();
		  let signerAddress = await signer.getAddress();
			signerAddress = [`${signerAddress}`];

      let network = await provider.getNetwork();
      network = network.chainId;
      console.log(signerAddress[0],network);

      if(network === 5) setAddrs(signerAddress[0].slice(0,10));
			else {setAddrs(signerAddress[0].slice(0,10)); console.log("Invalid network : Change Metamask network to Ethereum Mainnet");}

			// Get an instance of the contract sop we can call our contract functions
			let contract = new ethers.Contract(contractAddress, NFT, signer);

      if(bool) callback({provider, signerAddress, contract, network});

      else{provider=null;signerAddress=0;contract= null;network=null; callback({provider, signerAddress, contract, network});}
      
		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet.", error);
		}
	};

  const [scrollNav, setScrollNav] = useState(false);

  const [addrs, setAddrs] = useState(null);

  const changeNav= () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const connect = () => {
    DoConnect(true);
  }
  const disconnect = () => {
    console.log(contract);
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  });

  const toggleHome = () => {
    scroll.scrollToTop();
  };
  

  // If not connected, display the connect button.
	if(!connected) {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav scrollNav={scrollNav}>
            <NavbarContainer>
            <NavIcon src={icon} alt="icon" to="/" onClick={toggleHome} />
              <MobileIcon onClick={toggle}>
                <FaBars />
              </MobileIcon>
              <NavMenu>
                {[
                  { to: 'mint', title: 'Mint', }, 
                  { to: 'stake', title: 'Reward', },
                  { to: 'staked', title: 'Assests', },
                  { to: 'about', title: 'About', },           
                ].map(({ to, title }) => (
                  <NavItem key={to}>
                    <NavLinks 
                      to={to}
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-70}
                    >
                      {title}
                    </NavLinks>
                  </NavItem>
                ))}
              </NavMenu>
              <NavBtn>
                <NavBtnLink to="/home" onClick={connect}>Connect Wallet</NavBtnLink>
              </NavBtn>
            </NavbarContainer>
          </Nav>
        </IconContext.Provider>
      </>
    )
  }

    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav scrollNav={scrollNav}>
            <NavbarContainer>
              <NavIcon src={icon} alt="icon" to="/" onClick={toggleHome} />
              <MobileIcon onClick={toggle}>
                <FaBars />
              </MobileIcon>
              <NavMenu>
                {[
                  { to: 'mint', title: 'Mint', }, 
                  { to: 'stake', title: 'Reward', },
                  { to: 'staked', title: 'Assests', },
                  { to: 'about', title: 'About', }, 
                ].map(({ to, title }) => (
                  <NavItem key={to}>
                    <NavLinks 
                      to={to}
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-80}
                    >
                      {title}
                    </NavLinks>
                  </NavItem>
                ))}
              </NavMenu>
              <NavBtn>
                <NavBtnLink to="/home" >{addrs}...</NavBtnLink>
              </NavBtn>
            </NavbarContainer>
          </Nav>
        </IconContext.Provider>
      </>
    )
  
  }

