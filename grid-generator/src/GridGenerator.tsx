import { ContainerDirection, Raw } from "@rayflmc/flmc-lite-renderer";
import IElement from "@rayflmc/flmc-lite-renderer/build/flmc-data-layer/FormController/IElement";
import { ContainerElement } from "@rayflmc/flmc-lite-renderer/build/form/elements/container/ContainerElement";
import { GridElement } from "@rayflmc/flmc-lite-renderer/build/form/elements/grid/GridElement";
import * as GridElementAttributes from "@rayflmc/flmc-lite-renderer/build/form/elements/grid/GridElementAttributes";
import { ModalElement } from "@rayflmc/flmc-lite-renderer/build/form/elements/modal/ModalElement";
import { Action } from "material-table";
import * as React from "react";
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  merge,
  Observable,
  of,
} from "rxjs";
import { map } from "rxjs/operators";
import {
  AttributeObservables,
  BaseBuilders,
  BaseControllers,
  BaseGridGenerator,
  BaseOptions,
  FieldName,
} from "./BaseGridGenerator";
import {
  AdvanceFilterContentProps,
  AdvanceFilterView,
} from "./Handlers/AdvanceFilterHandler/AdvanceFilterView";
import { GridCommand, GridCommands } from "./Handlers/CommandHandler/Commands";
import { CustomActionPosition } from "./Handlers/CustomActionHandler/CustomActionPosition";
import {
  DataSource,
  GeneralDataSourceFunction,
} from "./Handlers/DataSourceHandler/DataSource";
import { defaultHandlers, Handler } from "./Handlers/Handlers";
import { Filter, getFilterSchemaTypeName } from "./Models/Filter";
import { Localization } from "./Models/Localization";
import { PaginationInfo } from "./Models/Pagination";
import { Schema } from "./Models/Schema";
import { Sort } from "./Models/Sort";
export type Controllers<Model extends object> = {
  schemaController?: BehaviorSubject<Schema>;
  filtersController?: BehaviorSubject<Filter[]>;
  sortsController?: BehaviorSubject<Sort[]>;
  paginationController?: BehaviorSubject<PaginationInfo>;
  commandController?: BehaviorSubject<GridCommand>;
  selectionController?: BehaviorSubject<Model[]>;
  currentPageDataController?: BehaviorSubject<Model[]>;
  customActionsController?: BehaviorSubject<Action<Model>[]>;
  containerController?: BehaviorSubject<IElement[]>;
  keyFieldName?: BehaviorSubject<string>;
  hideColumnModalHiddenFieldsController?: BehaviorSubject<FieldName[]>;
  advanceFiltersController?: BehaviorSubject<Filter[]>;
  advanceFilterOpenController?: BehaviorSubject<boolean>;
  advanceFilterContentPropsController?: BehaviorSubject<
    AdvanceFilterContentProps
  >;
};

export type Options<Model> = {
  noHideColumnModel?: Observable<boolean>;
  noExport?: Observable<boolean>;
  noRefresh?: Observable<boolean>;
  customActionsPosition?: Observable<CustomActionPosition>;
  localization?: Observable<Localization>;
  enableSelection?: Observable<boolean> | boolean;
  listFilterDataSource?: GeneralDataSourceFunction<Model>;
  inlineEditCallBack?: (oldModel: Model, newModel: Model) => Promise<void>;
  defaultGridOptions?: GridElementAttributes.GridOptions;
};

export type Builders<Model extends object> = {
  containerBuilder?: () => ContainerElement;
  gridBuilder?: () => GridElement;
  hideColumnModalBuilder?: () => ModalElement;
  observablesBuilder?: () => AttributeObservables<Model>;
  documentListModalBuilder?: () => ModalElement;
  documentListContainerBuilder?: () => ContainerElement;
  listFilterModalBuilder?: () => ModalElement;
};

export type Props<Model extends object> = {
  dataSource: DataSource<Model>;
  options?: Options<Model>;
  builders?: BaseBuilders<Model>;
  controllers?: Controllers<Model>;
  handlers?: Observable<Handler[]>;
};

export const defaultLocalization: Localization = {
  create: "Create",
  delete: "Delete",
  errorFetchingSchema: "Error fetching schema",
  loading: "Loading...",
  advanceFilter: {
    and: "And",
    closeBracket: ")",
    openBracket: "(",
    or: "Or",
    actionTooltip: "Advance filter",
    andOperator: "And operator",
    apply: "Apply",
    cancel: "Cancel",
    fieldSectionHeader: "Fields",
    filterTypeTranslator: getFilterSchemaTypeName,
    generalSectionHeader: "General",
    orOperator: "Or operator",
    searchPlaceholder: 'Press "/" to search',
  },
  materialTable: {
    grouping: {
      groupedBy: "Grouped By:",
      placeholder: "Drag headers here to group by",
    },
    pagination: {
      labelDisplayedRows: "{from}-{to} of {count}",
      labelRowsPerPage: "Rows per page:",
      labelRowsSelect: "rows",
    },
    toolbar: {},
    header: {},
    body: {
      filterRow: {},
      editRow: {
        saveTooltip: "Save",
        cancelTooltip: "Cancel",
        deleteText: "Are you sure you want to delete this row?",
      },
      addTooltip: "Add",
      deleteTooltip: "Delete",
      editTooltip: "Edit",
    },
  },
  refresh: "Refresh",
  retry: "Retry",
  select: "Select",
  edit: "Edit",
  columnVisibility: "Hide/Show Columns",
  columnVisibilityTitle: "Hide/Show Columns",
};

