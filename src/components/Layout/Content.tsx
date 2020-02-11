import React from 'react';
import styled from 'styled-components';
// import tw from 'tailwind.macro';

// ${tw`font-sans px-4`};
const Container = styled.main<{ hasAlert: boolean }>`
  padding-bottom: 56px;
  min-height: calc(100vh - ${props => (props.hasAlert ? '96px' : '56px')});
`;

export interface LayoutHeaderProps {
  className?: string;
  hasAlert?: boolean;
}

export const Content: React.FC<LayoutHeaderProps> = ({
  hasAlert = false,
  className = '',
  children
}) => {
  return (
    <Container className={className} hasAlert={hasAlert}>
      {children}
    </Container>
  );
};

export default Content;
