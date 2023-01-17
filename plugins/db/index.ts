import { DbActionResult, DbRecord } from '~/plugins/db/types';
import { InMemoryDb } from '~/plugins/db/InMemoryDb';

export default defineNuxtPlugin(() => {
  const active = ref(false);

  function assureActive () {
    if (!active.value) active.value = InMemoryDb.read();
    if (!active.value) throw new Error('DB is inaccessible');
  }

  const db = Object.freeze({
    active,

    create (tableName: string, data: Omit<DbRecord, 'id'>): Promise<DbActionResult> {
      try {
        assureActive();
        InMemoryDb.createRecord(tableName, data);
        return Promise.resolve({ ok: true });
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

    search (tableName: string): Promise<DbActionResult> {
      try {
        assureActive();
        const records = InMemoryDb.getRecords(tableName);
        return Promise.resolve({
          ok: true,
          data: {
            page: 1,
            perPage: 10,
            total: records.length,
            list: records.slice(0, 10),
          },
        },
        );
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

  });

  return {
    provide: {
      db,
    },
  };
});
