import { DynamicEntityObject } from '@app/dynamics';
import { TableColumnTypes } from './TableColumnTypes';

export class TableColumn<T = DynamicEntityObject> {
  def?: keyof T;
  header?: string;
  type?: TableColumnTypes;
  visible?: boolean;
  editable?: boolean;

  constructor({ def, header, type, visible, editable }: Partial<TableColumn<T>>) {
    this.def = def;
    this.header = header;
    this.type = type;
    this.visible = visible;
    this.editable = editable;
  }
}
