import request from 'supertest';
import axios from 'axios';
import app from '../../app';
import { getCache, setCache } from '../../utils/cache';

jest.mock('axios');
jest.mock('../../utils/cache.ts');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGetCache = getCache as jest.Mock;
const mockedSetCache = setCache as jest.Mock;

afterAll((done) => {
  done();
});

describe('GET /convert', () => {
  it('should convert currency using mocked exchange rate', async () => {
    mockedGetCache.mockResolvedValue(null);
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        rates: {
          EUR: 0.85,
        },
      },
    });
    mockedSetCache.mockResolvedValue(undefined);

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
