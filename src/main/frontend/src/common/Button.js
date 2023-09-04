import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props => 
    props.fullWidth &&
    css`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    width: 100%;
    font-size: 1.125rem;
    `}

  ${props => 
      props.violet &&
      css`
      background: ${palette.violet[5]};
      &:hover {
        transition: all .3s;
        background: ${palette.violet[8]};
      }
  `}

  ${props => 
      props.red &&
      css`
      background: ${palette.red[5]};
      &:hover {
        transition: all .3s;
        background: ${palette.red[8]};
      }
  `}

  ${props => 
    props.gray &&
    css`
    background: ${palette.gray[5]};
    &:hover {
      transition: all .3s;
      background: ${palette.gray[8]};
    }
`}

${props => 
  props.green &&
  css`
  background: ${palette.green[5]};
  &:hover {
    transition: all .3s;
    background: ${palette.green[9]};
  }
`}
`;




const Button = props => <StyledButton {...props} />;

export default Button