import styled from 'styled-components'; 

export const StakedContainer = styled.div`
  height: auto;
  min-height: 100% !important;
  padding-bottom:100px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background:  #fff};  

  @media screen and (max-width: 768px) {
    height: fit-content;
  }

  @media screen and (max-width: 480px) {
    height: fit-content; 
  }
`;

export const StakedWrapper = styled.div`
  max-width: 1000px; 
  margin: 0 auto;
  display: flex; 
  flex-wrap: wrap;  
  flex: 0 0 30%;
  
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start; 
  grid-gap: 16px; 
  padding: 0 100px;
  border-radius: 100px; 

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 115px; 
  }
`;

export const StakedCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  border-radius: 40px; 
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  width: fit-content;
  margin-top:10px;
  
  height: fit-content;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const StakedC = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  border-radius: 40px; 
  margin-top: 20px;
  width: 300px;
  height: 150px;
  box-shadow: 0 7px 7px rgba(0,0,0,.4);
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const StakedIcon = styled.img`
  height: 250px;
  width: 250px;
`;

export const ReloadIcon = styled.img`
  height: 250px;
  width: 250px;  
  margin-top:-75px;
  margin-bottom:-50px;
`;

export const RefreshIcon = styled.img`
  margin: 18px;
  height: 25px;
  width: 25px;

  &:hover {
      transform: scale(1.02);
      transition: all .2s ease-in-out;
      cursor: pointer;
  }
`;

export const StakedH1 = styled.h1`
  font-size: 2.5rem;
  color: #010606;
  margin-top: 80px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const StakedH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const StakedH3 = styled.h3`
  color: #010606;
  font-size: 1rem;
  margin-top: 100px;
  margin-bottom: -50px
`;

export const StakedH4 = styled.h4`
  color: #010606;
  font-size: 1rem;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const Staked1 = styled.p`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background: #00A300;
  width: 100%;
  height: 50px;
  border-radius: 00px 00px 40px 40px;
  box-shadow: 0 7px 7px rgba(0,0,0,.4);
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.00);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const Staked = styled.p`
  background: white;
  width: 100%;
  height: 50px;
  border-radius: 00px 00px 40px 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  }
`;


export const StakedMany = styled.p`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background: #00A300;
  width: 100px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 40px ;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

