import {creditCardSchema} from './creditCardValidation';

const validCard = {
  cardNumber: '4111111111111111',
  firstName: 'Gandalf',
  lastName: 'The Grey',
  cvv: '123',
  expiryDate: '12/25',
};

describe('creditCardSchema', () => {
  it('should validate a valid credit card', async () => {
    await expect(creditCardSchema.validate(validCard)).resolves.toEqual(
      validCard,
    );
  });

  it('should invalidate an incorrect card number', async () => {
    const invalidCardNumber = '1234567890123456';

    await expect(
      creditCardSchema.validate({...validCard, cardNumber: invalidCardNumber}),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Invalid card number"`);
  });

  it('should invalidate a non-alphabetic first name', async () => {
    const invalidFirstName = 'Gandalf123';

    await expect(
      creditCardSchema.validate({...validCard, firstName: invalidFirstName}),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Only alphabetic characters and spaces are allowed"`,
    );
  });

  it('should invalidate a non-alphabetic last name', async () => {
    const invalidLastName = 'The G123';

    await expect(
      creditCardSchema.validate({...validCard, lastName: invalidLastName}),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Only alphabetic characters and spaces are allowed"`,
    );
  });

  it('should invalidate an incorrect CVV', async () => {
    const invalidCvv = '12';

    await expect(
      creditCardSchema.validate({...validCard, cvv: invalidCvv}),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"CVV must be either 3 or 4 digits"`,
    );
  });

  it('should invalidate an incorrect expiry date format and an expired card', async () => {
    const invalidExpiryDateFormat = '1225';
    const expiredCard = '12/20';

    const error1 = await creditCardSchema
      .validate({...validCard, expiryDate: invalidExpiryDateFormat})
      .catch(e => e);

    const error2 = await creditCardSchema
      .validate({...validCard, expiryDate: expiredCard})
      .catch(e => e);

    expect(error1.message).toMatchInlineSnapshot(
      `"Expiry date must be in the future"`,
    );
    expect(error2.message).toMatchInlineSnapshot(
      `"Expiry date must be in the future"`,
    );
  });
});
