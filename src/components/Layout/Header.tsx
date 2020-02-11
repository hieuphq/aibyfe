import React from 'react';
import styled from 'styled-components';
// import tw from 'tailwind.macro';
// import Logo from '../Logo';
// import { ReactComponent as BurgerIcon } from './menu.svg';

// ${tw`flex items-center justify-between px-6 bg-white px-4 border-b border-grey`}
const Container = styled.header`
  height: 56px;
`;

// ${tw`flex items-center justify-center`}
const BurgerButton = styled.button`
  margin-right: 20px;
  width: 24px;
  height: 24px;
  outline: none !important;
`;

export interface LayoutHeaderProps {
  extraLeft?: React.ReactNode | React.FC<{ collapsed: boolean }>;
  extraRight?: React.ReactNode | React.FC<{ collapsed: boolean }>;
  toggleCollapsed: () => void;
}

export default function Header({
  toggleCollapsed,
  extraLeft,
  extraRight
}: LayoutHeaderProps) {
  return (
    <Container>
      <div className="flex items-center">
        <BurgerButton
          data-testid="toggle-sidebar-collapse-btn"
          onClick={toggleCollapsed}
        >
          {/* <BurgerIcon /> */}
        </BurgerButton>
        {/* <Logo hasText /> */}
        {extraLeft}
      </div>
      {extraRight && <div>{extraRight}</div>}
    </Container>
  );
}
