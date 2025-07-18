import request from 'supertest';
import axios from 'axios';
import app from '../../app';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterAll((done) => {
  done();
});

describe('GET /convert', () => {
  it('should convert currency using mocked exchange rate', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        rates: {
          USD: 1,
          EUR: 0.85,
        },
      },
    });

    const response = await request(app)
      .get('/api/convert')
      .query({ from: 'USD', to: 'EUR', amount: 100 });

    expect(response.status).toBe(200);
    expect(response.body.data.converted).toBe(85);
  });

  it('should return 400 if parameters are missing', async () => {
    const response = await request(app).get('/api/convert');
    expect(response.status).toBe(400);
  });
});
