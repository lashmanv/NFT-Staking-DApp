import crypto from '../../images/crypto.png';
import piggybankSvg from '../../images/piggybank.svg'; 
import secureDataSvg from '../../images/secure_data.svg';

export const homeObjeOne = {
  id: 'mint', 
  lightBg: true, 
  lightText: false, 
  lightTextDesc: false, 
  topLine: 'Join our team', 
  headline: 'Mint your NFT', 
  description: 'Get everything set up and ready in under 10 minutes. All you need to do is add your information and you\'re ready to go. ',
  buttonLabel: 'Mint', 
  imgStart: false, 
  img: secureDataSvg, 
  alt: 'Secure data', 
  dark: false, 
  primary: false, 
  darkText: true, 
};

export const homeObjeTwo = {
  id: 'discover', 
  lightBg: true, 
  lightText: false, 
  lightTextDesc: false, 
  topLine: 'Unlimited access', 
  headline: 'Login to your account at any time', 
  description: 'We have you covered no matter where you are located. All you need is an internet connnection and a phone or computer.', 
  buttonLabel: 'Learn more', 
  imgStart: true, 
  img: piggybankSvg, 
  alt: 'Piggybank', 
  dark: false, 
  primary: false, 
  darkText: true, 
};

export const homeObjeThree = {
  id: 'about', 
  lightBg: false, 
  lightText: true, 
  lightTextDesc: true, 
  topLine: 'Trusted Miners', 
  headline: 'Claim rewards every month', 
  description: 'Get access to our exclusive app that allows you to claim reward without any hidden fees.', 
  buttonLabel: 'Get started', 
  imgStart: false, 
  img: crypto, 
  alt: 'Crypto', 
  dark: false, 
  primary: false, 
  darkText: false, 
};