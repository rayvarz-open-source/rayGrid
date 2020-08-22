import { DataLayer } from '@flmc/core';
import { Container, ContainerDirection, SelectBox, SelectBoxVariant } from '@flmc/base-elements';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, skip } from 'rxjs/operators';
import { FieldName } from '../../BaseGridGenerator';
import { FieldSchema } from '../../Models/Field';
import { Localization } from '../../Models/Localization';
import { Schema } from '../../Models/Schema';
import { Handler } from '../Handlers';

function chunk<T>(array: Array<T>, size: number): Array<Array<T>> {
  const chunkedArr: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1];
    if (!last || last.length === size) {
      chunkedArr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunkedArr;
}

export function setupHideColumnModal(
  schema: Observable<Schema>,
  hiddenFields: BehaviorSubject<FieldName[]>
): DataLayer.IElement {
  function createControllerForField(
    field: FieldSchema,
    hiddenFieldsSnapshot: FieldName[]
  ): BehaviorSubject<boolean | null> {
    const subject = new BehaviorSubject<boolean | null>(!hiddenFieldsSnapshot.includes(field.fieldName));

    // update schema if value changed
    subject.pipe(skip(1), first()).subscribe((isChecked) => {
      if (!isChecked) hiddenFields.next([...hiddenFields.value, field.fieldName]);
      else hiddenFields.next([...hiddenFields.value.filter((v) => v !== field.fieldName)]);
    });

    return subject;
  }

  function createCheckboxElements(snapshot: Schema, hiddenFiels: FieldName[]): DataLayer.IElement[] {
    const elements: DataLayer.IElement[] = [];

    const chunkedFields = chunk(
      snapshot.fields.filter((v) => v.isVisible),
      3
    );

    for (let index = 0; index < chunkedFields.length; index++) {
      const chunk = chunkedFields[index];
      const children: DataLayer.IElement[] = chunk.map((field) =>
        SelectBox(createControllerForField(field, hiddenFiels), true)
          .label(field.title || field.fieldName)
          .variant(SelectBoxVariant.CheckBox)
      );
      if (index === chunkedFields.length - 1 && index > 0 && chunk.length < chunkedFields[index - 1].length) {
        const numberOfPlaceholderElements = chunkedFields[index - 1].length - chunk.length;
        for (let i = 0; i < numberOfPlaceholderElements; i++) children.push(Container([]));
      }
      elements.push(
        Container(children)
          .flex(children.map((_) => 1))
          .direction(ContainerDirection.Row)
      );
    }

    return elements;
  }

  return Container(
    combineLatest(schema, hiddenFields).pipe(
      map(([schemaSnapshot, hiddenFieldsSnapshot]) => [...createCheckboxElements(schemaSnapshot, hiddenFieldsSnapshot)])
    )
  );
}

export const hideColumnsModalHandler: Handler = (props, observables) => {
  const openHideColumnsModal = (localization: Localization) => {
    props.elements.hideColumnModal.childContainer.next(
      setupHideColumnModal(props.controllers.schemaController, props.controllers.hideColumnModalHiddenFieldsController)
    );
    props.elements.hideColumnModal.titleContainer.next(localization.columnVisibilityTitle);
    props.elements.hideColumnModal.openContainer.next(true);
  };

  const actions = combineLatest(observables.actionDefinitions, props.options.localization).pipe(
    map(([actionDefs, localization]) => {
      return [
        ...actionDefs,
        {
          icon: 'visibility',
          isFreeAction: true,
          tooltip: localization.columnVisibility,
          onClick: (_event, _data) => openHideColumnsModal(localization),
        },
      ];
    })
  );

  props.controllers.schemaController.subscribe((v) => {
    props.controllers.hideColumnModalHiddenFieldsController.next(
      v.fields.filter((f) => f.isVisible && !f.isVisibleDefault).map((f) => f.fieldName)
    );
  });

  return {
    ...observables,
    actionDefinitions: actions,
  };
};
