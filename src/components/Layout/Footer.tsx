import React from 'react';
// import tw from 'tailwind.macro';
import styled from 'styled-components';

// ${tw`px-6 pb-3 bg-white fixed p-3`}
const Container = styled.footer<{
  collapsed: number;
  spaceX: number;
  isOnMobile: boolean;
}>`
  transition: all 0.2s ease;
  z-index: 99;
  left: ${({ collapsed, spaceX, isOnMobile }) =>
    collapsed
      ? `${isOnMobile ? spaceX : 64 + spaceX}px`
      : `${isOnMobile ? spaceX : 220 + spaceX}px`};
  right: ${({ spaceX }) => 0 + spaceX}px;
  bottom: 0;
  min-height: 56px;
`;

export interface LayoutFooterProps {
  collapsed?: boolean;
  extraLeft?: React.ReactNode;
  extraRight?: React.ReactNode;
  extraTop?: React.ReactNode;
  spaceX?: number;
  isOnMobile?: boolean;
}

export default function Footer({
  collapsed,
  extraLeft,
  extraRight,
  extraTop,
  spaceX = 16,
  isOnMobile = false
}: LayoutFooterProps) {
  return (
    <Container
      collapsed={collapsed ? 1 : 0}
      spaceX={spaceX}
      isOnMobile={isOnMobile}
    >
      {extraTop && (
        <div className="border-b border-grey mb-3 py-3">{extraTop}</div>
      )}
      <div className="flex items-center justify-between">
        <div className="justify-start">{extraLeft && extraLeft}</div>
        {extraRight && <div className="justify-end">{extraRight}</div>}
      </div>
    </Container>
  );
}
