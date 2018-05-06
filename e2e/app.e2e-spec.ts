import { BytAppPage } from './app.po';

describe('byt-app App', () => {
  let page: BytAppPage;

  beforeEach(() => {
    page = new BytAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
