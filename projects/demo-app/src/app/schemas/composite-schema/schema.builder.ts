import { DynamicEntityObject } from '@app/dynamics';
import { AbstractControlSchema } from '@ngxd/forms';

export abstract class SchemaBuilder<T extends DynamicEntityObject> {
  abstract schema(entity: T): AbstractControlSchema<T>;
}
