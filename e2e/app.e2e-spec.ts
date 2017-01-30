import { SjContractsFrontendPage } from './app.po';

describe('sj-contracts-frontend App', function() {
  let page: SjContractsFrontendPage;

  beforeEach(() => {
    page = new SjContractsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
