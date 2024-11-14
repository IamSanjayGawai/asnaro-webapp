const request = require('supertest');
const { app } = require('../index'); 
// Mock functions
const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockCountDocuments = jest.fn();

// Mocking the DtbAvailability model directly in the test file
jest.mock('../models/Availibility', () => ({
  find: mockFind,
  findOne: mockFindOne,
  countDocuments: mockCountDocuments
}));

describe('searchProcessesTest', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockFind.mockClear();
    mockFindOne.mockClear();
    mockCountDocuments.mockClear();
  });

  test('should return 200 and process data on valid request', async () => {
    mockFind.mockResolvedValue([...mockedProcessData]); // Mocked response for .find()
    mockFindOne.mockResolvedValue(mockedAvailabilityData); // Mocked response for .findOne()
    mockCountDocuments.mockResolvedValue(100); // Mock total count

    const response = await request(app)
      .post('/process/search')
      .send({
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        keyword: 'CNC',
        page: 1,
        pageSize: 10
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(expect.arrayContaining([...expectedData])); // Define expectedData based on your mocked response
    expect(mockFind).toHaveBeenCalled();
  });

  test('should handle errors gracefully', async () => {
    mockFind.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/process/search')
      .send({
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        keyword: 'CNC',
        page: 1,
        pageSize: 10
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });

  // Additional tests can be written to cover other scenarios and edge cases
});