import { TocService } from '@/infra/post/service/toc';

jest.mock('@/lib/helpers/random', () => ({
  getRandomString: () => '1',
}));

const tocService = new TocService();
const svg = '<svg class="icon icon-link" role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="paperclipIconTitle" stroke="#2329EE" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#131996"><path d="M7.93517339,13.7795989 L15.1617306,6.55304173 C16.03921,5.67631227 17.4656766,5.67631227 18.343156,6.55304173 C19.2206355,7.43052116 19.2206355,8.85773771 18.343156,9.73521714 L8.40091248,19.5477137 C6.93619681,21.0124294 4.56325242,21.0124294 3.09853675,19.5477137 C1.63382108,18.083748 1.63382108,15.7093037 3.09853675,14.245338 L12.9335328,4.53783896 C14.9839848,2.48738701 18.3094068,2.48738701 20.3568588,4.53783896 C22.4088107,6.58904088 22.4088107,9.91146301 20.3583588,11.961915 L13.2390491,19.0819746"></path></svg>';
describe('process', () => {
  it('should do nothing', async () => {
    expect(await tocService.process('<html><head></head><body><span></span></body></html>', [])).toBe('<html><head></head><body><span></span></body></html>');
  });

  it('should not add toc', async () => {
    expect(await tocService.process('<html><head></head><body></body></html>')).toBe('<html><head></head><body><span></span></body></html>');
    expect(await tocService.process('<html><head></head><body><h2>test</h2></body></html>')).toBe(`<html><head></head><body><span></span><h2 id="test">test<a aria-hidden="true" tabindex="-1" href="#test">${svg}</a></h2></body></html>`);
    expect(await tocService.process('<html><head></head><body><h2>test2</h2><h3>test3</h3></body></html>')).toBe(`<html><head></head><body><span></span><h2 id="test2">test2<a aria-hidden="true" tabindex="-1" href="#test2">${svg}</a></h2><h3 id="test3">test3<a aria-hidden="true" tabindex="-1" href="#test3">${svg}</a></h3></body></html>`);
  });

  it('should add toc', async () => {
    expect(await tocService.process('<html><head></head><body><h2>test2-1</h2><h3>test3</h3><h2>test2-2</h2></body></html>')).toBe(`<html><head></head><body><div class="toc-wrapper"><input type="checkbox" class="toc-checkbox" id="toc-checkbox-1" checked><label class="toc-title" for="toc-checkbox-1">目次</label><nav class="toc"><ol class="toc-level toc-level-1"><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#test2-1">test2-1</a><ol class="toc-level toc-level-2"><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#test3">test3</a></li></ol></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#test2-2">test2-2</a></li></ol></nav></div><h2 id="test2-1">test2-1<a aria-hidden="true" tabindex="-1" href="#test2-1">${svg}</a></h2><h3 id="test3">test3<a aria-hidden="true" tabindex="-1" href="#test3">${svg}</a></h3><h2 id="test2-2">test2-2<a aria-hidden="true" tabindex="-1" href="#test2-2">${svg}</a></h2></body></html>`);
  });
});
