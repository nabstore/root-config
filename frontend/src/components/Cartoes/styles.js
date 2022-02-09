import styled from "styled-components";

const CardTitle = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 35px;
  color: #3a3a3a;
`;

const Card = styled.div`
    margin-top: 20px;
    padding: 20px 40px;
    width: 80%;

    &:hover {
      cursor: pointer;
      transition: 0.2s;
      box-shadow: 0 0 1em gray;
    }
`

const Data = styled.span`
  margin-bottom: 10px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.04em;
  color: #7e7e7e;
`;

const Label = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.04em;
  color: #484848;
`;

const AddEnderecoButton = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 8px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin: 0px 10px 0 10px;
  color: #ffffff;
  background: #38c1df;
  border: none;
  opacity: 1;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transition: 0.2s;
    box-shadow: 0 0 1em gray;
  }
`;

export { Data, Label, CardTitle, Card, AddEnderecoButton };
