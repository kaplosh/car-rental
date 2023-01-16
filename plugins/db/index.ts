interface Record {
    [attr: string]: any;
    id: string;
}

interface Result {
    ok: boolean;
    data?: any;
    error?: any;
    message?: string;
}

export default defineNuxtPlugin(() => {
  const db = Object.freeze({

    create (tableName: string, data: Omit<Record, 'id'>): Promise<Result> {
      try {
        return Promise.resolve({ ok: false });
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

    query (tableName: string, params: any): Promise<Result> {
      return Promise.resolve({
        ok: true,
        data: {
          page: 1,
          per_page: 10,
          total: 14,
          list: [
            {
              id: '1',
              brand: 'Fiat',
              type: 'Punto',
              engine: 'B',
              seats: 4,
            },
          ],
        },
      });
    },

  });

  return {
    provide: {
      db,
    },
  };
});
