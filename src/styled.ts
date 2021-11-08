import styled, { css, keyframes } from "styled-components";

const gradientAnimation = keyframes`
  from {
    left: 0%;
  }
  to {
    left: 100%;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 0.875rem;
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.25em;
  padding: 0.7em 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: #fff;
  color: inherit;
  appearance: none;

  &:hover {
    border-color: #cbd5e0;
  }

  &:focus {
    outline-color: #0080ff;
  }

  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  &:disabled {
    cursor: default;
    background-color: #f2f2f2;
  }
`;

export const Switch = styled.button`
  border-radius: 50%;
  min-height: 2.5rem;
  align-self: flex-end;
  background: #f8f8f8;
  margin: 0 1rem;
  height: 2rem;
  padding: 0 0.75rem;
  border: 0;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    background: #f0f0f0;
  }

  span {
    &::before {
      content: "";
      border: solid #6e6e6e;
      border-width: 0 0.125rem 0.125rem 0;
      display: inline-block;
      padding: 0.1875rem;
      transform: rotate(135deg);
    }
    &::after {
      content: "";
      border: solid #6e6e6e;
      border-width: 0 0.125rem 0.125rem 0;
      display: inline-block;
      padding: 0.1875rem;
      transform: rotate(-45deg);
    }
  }
`;

export const Form = styled.form`
  display: flex;
`;

export const Section = styled.section`
  padding: 2.5rem;
  border-radius: 0.5rem;
  min-height: 18.125rem;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(35 55 80 / 30%) 0px 0.375rem 0.75rem;
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0%;
  margin: 0%;
  border: none;

  & + fieldset {
    margin-left: 1rem;
  }
`;

export const Result = styled.div<{ isLoading?: boolean }>`
  margin-top: 3rem;
  ${({ isLoading }) =>
    isLoading &&
    css`
      p {
        background: #f8f8f8;
        color: transparent;
        width: 30%;
        position: relative;
        overflow: hidden;
        &::before {
          content: "";
          position: absolute;
          left: 0%;
          top: 0;
          height: 100%;
          width: 3.125rem;
          background: linear-gradient(
            to right,
            #f8f8f8 25%,
            #f5f5f5 50%,
            #f8f8f8 100%
          );
          animation-name: ${gradientAnimation};
          animation-duration: 2s;
          animation-iteration-count: infinite;
          filter: blur(5px);
        }
      }
    `}
`;

export const FromLabel = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const ToLabel = styled.p`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

export const RateLabel = styled.p`
  font-size: 1rem;
  color: #6e6e6e;
`;

export const Main = styled.main`
  min-height: 100vh;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  margin: 1.875rem auto;

  h1 {
    text-align: center;
  }
`;
