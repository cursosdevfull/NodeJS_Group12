import { sum } from './sum';

describe('Test sum', () => {
  it('sum of positive numbers is positive', () => {
    // Arrange
    const a = 20;
    const b = 30;

    // Act
    const result = sum(a, b);

    // Assert

    expect(result).toBeGreaterThan(0);
  });
});
