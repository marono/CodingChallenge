import { TestScheduler } from 'rxjs/testing';

const creator = () => new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

export default creator;
