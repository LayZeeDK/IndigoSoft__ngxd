import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntitiesService } from '@app/components';
import { DynamicEntityObject } from '@app/dynamics';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entities-page',
  templateUrl: 'entities.component.html',
  styleUrls: ['entities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesPageComponent {
  name = 'hello';

  entities$: Observable<DynamicEntityObject[]> = this.entityDataService.getEntities();

  constructor(private entityDataService: EntitiesService) {}

  onAction($event: any) {
    console.log($event);
  }
}
