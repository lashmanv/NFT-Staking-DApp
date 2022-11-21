import React from 'react';
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
} from './InfoElements';
import { Button2 } from '../ButtonElements'; 

const InfoSection = ({
  id, 
  lightBg, 
  lightText, 
  lightTextDesc, 
  topLine, 
  headline, 
  description, 
  buttonLabel, 
  imgStart, 
  img, 
  alt, 
  primary, 
  darkText, 
}) => {
  return (
    <>
      <InfoContainer id={id} lightBg={lightBg}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                <BtnWrap>
                  <Button2 
                    to="home"
                    primary = "true"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    {buttonLabel}
                  </Button2>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