export const makeDefaultBuilders = <Model extends object>(
  controllers: BaseControllers<Model>,
  gridOptions: GridElementAttributes.GridOptions
): BaseBuilders<Model> => {
  const windowResizeEvent = merge(
    of([window.innerHeight, window.innerWidth]),
    fromEvent(window, "resize").pipe(
      map((): [number, number] => [window.innerHeight, window.innerWidth])
    )
  );

  return {
    containerBuilder: () => new ContainerElement(),
    gridBuilder: () => new GridElement(),
    listFilterModalBuilder: () =>
      new ModalElement()
        .minWidth(
          windowResizeEvent.pipe(map(([_height, width]) => width * 0.7))
        )
        .maxHeight(windowResizeEvent.pipe(map(([height, _width]) => height)))
        .maxWidth(windowResizeEvent.pipe(map(([_height, width]) => width)))
        .noBackdropClickClose(false)
        .visibleHeader(false)
        .noEscapeKeyDownClose(false)
        .noPadding(true),
    hideColumnModalBuilder: () =>
      new ModalElement()
        .minWidth(
          windowResizeEvent.pipe(map(([_height, width]) => width * 0.7))
        )
        .maxHeight(windowResizeEvent.pipe(map(([height, _width]) => height)))
        .maxWidth(windowResizeEvent.pipe(map(([_height, width]) => width)))
        .noBackdropClickClose(false)
        .noEscapeKeyDownClose(false),
    documentListModalBuilder: () =>
      new ModalElement()
        .noBackdropClickClose(false)
        .noEscapeKeyDownClose(false),
    documentListContainerBuilder: () =>
      new ContainerElement().direction(ContainerDirection.Row),
    advanceFilterViewBuilder: (props) =>
      Raw((_) => (
        <AdvanceFilterView
          open={props.open}
          contentProps={props.contentProps}
        />
      )),
    observablesBuilder: () => {
      return {
        onRowClick: new BehaviorSubject(undefined),
        actionDefinitions: new BehaviorSubject([]).asObservable(),
        columnDefinitions: combineLatest(
          new BehaviorSubject([]),
          controllers.schemaController
        ),
        componentsOverride: new BehaviorSubject({}).asObservable(),
        datasource: new BehaviorSubject([]).asObservable(),
        rowActionDefinitions: new BehaviorSubject({}).asObservable(),
        gridOptions: new BehaviorSubject(gridOptions).asObservable(),
        title: new BehaviorSubject("").asObservable(),
        localizationDefinition: new BehaviorSubject({}).asObservable(),
      };
    },
  };
};

export const DEFAULT_GRID_OPTIONS: GridElementAttributes.GridOptions = {
  actionsColumnIndex: -1,
  filtering: true,
  padding: "dense",
  pageSize: 5,
  initialPage: 0,
  pageSizeOptions: [5, 10, 20, 25, 50],
  debounceInterval: 0.7,
  loadingType: "linear",
};

