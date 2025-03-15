import type { ComponentProps, ReactNode } from "react"

export type Resource = {
  title: string;
}

export type CalendarEvent = {
  start: Date;
  end: Date;
  title?: string;
}

export type CalendarData = {
  resource: Resource;
  events: CalendarEvent[];
}

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

export type ResourceCalendarTimelineProps = {
  data: CalendarData[];
  minuteStep?: number
  selectedDate: Date;
  containerStyle?: React.CSSProperties;
  renderResource?: (resource: Resource) => React.ReactNode;
  renderEvent?: (event: CalendarEvent, resource: Resource) => React.ReactNode;
  onEventDragEnd?: (newDate: Date, resource: Resource, event: CalendarEvent) => void;
  onDoubleClick?: (time: Date, resource: Resource) => void;
  eventContainerStyle?: React.CSSProperties;
  startHour?: number;
  endHour?: number;
}

export type TComponentProps<
  Component extends (props: any) => ReactNode,
  Keys extends keyof ComponentProps<Component> | null = null,
> = Pick<
  ComponentProps<Component>,
  Keys extends null ? keyof ComponentProps<Component> : Keys
>

