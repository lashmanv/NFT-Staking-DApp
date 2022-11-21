import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import {
	InfoContainer, 
	InfoWrapper, 
	InfoRow, 
	Column1, 
	TextWrapper, 
	TopLine, 
	Heading, 
	Subtitle, 
	BtnWrap,
	Column2,
	ImgWrap,
	Img, 
} from './MintElements'
import { Button,Button1 } from '../ButtonElements';
import final from '../../images/nfts.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
      
import NFT from "../../artifacts/contracts/NftStaking.sol/NFT.json";

export default function MyTokens(props) {
	
	const [totalSupply, setTotalSupply] = useState(null);

	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);
	
	const [event, setEvent] = useState({from: null, to: null, tokenId: null});
	const [mint, setMint] = useState(true);

	const [contract, setContract] = useState();
	const [network, setNetwork] = useState(null);

	const fetchMyAPI = async () => {
		try {
			// Get network provider and web3 instance.	
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await window.ethereum.request({method: "eth_requestAccounts"});

			let network = await provider.getNetwork();
			network = network.chainId;

			if (network === 5) {
				// Use web3 to get the user's accounts.
				const signer = provider.getSigner();
				// Get an instance of the contract sop we can call our contract functions
				const contract = new ethers.Contract("0xf06bDbE8f2e09234A497116137464E3fD96B89ae", NFT, signer);
				setContract(contract);}
			else setContract(null); setNetwork(null);

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to Nft contract.", error);
		}
	}

	// Populate userTokens with an array of token IDs belonging to the curent wallet address.
	const GetTotalSupply = async () => {
		if(!props || !contract || props.network!==5) return;
		try{
			const transaction = await contract.totalSupply();
			await transaction.wait;
			setTotalSupply(parseInt(transaction._hex));
			}
		catch (error) {
			setError(error);
			console.log(error);
		}
	};

	const DoMint = async () => {
		if(!props || !contract || props.network!==5) return;
		try{
			const transaction = await contract.mint();
			await transaction.wait;
			contract.on("Transfer", (from, to, tokenId) => {
				setEvent({from:from,to:to,tokenId:tokenId});
				setMint("Token Id : "+ parseInt(tokenId)+" succesfully minted to "+to);
				console.log(event);
			});
			notify(transaction.hash);
			console.log(transaction);
			}
		catch (error) {
			if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction")))	
				setError("user rejected transaction");
				notify("User rejected transaction");
			console.log(error?.message);
		}
	};

	useEffect(() => {
		setTimeout(() => setError(false), 5000);
		setTimeout(() => setSuccess(false), 5000);
		setTimeout(() => setMint(false), 10000);
	  }, [error], [success], [mint]);


	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	//if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Get all token IDs associated with the wallet address when the component mounts.
	if(!totalSupply) fetchMyAPI(); GetTotalSupply();

	
	const notify = (e) => toast(e, {
		position: "top-right",
		className: 'toast-notify',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		});        

	// Set up the list of available token URIs when the component mounts.
	//if(totalSupply && !tokenURIs.length) GetTokenURIs(totalSupply);
	
	if(!props.address) {
		return (
			<>
			<InfoContainer id="mint" >
				<InfoWrapper>
				<InfoRow >
					<Column1>
					<TextWrapper>
						<TopLine>JOIN BITCOIN MINING COMMUNITY</TopLine>
						<Heading lightText={false}>Mint MrGreen Miners $NFT</Heading>
						<Subtitle darkText={true}>Get rewards in bitcoin every month. All you need to do is own an MrGreenMiners Nft and you're ready to go.</Subtitle>
						<BtnWrap>
						<Button 
							to="mint"
							smooth={true}
							duration={500}
							spy={true}
							exact="true"
							offset={-80}
							>
						Connect Wallet
					</Button>
					</BtnWrap>
					</TextWrapper>
					</Column1>
					<Column2>
					<ImgWrap>
						<Img src={final} alt="nfts" />
					</ImgWrap>
					</Column2>
				</InfoRow>
				</InfoWrapper>
			</InfoContainer>
			</>
		);
	}
	if(mint) {
		return (
			<>
			<InfoContainer id="mint" >
				<InfoWrapper>
				<InfoRow >
					<Column1>
					<TextWrapper>
						{event.tokenId!==0 ? (<><Subtitle darkText={true}>Nft ID : {parseInt(event.tokenId)} Minted successfully</Subtitle> </>) : (false)}
						<Subtitle darkText={true}>View your Nfts in User Assests</Subtitle>
						<BtnWrap>
						<ToastContainer
							position="top-right"
							autoClose={10000}
							hideProgressBar={false}
							newestOnTop={true}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="black"
						/>
						<Button to="stake" 
							smooth={true}
							duration={500}
							spy={true}
							exact="true"
							offset={-80} > My Assests </Button>
					</BtnWrap>
					</TextWrapper>
					</Column1>
					<Column2>
					<ImgWrap>
						<Img src={final} alt="nfts" />
					</ImgWrap>
					</Column2>
				</InfoRow>
				</InfoWrapper>
			</InfoContainer>
			</>
		);
	}
	
	else {
		return (
			<>
			<InfoContainer id="mint" >
				<InfoWrapper>
				{mint ? (<Subtitle darkText={true}>{parseInt(event.tokenId)}</Subtitle>) : (false)}
				<InfoRow >
					<Column1>
					<TextWrapper>
						<TopLine>JOIN BITCOIN MINING COMMUNITY</TopLine>
						<Heading lightText={false}>Mint MrGreen Miners $NFT</Heading>
						<Subtitle darkText={true}>Get rewards in bitcoin every month. All you need to do is own an MrGreenMiners Nft and you're ready to go.</Subtitle>
						<BtnWrap>
						<Button1 onClick={() => {DoMint()}}> Mint </Button1>
						<ToastContainer
							position="top-right"
							autoClose={10000}
							hideProgressBar={false}
							newestOnTop={true}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="black"
						/>
					</BtnWrap>
					</TextWrapper>
					</Column1>
					<Column2>
					<ImgWrap>
						<Img src={final} alt="final" />
					</ImgWrap>
					</Column2>
				</InfoRow>
				</InfoWrapper>
			</InfoContainer>
			</>
		);
	}
}