export function GridGenerator<Model extends object>(
  props: Props<Model>
): IElement {
  // handle default values

  const controllers: BaseControllers<Model> = {
    schemaController:
      props.controllers && props.controllers.schemaController
        ? props.controllers.schemaController
        : new BehaviorSubject({ fields: [], sorts: [], filters: [] } as Schema),
    filtersController:
      props.controllers && props.controllers.filtersController
        ? props.controllers.filtersController
        : new BehaviorSubject([] as Filter[]),
    sortsController:
      props.controllers && props.controllers.sortsController
        ? props.controllers.sortsController
        : new BehaviorSubject([] as Sort[]),
    paginationController:
      props.controllers && props.controllers.paginationController
        ? props.controllers.paginationController
        : new BehaviorSubject({ totalPage: 0, totalRow: 0 }),
    commandController:
      props.controllers && props.controllers.commandController
        ? props.controllers.commandController
        : new BehaviorSubject(GridCommands.nop),
    selectionController:
      props.controllers && props.controllers.selectionController
        ? props.controllers.selectionController
        : new BehaviorSubject([] as Model[]),
    currentPageDataController:
      props.controllers && props.controllers.currentPageDataController
        ? props.controllers.currentPageDataController
        : new BehaviorSubject([] as Model[]),
    customActionsController:
      props.controllers && props.controllers.customActionsController
        ? props.controllers.customActionsController
        : new BehaviorSubject([] as Action<Model>[]),
    containerController:
      props.controllers && props.controllers.containerController
        ? props.controllers.containerController
        : new BehaviorSubject([] as IElement[]),
    keyFieldName:
      props.controllers && props.controllers.keyFieldName
        ? props.controllers.keyFieldName
        : new BehaviorSubject(""),
    hideColumnModalHiddenFieldsController:
      props.controllers &&
      props.controllers.hideColumnModalHiddenFieldsController
        ? props.controllers.hideColumnModalHiddenFieldsController
        : new BehaviorSubject([] as FieldName[]),
    advanceFiltersController:
      props.controllers && props.controllers.advanceFiltersController
        ? props.controllers.advanceFiltersController
        : new BehaviorSubject([] as Filter[]),
    advanceFilterContentPropsController:
      props.controllers && props.controllers.advanceFilterContentPropsController
        ? props.controllers.advanceFilterContentPropsController
        : new BehaviorSubject({
            currentFilters: [],
            schema: { fields: [], filters: [], sorts: [] },
            localization: defaultLocalization.advanceFilter,
            onApply: (_) => {},
            onCancel: () => {},
          } as AdvanceFilterContentProps),
    advanceFilterOpenController:
      props.controllers && props.controllers.advanceFilterOpenController
        ? props.controllers.advanceFilterOpenController
        : new BehaviorSubject(false as boolean),
  };

  const options: BaseOptions<Model> = {
    noExport:
      props.options && props.options.noExport
        ? props.options.noExport
        : new BehaviorSubject(false),
    noHideColumnModel:
      props.options && props.options.noHideColumnModel
        ? props.options.noHideColumnModel
        : new BehaviorSubject(false),
    noRefresh:
      props.options && props.options.noRefresh
        ? props.options.noRefresh
        : new BehaviorSubject(false),
    listFilterDataSource:
      props.options && props.options.listFilterDataSource
        ? props.options.listFilterDataSource
        : undefined,
    inlineEditCallBack:
      props.options && props.options.inlineEditCallBack
        ? props.options.inlineEditCallBack
        : undefined,
    customActionsPosition:
      props.options && props.options.customActionsPosition
        ? props.options.customActionsPosition
        : new BehaviorSubject(CustomActionPosition.End),
    enableSelection:
      props.options && props.options.enableSelection
        ? typeof props.options.enableSelection === "boolean"
          ? new BehaviorSubject(props.options.enableSelection)
          : props.options.enableSelection
        : new BehaviorSubject(false),
    localization:
      props.options && props.options.localization
        ? props.options.localization
        : new BehaviorSubject(defaultLocalization),
  };

  const defaultBuilders = makeDefaultBuilders(
    controllers,
    props.options && props.options.defaultGridOptions
      ? props.options.defaultGridOptions
      : DEFAULT_GRID_OPTIONS
  );

  const builders: BaseBuilders<Model> = {
    listFilterModalBuilder:
      props.builders && props.builders.listFilterModalBuilder
        ? props.builders.listFilterModalBuilder
        : defaultBuilders.listFilterModalBuilder,
    containerBuilder:
      props.builders && props.builders.containerBuilder
        ? props.builders.containerBuilder
        : defaultBuilders.containerBuilder,
    gridBuilder:
      props.builders && props.builders.gridBuilder //
        ? props.builders.gridBuilder
        : defaultBuilders.gridBuilder,
    observablesBuilder:
      props.builders && props.builders.observablesBuilder
        ? props.builders.observablesBuilder
        : defaultBuilders.observablesBuilder,
    hideColumnModalBuilder:
      props.builders && props.builders.hideColumnModalBuilder
        ? props.builders.hideColumnModalBuilder
        : defaultBuilders.hideColumnModalBuilder,
    documentListContainerBuilder:
      props.builders && props.builders.documentListContainerBuilder
        ? props.builders.documentListContainerBuilder
        : defaultBuilders.documentListContainerBuilder,
    documentListModalBuilder:
      props.builders && props.builders.documentListModalBuilder
        ? props.builders.documentListModalBuilder
        : defaultBuilders.documentListModalBuilder,
    advanceFilterViewBuilder:
      props.builders && props.builders.advanceFilterViewBuilder
        ? props.builders.advanceFilterViewBuilder
        : defaultBuilders.advanceFilterViewBuilder,
  };

  const handlers = props.handlers ?? new BehaviorSubject(defaultHandlers);

  return BaseGridGenerator({
    controllers,
    options,
    dataSource: props.dataSource,
    builders,
    handlers,
  });
}
