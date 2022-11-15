import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return <LayoutBox>{props.children}</LayoutBox>;
};

export default Layout;

const LayoutBox = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  min-width: 800px;
`;
