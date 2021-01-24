import HomePage from '../pageobjects/home.page';

describe('HomePage', () => {
  beforeEach(() => {
    HomePage.open('/');
  });

  it('should display header', () => {
    const headerContent = HomePage.getHeaderText();
    expect(headerContent).toBe('Paymentsense Coding Challenge!');
  });
});


