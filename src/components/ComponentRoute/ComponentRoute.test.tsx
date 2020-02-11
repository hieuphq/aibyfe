import React from 'react';
import { render } from '@testing-library/react';
import ComponentRoute from '.';
import { RouteComponentProps } from '@reach/router';

const ValidPage: React.FunctionComponent<RouteComponentProps> = () => {
  return <div data-testid="valid-component" />;
};

const InvalidPage: React.FunctionComponent<RouteComponentProps> = () => {
  throw Error('error');
};

describe('<ComponentRoute/>', () => {
  it('Should render Component if no error thrown', () => {
    const { getByTestId } = render(
      <ComponentRoute path="/" Component={ValidPage} />,
    );
    expect(getByTestId('valid-component')).toBeDefined();
  });

  it('Should render Alert if error thrown', () => {
    const { getByText } = render(
      <ComponentRoute path="/" Component={InvalidPage} />,
    );
    expect(getByText('Something Wrong')).toBeDefined();
    expect(
      getByText('Try to reload the page or back to home page'),
    ).toBeDefined();
  });
});
