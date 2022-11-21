import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection'; 
import InfoSection from '../components/InfoSection';
import {
  homeObjeTwo, 
  homeObjeThree, 
} from '../components/InfoSection/Data';
import Stake from '../components/Stake';
import Staked from '../components/Assests';
import Mint from '../components/Mint';
import Footer from '../components/Footer';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [web3props, setWeb3Props] = useState({ provider: null, signerAddress: null, contract: null, network: null });

  // If the wallet is connected, all three values will be set. Use to display the main nav below.
	const contractAvailable = !(!web3props.provider && !web3props.signerAddress && !web3props.contract && !web3props.network);
	// Grab the connected wallet address, if available, to pass into the Login component
	const walletAddress = web3props.signerAddress ? web3props.signerAddress[0] : "";

  const ConnectedNetwork = web3props.network;

  let OnLogin = function(param){
		let { provider, signerAddress, contract, network} = param;
		if(provider && signerAddress && signerAddress.length && contract && network){
			setWeb3Props({ provider, signerAddress, contract, network });
		}
	}

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} callback = {OnLogin} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <Navbar toggle={toggle} callback = {OnLogin} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <HeroSection />
      <Mint toggle={toggle} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
     
      <Stake toggle={toggle} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      <Staked toggle={toggle} contract={web3props.contract} connected={contractAvailable} address={walletAddress} network={ConnectedNetwork}/>
      
      <InfoSection toggle={toggle} {...homeObjeThree} />    
      
      <Footer />
    </>
  );
}

export default Home;
