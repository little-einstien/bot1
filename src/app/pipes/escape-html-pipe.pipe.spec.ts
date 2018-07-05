import { EscapeHtmlPipePipe } from './escape-html-pipe.pipe';

describe('EscapeHtmlPipePipe', () => {
  it('create an instance', () => {
    const pipe = new EscapeHtmlPipePipe();
    expect(pipe).toBeTruthy();
  });
});
