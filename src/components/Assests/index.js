import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import {
  StakedContainer,
  StakedH1,
  StakedWrapper,
  StakedCard,
  StakedIcon,  
  ReloadIcon,
  RefreshIcon,
  StakedH2,
  StakedC,
  Staked,
  Staked1,
  StakedMany
} from './StakedElements'

import bar from '../../images/bar.gif';
import refresh from '../../images/refresh.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NFT from "../../artifacts/contracts/NftStaking.sol/NFT.json";

export default function StakedTokens(props) {
	const [state, setState] = useState([{checked: false}]);
	
	const[selected, setSelected] = useState([]);
	const[loading, setLoading] = useState(true);
	const [totalSupply, setTotalSupply] = useState(null);
	const [userTokens, setUserTokens] = useState([]);
	const [tokenids, settokenids] = useState([]);
	const [tokenURIs, setTokenURIs] = useState([]);

	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);

	const [contract, setContract] = useState();

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
	

	const DoUnStake = async (e) => {
		if(!props || !contract || props.network!==5) return;
		console.log("loading...");
		console.log(e);
		let id ;
		if(e.length > 1) {id = [e];}
		id = e;
		try{
			const transaction = await props.contract.unstakeNft(id);
			await transaction.wait;
			console.log(transaction);
			setTimeout(GetTokenURIs(totalSupply), 15000);
      	} 
		catch (error) {
			//if((error?.data?.message.includes("user rejected transaction") || error?.message.includes("user rejected transaction")));
			setError(error?.reason);
			notify(error.reason);
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
	const GetTokenURIs = async (userTokens) => {
		if(props.network !== 5) return;
		let tokens = [];
		let ids = [];
		// Taking advantage of the fact that token IDs are an auto-incrementing integer starting with 1.
		// Starting with userTokens and counting down to 1 gives us the tokens in order of most recent.
		for(let idx = 0; idx < userTokens.length; idx++){
			try{
				// Get the metadata URI associated with the token.
				let tokenURI = await contract.tokenURI(userTokens[idx]);
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
			catch(e){
				// Either the contract call or the fetch can fail. You'll want to handle that in production.
				console.log('Error occurred while fetching metadata.',e)
			}
		}

		// Update the list of available asset URIs
		if(tokens.length) setTokenURIs([...tokens]); settokenids([...ids]); 
	};

	useEffect(() => {
		(async () => {
			if(!props || !contract || !props.address || props.network!==5) return;
			try{
				const transaction = await props.contract.tokensOfOwner(props.address);
				await transaction.wait;
				setTotalSupply(transaction.length);
				let ids=[];
				for(let i = 0; i < transaction.length; i++) {
					ids.push(parseInt(transaction[i]._hex));
				}
				if(ids.length > 0)	setUserTokens(ids);
				}
			catch (error) {
				setError(error?.data?.message);
				console.log(error);
			}
		})();
	  
	});

	useEffect(() => {
		setTimeout(() => setError(false), 10000);
		setTimeout(() => setSuccess(false), 10000);
		fetchMyAPI();
	  }, [error], [success],[]);

	const closeLoaderIn5Seconds = () => {
		setTimeout(() => setLoading(false), 10000);
		};

	// Handle contract unavailable. 
	// This is an extra precaution since the user shouldn't be able to get to this page without connecting.
	//if(!props.contract) return (<div classNameName="page error">Contract Not Available</div>);

	// Display the personal token gallery
	if(!props.address) {
		return (
			<StakedContainer id="staked">
				<StakedH1>Staked Reward</StakedH1>
				<StakedC>
				<StakedH2>Connect the Wallet </StakedH2>
				<StakedH2> To view the assests</StakedH2>
				</StakedC>
			</StakedContainer>	
		);
	}

	// Set up the list of available token URIs when the component mounts.
	if(userTokens.length && !tokenURIs.length) GetTokenURIs(userTokens);

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
	
	if(!tokenURIs){return(<StakedH1>Loading...</StakedH1>)}
	return (
		<>
 			<StakedContainer id="staked">
			 <StakedH1>User Assests <RefreshIcon src={refresh} alt={"refresh"} onClick={() => {setLoading(true); closeLoaderIn5Seconds(); GetTokenURIs(userTokens);}}/> </StakedH1>
			 {loading ? <ReloadIcon src={bar} alt={'progrss'}/> : <StakedH2></StakedH2>}
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
			<StakedWrapper>
			{tokenURIs.map((uri, idx) => {
				return (
					<StakedCard key={idx}>
					<>
						<StakedH2>Nft Id: {tokenids[idx]}
						{tokenids.length > 2 ? 
						<Checkbox icon={<CircleUnchecked />} checkedIcon={<CircleChecked />} onClick={() => { handleChange(tokenids[idx]);} } inputProps={{ 'aria-label': 'controlled' }} /> : (null) }
						</StakedH2>
					</>
					<StakedIcon src={uri} alt={'token'+idx}/>
					{selected.length >= 1 ? (<Staked></Staked>) : (<Staked1 onClick={() => { DoUnStake([tokenids[idx]]);}}>Unstake</Staked1>) }
					</StakedCard>
				);})}
			</StakedWrapper>
			{selected.length >= 1 ? (<><StakedH1>Selected NFT Ids: {selected}</StakedH1><StakedMany onClick={() => DoUnStake(selected)}>UnStake</StakedMany></>) : (null) }
		</StakedContainer>	
		</>
	);
}

