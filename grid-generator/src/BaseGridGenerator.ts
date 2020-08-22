import { GridElement, GridElementAttributes } from "@flmc/grid-element";
import IElement from "@rayflmc/flmc-lite-renderer/build/flmc-data-layer/FormController/IElement";
import { ContainerElement } from "@rayflmc/flmc-lite-renderer/build/form/elements/container/ContainerElement";
import { ModalElement } from "@rayflmc/flmc-lite-renderer/build/form/elements/modal/ModalElement";
import { Action } from "material-table";
import { BehaviorSubject, Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import {
  AdvanceFilterContentProps,
  AdvanceFilterViewProps,
} from "./Handlers/AdvanceFilterHandler/AdvanceFilterView";
import { GridCommand } from "./Handlers/CommandHandler/Commands";
import { CustomActionPosition } from "./Handlers/CustomActionHandler/CustomActionPosition";
import {
  DataSource,
  GeneralDataSourceFunction,
} from "./Handlers/DataSourceHandler/DataSource";
import { Handler } from "./Handlers/Handlers";
import { Filter } from "./Models/Filter";
import { Localization } from "./Models/Localization";
import { PaginationInfo } from "./Models/Pagination";
import { Schema } from "./Models/Schema";
import { Sort } from "./Models/Sort";

export type FieldName = string;

export type BaseControllers<Model extends object> = {
  schemaController: BehaviorSubject<Schema>;
  filtersController: BehaviorSubject<Filter[]>;
  sortsController: BehaviorSubject<Sort[]>;
  paginationController: BehaviorSubject<PaginationInfo>;
  commandController: BehaviorSubject<GridCommand>;
  selectionController: BehaviorSubject<Model[]>;
  currentPageDataController: BehaviorSubject<Model[]>;
  customActionsController: BehaviorSubject<Action<Model>[]>;
  containerController: BehaviorSubject<IElement[]>;
  keyFieldName: BehaviorSubject<string>;
  hideColumnModalHiddenFieldsController: BehaviorSubject<FieldName[]>;
  advanceFiltersController: BehaviorSubject<Filter[]>;
  advanceFilterOpenController: BehaviorSubject<boolean>;
  advanceFilterContentPropsController: BehaviorSubject<
    AdvanceFilterContentProps
  >;
};

export type BaseOptions<Model> = {
  noHideColumnModel: Observable<boolean>;
  enableSelection: Observable<boolean>;
  noExport: Observable<boolean>;
  noRefresh: Observable<boolean>;
  customActionsPosition: Observable<CustomActionPosition>;
  localization: Observable<Localization>;
  listFilterDataSource?: GeneralDataSourceFunction<Model>;
  inlineEditCallBack?: (oldModel: Model, newModel: Model) => Promise<void>;
};

export type BaseBuilders<Model extends object> = {
  containerBuilder: () => ContainerElement;
  gridBuilder: () => GridElement;
  hideColumnModalBuilder: () => ModalElement;
  listFilterModalBuilder: () => ModalElement;
  observablesBuilder: () => AttributeObservables<Model>;
  documentListModalBuilder: () => ModalElement;
  documentListContainerBuilder: () => ContainerElement;
  advanceFilterViewBuilder: (props: AdvanceFilterViewProps) => IElement;
};

export type ElementInstances = {
  elements: {
    container: ContainerElement;
    grid: GridElement;
    hideColumnModal: ModalElement;
    listFilterModal: ModalElement;
    documentListModal: ModalElement;
    documentListContainer: ContainerElement;
    advanceFilterModalView: IElement;
  };
};

export type BaseProps<Model extends object> = {
  dataSource: DataSource<Model>;
  options: BaseOptions<Model>;
  builders: BaseBuilders<Model>;
  controllers: BaseControllers<Model>;
  handlers: Observable<Handler[]>;
};

export type AttributeObservables<Model extends object> = {
  columnDefinitions: Observable<
    [GridElementAttributes.ColumnDefinitions<Model>, Schema]
  >;
  actionDefinitions: Observable<GridElementAttributes.ActionDefinitions<Model>>;
  componentsOverride: Observable<GridElementAttributes.ComponentsOverride>;
  datasource: Observable<GridElementAttributes.Datasource<Model>>;
  rowActionDefinitions: Observable<GridElementAttributes.RowActionDefinitions>;
  gridOptions: Observable<GridElementAttributes.GridOptions>;
  title: Observable<GridElementAttributes.Title>;
  localizationDefinition: Observable<
    GridElementAttributes.LocalizationDefinition
  >;
  onRowClick: Observable<GridElementAttributes.OnRowClick<Model>>;
};

export function BaseGridGenerator<Model extends object>(
  props: BaseProps<Model>
): IElement {
  // elements
  const containerElement = props.builders
    .containerBuilder()
    .children(props.controllers.containerController);
  const gridElement = props.builders.gridBuilder();
  const hideColumnModalElement = props.builders.hideColumnModalBuilder();
  const documentListContainer = props.builders.documentListContainerBuilder();
  const listFilterModal = props.builders.listFilterModalBuilder();
  const documentListModal = props.builders
    .documentListModalBuilder()
    .child(documentListContainer);
  const advanceFilterModalElement = props.builders.advanceFilterViewBuilder({
    open: props.controllers.advanceFilterOpenController,
    contentProps: props.controllers.advanceFilterContentPropsController,
  });

  const elements: ElementInstances = {
    elements: {
      container: containerElement,
      grid: gridElement,
      hideColumnModal: hideColumnModalElement,
      documentListContainer: documentListContainer,
      documentListModal: documentListModal,
      listFilterModal: listFilterModal,
      advanceFilterModalView: advanceFilterModalElement,
    },
  };

  props.controllers.containerController.next([
    gridElement,
    hideColumnModalElement,
    documentListModal,
    listFilterModal,
    advanceFilterModalElement,
  ]);
  // attribute observables
  const baseObservables = props.builders.observablesBuilder();
  const observables = props.handlers.pipe(
    map((handlers) => {
      let obs = baseObservables;
      // run handlers
      for (const handler of handlers) {
        obs = handler({ ...props, ...elements }, obs);
      }
      return obs;
    })
  );

  // connect grid to observables
  gridElement
    .columnDefinitions(
      observables.pipe(
        flatMap((x) => x.columnDefinitions.pipe(map((v) => v[0])))
      )
    )
    .actionDefinitions(observables.pipe(flatMap((x) => x.actionDefinitions)))
    .componentsOverride(observables.pipe(flatMap((x) => x.componentsOverride)))
    .datasource(observables.pipe(flatMap((x) => x.datasource)))
    .rowActionDefinitions(
      observables.pipe(flatMap((x) => x.rowActionDefinitions))
    )
    .gridOptions(observables.pipe(flatMap((x) => x.gridOptions)))
    .title(observables.pipe(flatMap((x) => x.title)))
    .onRowClick(observables.pipe(flatMap((x) => x.onRowClick)))
    .localizationDefinition(
      observables.pipe(flatMap((x) => x.localizationDefinition))
    );

  return containerElement;
}
