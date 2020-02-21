import React from 'react';
import { RouteComponentProps } from '@reach/router';
import HomeLayout from 'components/HomeLayout';

export interface ProjectPageProps extends RouteComponentProps {}

export const ProjectPage: React.FC<ProjectPageProps> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};
