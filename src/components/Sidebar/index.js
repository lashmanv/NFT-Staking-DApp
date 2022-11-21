import React, { useState } from 'react';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper, 
  SidebarMenu, 
  SidebarLink, 
  SideBtnWrap, 
  SidebarRoute, 
} from './SidebarElement'


import { ethers } from "ethers";

import NFT from "../../artifacts/contracts/NftStaking.sol/NFTStakingVault.json";

export default function Sidebar({isOpen, toggle,connected,callback,contract}) {

  const contractAddress = "0xB22431cb1F398dEE9d033836C3A98E6B65cC6893";//"0x18B4A94E454FD6cF3979B1c0E481Cbf259dC6164";

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
			else console.log("Invalid network : Change Metamask network to Ethereum Mainnet");

			// Get an instance of the contract sop we can call our contract functions
			let contract = new ethers.Contract(contractAddress, NFT, signer);
      if(bool) callback({ provider, signerAddress, contract});
      else{provider=null;signerAddress=0;contract= null; callback({ provider, signerAddress, contract});}
      
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

  if(!connected) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
        <SidebarLink to="mint" onClick={toggle}>
          Mint
        </SidebarLink>
        <SidebarLink to="stake" onClick={toggle}>
          Reward
        </SidebarLink>
        <SidebarLink to="staked" onClick={toggle}>
          Assests
        </SidebarLink>
        <SidebarLink to="about" onClick={toggle}>
          About
        </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signin" onClick={connect}>Connect Wallet</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
return (
  <SidebarContainer isOpen={isOpen} onClick={toggle}>
    <Icon>
      <CloseIcon />
    </Icon>
    <SidebarWrapper>
      <SidebarMenu>
        <SidebarLink to="mint" onClick={toggle}>
          Mint
        </SidebarLink>
        <SidebarLink to="stake" onClick={toggle}>
          Reward
        </SidebarLink>
        <SidebarLink to="staked" onClick={toggle}>
          Assests
        </SidebarLink>
        <SidebarLink to="about" onClick={toggle}>
          About
        </SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to="/signin" >{addrs}...</SidebarRoute>
      </SideBtnWrap>
    </SidebarWrapper>
  </SidebarContainer>
);
};


