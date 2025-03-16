import type { ComponentProps, ReactNode } from "react"

export type Resource = {
  title: string;
  [key: string]: any;
}

export type CalendarEvent = {
  start: Date | string;
  end: Date | string;
  title?: string;
}

export type CalendarData = {
  resource: Resource;
  events: CalendarEvent[];
}

export type TGroupedData = {
  group: string | null;
  resources: CalendarData[];
};

export type DropIndicator = {
  rowIndex: number;
  x: number;
  time: Date;
  valid: boolean;
} | null

export type Hour = {
  hour: number;
  label: string;
}

export type DragData = {
  resourceIndex: number;
  eventIndex: number;
  duration: number;
  offsetX: number;
} | null

export type DragConstraintsProps = {
  minuteStep?: number;
  preventOverlap?: boolean;
  showMinuteStepDivider?: boolean
};

export type ResourceCalendarTimelineProps = {
  data: CalendarData[];
  selectedDate: Date;
  containerStyle?: React.CSSProperties;
  renderResource?: (resource: Resource) => React.ReactNode;
  renderEvent?: (event: CalendarEvent, resource: Resource) => React.ReactNode;
  onEventDragEnd?: (newDate: Date, resource: Resource, event: CalendarEvent) => void;
  onDoubleClick?: (time: Date, resource: Resource) => void;
  eventContainerStyle?: React.CSSProperties;
  startHour?: number;
  endHour?: number;
  dragConstraints?: DragConstraintsProps;
  groupBy?: keyof Resource;
}

export type TComponentProps<
  Component extends (props: any) => ReactNode,
  Keys extends keyof ComponentProps<Component> | null = null,
> = Pick<
  ComponentProps<Component>,
  Keys extends null ? keyof ComponentProps<Component> : Keys
>

