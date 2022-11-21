import styled from 'styled-components'; 
import { Link } from 'react-scroll'; 

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => primary ? "#00A300" : '#010606'};
  white-space: nowrap; 
  padding: ${({ big }) => big ? '14px 48px' : '12px 30px'};
  font-size: ${({ fontBig }) => fontBig ? '20px' : '16px'};
  outline: none;
  border: none; 
  cursor: pointer; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  transition: all .2s ease-in-out; 

  &:hover {
    transition: all .2s ease-ease-in-out; 
    background: ${({ primary }) => primary ? '#fff' : "#00A300"};
  }
`;

export const Button1 = styled.div`
  border-radius: 50px;
  background: ${({ primary }) => primary ? "#00A300" : '#010606'};
  white-space: nowrap; 
  padding: ${({ big }) => big ? '14px 48px' : '12px 30px'};
  font-size: ${({ fontBig }) => fontBig ? '20px' : '16px'};
  outline: none;
  border: none; 
  cursor: pointer; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  transition: all .2s ease-in-out; 

  &:hover {
    transition: all .2s ease-ease-in-out; 
    background: ${({ primary }) => primary ? '#fff' : "#00A300"};
  }
`;

export const Button2 = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => primary ? "#00A300" : '#010606'};
  white-space: nowrap; 
  padding: ${({ big }) => big ? '14px 48px' : '12px 30px'};
  font-size: ${({ fontBig }) => fontBig ? '20px' : '16px'};
  outline: none;
  border: none; 
  cursor: pointer; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  transition: all .2s ease-in-out; 

  &:hover {
    transition: all .2s ease-ease-in-out; 
    background: #fff };
    color: #010606;
  }
`;