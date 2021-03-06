const db = require('../../src/app/functions/databaseFunctions');
const constant = require('../../src/app/config/constants');

describe('Insert function validation', () => {
  it('should not be able to insert record in an inexisting table', async () => {
    const response = await db.insert(
      { id: 99999999, type: 'call.new', typeRating: 1, isFirstContact: true },
      'TB_X'
    );
    expect(response.status).toBe(1);
    expect(response.message).toBe('Table not found.');
  });
  it('should not be able to insert an invalid record', async () => {
    const response = await db.insert({}, constant.TABLE_CUSTOMERS);
    expect(response.status).toBe(2);
    expect(response.message).toBe('Invalid record.');
  });
  it('should be able to insert a valid record', async () => {
    const response = await db.insert(
      { id: 99999999, type: 'call.new', typeRating: 1, isFirstContact: true },
      constant.TABLE_CUSTOMERS
    );
    expect(response.status).toBe(0);
  });
  it('should not be able to insert an id with duplicity', async () => {
    const response = await db.insert(
      { id: 99999999, type: 'call.new', typeRating: 1, isFirstContact: true },
      constant.TABLE_CUSTOMERS
    );
    expect(response.status).toBe(3);
    expect(response.message).toBe('Id with duplicity.');
  });
});

describe('Update function validation', () => {
  it('should not be able to update record in a inexisting table', async () => {
    const response = await db.update(
      {
        id: 99999999,
        type: 'call.standby',
        typeRating: 1,
        isFirstContact: false
      },
      'TB_X'
    );
    expect(response.status).toBe(1);
    expect(response.message).toBe('Table not found.');
  });
  it('should not be able to update an invalid record', async () => {
    const response = await db.update({}, constant.TABLE_CUSTOMERS);
    expect(response.status).toBe(2);
    expect(response.message).toBe('Invalid record.');
  });
  it('should not be able to update a inexistent record', async () => {
    const response = await db.update(
      {
        id: 11111111,
        type: 'call.standby',
        typeRating: 2,
        isFirstContact: false
      },
      constant.TABLE_CUSTOMERS
    );
    expect(response.status).toBe(4);
  });
  it('should be able to update a valid record', async () => {
    const response = await db.update(
      {
        id: 99999999,
        type: 'call.standby',
        typeRating: 2,
        isFirstContact: false
      },
      constant.TABLE_CUSTOMERS
    );
    expect(response.status).toBe(0);
  });
});

describe('Find by id validation', () => {
  it('should be able to find an existing record', async () => {
    const response = await db.findById(99999999, constant.TABLE_CUSTOMERS);
    expect(response.id).toBe(99999999);
    expect(response.type).toBe('call.standby');
    expect(response.typeRating).toBe(2);
  });
  it('should not be able to find an inexisting record', async () => {
    const response = await db.findById(11111111, constant.TABLE_CUSTOMERS);
    expect(response).toBeUndefined();
  });
});

describe('Active call listing validation', () => {
  it('should be able to list the active calls', async () => {
    const response = await db.listActiveCalls(constant.TABLE_CUSTOMERS);
    expect(response.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Validation of record delete ', () => {
  it('should be able to delete an existing record', async () => {
    const response = await db.delete(99999999, constant.TABLE_CUSTOMERS);
    const searchObject = await db.findById(99999999, constant.TABLE_CUSTOMERS);
    expect(response.status).toBe(0);
    expect(searchObject).toBeUndefined();
  });
});
