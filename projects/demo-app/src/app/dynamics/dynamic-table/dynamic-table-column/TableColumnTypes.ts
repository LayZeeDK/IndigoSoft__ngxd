// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TableColumnTypes {
  export function getTypes(): TableColumnTypesKeyValue[] {
    return Object.values(TableColumnTypes)
      .filter((_): _ is TableColumnTypesKeyValue['key'] => typeof _ === 'string')
      .map((key) => ({ key, value: TableColumnTypes[key] }));
  }
}

export interface TableColumnTypesKeyValue {
  key: Exclude<keyof typeof TableColumnTypes, 'getTypes'>;
  value: TableColumnTypes;
}

export enum TableColumnTypes {
  Id,
  Icon,
  Text,
  Actions,
}
