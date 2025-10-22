import { render } from '@testing-library/react';

import Yaku from './yaku';

describe('Yaku', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Yaku />);
        expect(baseElement).toBeTruthy();
    });
});
