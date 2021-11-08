import React from "react";
import { FXOption } from "../hooks";
import { Label, Fieldset } from "../styled";
import Select, { SingleValue } from "react-select";
import { useFXCurrencies } from "../AppProviders";
import styled from "styled-components";

export type Option = SingleValue<FXOption>;

const Field = styled(Fieldset)`
  .select__control {
    border-color: #e2e8f0;

    &:hover {
      border-color: #cbd5e0;
    }
  }

  .select__value-container {
    padding: 0.21875rem 0.5rem;
    font-size: 0.9rem;
  }

  .select__menu {
    font-size: 0.9rem;
    margin-top: 0.03125rem;
  }
`;

type Props = {
  currency: Option;
  name: string;
  isLoading: boolean;
  onChange: React.Dispatch<React.SetStateAction<Option>>;
};

export function Currency({ currency, name, onChange, isLoading }: Props) {
  const { currencies } = useFXCurrencies();

  return (
    <Field aria-label={name}>
      <Label htmlFor={name}>{name}</Label>
      <Select
        classNamePrefix="select"
        id={name}
        value={currency}
        options={currencies}
        onChange={onChange}
        isDisabled={isLoading}
      />
    </Field>
  );
}
