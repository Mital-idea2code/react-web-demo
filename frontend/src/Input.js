import React from "react";
import styled from "styled-components";

export default function Input({ type, placeholder }) {
  return type === "textarea" ? (
    <TextareaInput
      placeholder={placeholder && placeholder}
      required
      autoComplete="off"
      rows={5}
    />
  ) : (
    <StyledInput
      type={type ? type : "text"}
      placeholder={placeholder && placeholder}
      required
      autoComplete="off"
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background: #f5f5f5;
  box-shadow: 0px 14px 31px -23px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  padding: 0rem 1rem;
  transition: all 0.2s ease-in;
  &:hover {
    transform: translateY(-3px);
  }
`;

const TextareaInput = styled.textarea`
  width: 100%;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background: #f5f5f5;
  box-shadow: 0px 14px 31px -23px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  padding: 1rem 1rem;
  transition: all 0.2s ease-in;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
