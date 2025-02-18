import { Bank, Scroll } from "phosphor-react";
import { HeaderContainer } from "./styles";
import logo from "/assets/logo.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logo} />
      <nav>
        <NavLink to="" title="Timer">
          <Bank size={24} />
        </NavLink>
        <NavLink to="history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};