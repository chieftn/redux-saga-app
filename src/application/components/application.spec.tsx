import * as React from 'react';
import { render } from '@testing-library/react';
import { Application } from './application';

describe('application', () => {
    it('runs test', () => {
        expect(1).toEqual(1);
    });

    it('renders', () => {
        const { container, asFragment } = render(<Application />);
        expect(container).toMatchSnapshot();
    });
});
