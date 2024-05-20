import { GET } from '@/app/api/getAllCharacter/route'; // Adjust the path to the actual location of your service

global.fetch = jest.fn();

describe('GET characters', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns character data if the API call is successful', async () => {
    const mockCharacters = {
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCharacters,
    });

    const result = await GET();

    expect(result.status).toBe(200);
    const json = await result.json();
    expect(json).toEqual(mockCharacters.results);
  });

  test('returns error if the API call fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await GET();

    expect(result.status).toBe(404);
    const json = await result.json();
    expect(json).toEqual({ error: 'Failed to fetch characters' });
  });

  test('returns 500 if there is an internal server error', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    (fetch as jest.Mock).mockRejectedValue(new Error('Internal server error'));

    const result = await GET();

    expect(result.status).toBe(500);
    const json = await result.json();
    expect(json).toEqual({ error: 'Internal server error' });

    console.error = originalConsoleError; // Restore the original console.error
  });
});
