import React, { useState } from 'react';
import {
  HeroBg,
  HeroContainer,
  VideoBg,
  HeroContent, 
  HeroH1, 
  HerorP, 
  HeroBtnWrapper, 
  ArrowForward, 
  ArrowRight, 
} from './HeroElements';
import {
  Button, 
} from '../ButtonElements'; 
import Video from '../../videos/bit (2).mp4';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => setHover(!hover);

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Mining and Staking is made easy now</HeroH1>
        <HerorP>
          Mint our NFT now and receive bitcoin rewards every month. 
        </HerorP>
        <HeroBtnWrapper>
          <Button 
            to="mint" 
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
