import { NextRequest } from 'next/server';
import { GET } from '@/app/api/findCharacter/[id]/route'; // Adjust the path to the actual location of your service

global.fetch = jest.fn();

describe('GET character by ID', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns 400 if ID is not provided', async () => {
    const req = {} as NextRequest;
    const params = { id: '' };

    const result = await GET(req, { params });

    expect(result.status).toBe(400);
    const json = await result.json();
    expect(json).toEqual({ error: 'Character ID is required' });
  });

  test('returns 404 if character is not found', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const req = {} as NextRequest;
    const params = { id: 'nonexistent-id' };

    const result = await GET(req, { params });

    expect(result.status).toBe(404);
    const json = await result.json();
    expect(json).toEqual({ error: 'Failed to fetch character' });
  });

  test('returns character data if character is found', async () => {
    const mockCharacter = {
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCharacter,
    });

    const req = {} as NextRequest;
    const params = { id: '1' };

    const result = await GET(req, { params });

    expect(result.status).toBe(200);
    const json = await result.json();
    expect(json).toEqual(mockCharacter);
  });

  test('returns 500 if there is an internal server error', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Internal server error'));

    const req = {} as NextRequest;
    const params = { id: '1' };

    const result = await GET(req, { params });

    expect(result.status).toBe(500);
    const json = await result.json();
    expect(json).toEqual({ error: 'Internal server error' });
  });
});
