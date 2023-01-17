import { DbActionResult, DbQueryParams, DbRecord } from '~/plugins/db/types';

export default defineNuxtPlugin(() => {
  const db = Object.freeze({

    create (tableName: string, data: Omit<DbRecord, 'id'>): Promise<DbActionResult> {
      try {
        return Promise.resolve({ ok: false });
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

    search (tableName: string, params: DbQueryParams = {}): Promise<DbActionResult> {
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
