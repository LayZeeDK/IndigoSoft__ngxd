// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TableColumnTypes {
  export function getTypes(): { key; value }[] {
    return Object.values(TableColumnTypes)
      .filter((_) => typeof _ === 'string')
      .map((key: string) => ({ key, value: TableColumnTypes[key] }));
  }
}

export enum TableColumnTypes {
  Id,
  Icon,
  Text,
  Actions,
}
