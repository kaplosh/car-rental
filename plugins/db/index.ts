import { DbResult, DbRecord, DbSearchData, DbQueryParams } from '~/plugins/db/types';
import { InMemoryDb } from '~/plugins/db/InMemoryDb';

export default defineNuxtPlugin(() => {
  const active = ref(false);

  function assureActive () {
    if (!active.value) active.value = InMemoryDb.read();
    if (!active.value) throw new Error('DB is inaccessible');
  }

  const db = Object.freeze({
    active,

    search (
      tableName: string,
      params: DbQueryParams = {},
    ): Promise<DbResult<DbSearchData>> {
      try {
        assureActive();
        return Promise.resolve({
          ok: true,
          data: InMemoryDb.getRecords(tableName, params),
        },
        );
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

    create (
      tableName: string,
      data: Omit<DbRecord, 'id'>,
    ): Promise<DbResult> {
      try {
        assureActive();
        InMemoryDb.createRecord(tableName, data);
        return Promise.resolve({ ok: true, data: undefined });
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

    update (
      tableName: string,
      data: DbRecord,
    ): Promise<DbResult> {
      try {
        assureActive();
        InMemoryDb.updateRecord(tableName, data);
        return Promise.resolve({ ok: true, data: undefined });
      } catch (error) {
        return Promise.resolve({
          ok: false,
          error,
        });
      }
    },

    delete (
      tableName: string,
      id: string,
    ): Promise<DbResult> {
      try {
        assureActive();
        InMemoryDb.deleteRecord(tableName, id);
        return Promise.resolve({ ok: true, data: undefined });
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
