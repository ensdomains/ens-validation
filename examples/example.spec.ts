import { validate } from '@src/index';
describe('test', () => {
  it('should import validate function', () => {
    expect(validate.name).toEqual('validate');
  });
});
