export const createClient = () => ({
  auth: {
    getUser: jest.fn()
  },
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  mockResolvedValue: function(value) {
    this.from().select().eq.mockResolvedValue(value);
    return this;
  },
  mockImplementation: function(fn) {
    this.from().select().eq.mockImplementation(fn);
    return this;
  }
});