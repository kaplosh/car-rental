import { DataTableColumn } from '~/components/DataTable/types';

export function defineDataTableColumns (list: DataTableColumn[]) {
  return Object.freeze(list);
}
