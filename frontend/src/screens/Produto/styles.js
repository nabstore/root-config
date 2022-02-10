import { Link } from "react-router-dom";
import styled from "styled-components";

const GoBackLink = styled(Link)`
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
  color: #212223;
`;

const Card = styled.div`
  width: 100%;
  margin: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 13px;
  padding: 20px 30px;
`;

const Title = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  color: #3a3a3a;
`;

const Subtitle = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 10px;
  letter-spacing: -0.04em;
  color: #7e7e7e;
`;

const DetailsTitle = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #3a3a3a;
`;

const Details = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: #585757;
`;

const Price = styled.h1`
  font-family: Open Sans;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #323232;
  margin: 30px 0 0 0;
`;

const Estoque = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 10px;
  text-align: center;
  letter-spacing: -0.04em;
  color: #7a7a7a;
`;

const ValorEntrega = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: green;
`;

export {
  GoBackLink,
  ValorEntrega,
  Card,
  Price,
  Estoque,
  Title,
  Subtitle,
  Details,
  DetailsTitle,
};
