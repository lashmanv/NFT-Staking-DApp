import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import Checkbox from "@material-ui/core/Checkbox";
import {
  StakeContainer,
  StakeH1,
  StakeWrapper,
  StakeCard,
  StakeIcon,
  ReloadIcon,
  RefreshIcon,
  StakeH2,
  StakeC,
  Stake,
  Stake1,
  StakeMany
} from './StakeElements'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bar from '../../images/bar.gif';
import refresh from '../../images/refresh.png';
import NFT from "../../artifacts/contracts/NftStaking.sol/NFT.json";

export default function MyTokens(props) {
	const [state, setState] = useState([{checked: false}]);
	const [event, setEvent] = useState("Stake");
	const[selected, setSelected] = useState([]);
	const [mint, setMint] = useState(true);
	
	const[loading, setLoading] = useState(true);
	
	const [totalSupply, setTotalSupply] = useState(null);
	const [tokenids, settokenids] = useState([]);
	const [tokenURIs, setTokenURIs] = useState([]);

	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);

	const [contract, setContract] = useState();

	const [activeTab, setActiveTab] = useState("tab1");

		//  Functions to handle Tab Switching
		const handleTab1 = () => {
		  // update the state to tab1
		  setActiveTab("tab1");
		  setEvent("Stake");
		};
		const handleTab2 = () => {
		  // update the state to tab2
		  setActiveTab("tab2");
		  setEvent("Claim");
		};

	const fetchMyAPI = async () => {
		try {
			// Get network provider and web3 instance.	
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await window.ethereum.request({method: "eth_requestAccounts"});
			// Use web3 to get the user's accounts.
			const signer = provider.getSigner();
			// Get an instance of the contract sop we can call our contract functions
			const contract = new ethers.Contract("0xf06bDbE8f2e09234A497116137464E3fD96B89ae", NFT, signer);
			setContract(contract);

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

	const DoStake = async (e) => {
		console.log(event);
		if(!props || !contract || props.network!== 5) return;
		console.log("loading...");
		console.log(e);
		let id ;
		if(e.length > 1) {id = [e];}
		id = e;
		try{
			const transaction = await props.contract.stakeNft(id);
			await transaction.wait;
			console.log(transaction);
			contract.on("Transfer", (from, to, tokenId) => {
				setMint("Token Id : "+ parseInt(tokenId)+" succesfully minted to "+to);
				console.log(mint);
				GetTokenURIs(totalSupply)
			});
      	} 
		catch (error) {
			if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction")));
				setError(error);
				notify("User rejected transaction");
				console.log(error);
      	}
	};

	const DoClaim = async (e) => {
		console.log(event);
		if(!props || !contract || props.network!== 5) return;
		console.log("loading...");
		console.log(e);
		let id ;
		if(e.length > 1) {id = [e];}
		id = e;
		try{
			const transaction = await props.contract.claimReward(id);
			await transaction.wait;
			console.log(transaction);
			setTimeout(GetTokenURIs(totalSupply), 15000);
      	} 
		catch (error) {
			if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction")));
				setError(error);
				notify("User rejected transaction");
			console.log(error);
      	}
	};

	const handleChange = (idx) => {
		setState(!state.checked);

		let ids= [...selected];
		if(ids.includes(idx)) {
			var index = ids.indexOf(idx);
			if (index !== -1) {
		  		ids.splice(index, 1);
			}
		}
		else {ids.push(idx);}

		ids.sort((a, b) => a - b);

		setSelected(ids);

		console.log(ids);
	  };

	// Populate the setTokenURIs variable with token URIs belonging to the curent wallet address.
	const GetTokenURIs = async (totalSupply) => {
		if(!totalSupply || props.network !== 5) return;
		let tokens = [];
		let ids = [];
		// Taking advantage of the fact that token IDs are an auto-incrementing integer starting with 1.
		// Starting with userTokens and counting down to 1 gives us the tokens in order of most recent.
		for(let idx = 0; idx < totalSupply; idx++){
			try{
				let owner = await contract.ownerOf(idx);
				await owner.wait;
				if(owner === props.address) {
					// Get the metadata URI associated with the token.
					let tokenURI = await contract.tokenURI(idx);
					await tokenURI.wait;
					setSuccess(tokenURI);

					let meta=tokenURI.replace("ipfs://", "")	
					let id = (tokenURI.replace("ipfs://QmZRtTZu1EomTbSCnikfPDPAdd9CopZBj6XtErazqGBrBZ/",""));
					id = (id.replace(/\D/g,''));

					// Fetch the json metadata the token points to.
					let response = await fetch("https://ipfs.moralis.io:2053/ipfs/"+meta);
					await response.wait;
					let metaData = await response.json();

					let res = metaData.image;
					
					let img=(res.replace("ipfs://", ""))
					
					// Fetch the json metadata the token points to.
					let final = await fetch("https://ipfs.moralis.io:2053/ipfs/"+img);

					// Add the image url if available in the metadata.
					if(final.ok) {
						tokens.push(final.url);
						ids.push(id);
					}
					else{
						continue;
					}
				}
			}
			catch(e){
				// Either the contract call or the fetch can fail. You'll want to handle that in production.
				console.log('Error occurred while fetching metadata.',e)
			}
		}

		// Update the list of available asset URIs
		if(tokens.length) setTokenURIs([...tokens]); settokenids([...ids]); 
	};

	const closeLoaderIn5Seconds = () => {
	  setTimeout(() => setLoading(false), 10000);
  	};

	useEffect(() => {
		setTimeout(() => setError(false), 5000);
		setTimeout(() => setSuccess(false), 5000);
	  }, [error], [success]);


	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	//if(!props.contract) return (<div className="page error">Contract Not Available</div>);

	// Get all token IDs associated with the wallet address when the component mounts.
	if(!totalSupply) fetchMyAPI(); GetTotalSupply();

	// Set up the list of available token URIs when the component mounts.
	if(totalSupply && !tokenURIs.length) GetTokenURIs(totalSupply);

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
	
	// Display the personal token gallery
	if(!props.address) {
		return (
			<StakeContainer id="stake">
				<StakeH1>Staked Nfts</StakeH1>
				<StakeC>
				<StakeH2>Connect the Wallet </StakeH2>
				<StakeH2> To view the assests</StakeH2>
				</StakeC>
			</StakeContainer>	
		);
	}
	if(!tokenURIs){return(<StakeH1>Loading...</StakeH1>)}
	return (
		<>
		<StakeContainer id="stake">
			<StakeH1>User Assests <RefreshIcon src={refresh} alt={"refresh"} onClick={() => {setLoading(true); closeLoaderIn5Seconds(); GetTokenURIs(totalSupply);}}/> </StakeH1>
			<div className="Tabs">
			<ul className="nav">
			  <li className={activeTab === "tab1" ? "active" : ""}	onClick={handleTab1}> Stake </li>
			  <li className={activeTab === "tab2" ? "active" : ""}	onClick={handleTab2}> Claim </li>
			</ul>
			</div>
			{loading ? <ReloadIcon src={bar} alt={'progrss'}/> : <StakeH2></StakeH2>}
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
			<StakeWrapper>
			{tokenURIs.map((uri, idx) => {
				return (
					<StakeCard key={idx}>
					{tokenids.length > 2 ? <Checkbox checked={state.checked} onClick={() => { handleChange(tokenids[idx]);} } inputProps={{ 'aria-label': 'controlled' }} /> : (null) }
					<StakeH2>Nft Id: {tokenids[idx]}</StakeH2>
					<StakeIcon src={uri} alt={'token'+idx}/>
					{selected.length >= 1 ? (<Stake></Stake>) : (<Stake1 onClick={() => { event ? DoStake([tokenids[idx]]) : DoClaim([tokenids[idx]]);}}>{event}</Stake1>) }
					</StakeCard>
				);})}
			</StakeWrapper>
			{selected.length >= 1 ? (<><StakeH1>Selected NFT Ids: {selected}</StakeH1><StakeMany onClick={() => {event ? DoStake(selected) : DoClaim(selected)}}>{event}</StakeMany></>) : (null) }
		</StakeContainer>	
		</>
	);
}

