import { createContext } from "react"
import type {
  CalendarData,
  CalendarEvent,
  DragConstraintsProps,
  DragData,
  DropIndicator,
  TGroupedData,
  Resource,
  Hour,
} from "../components/ResourceCalendar/types"

type TContextData = {
  calendarData: CalendarData[]
  collapsedGroups: Record<string, boolean>
  containerStyle: React.CSSProperties
  dragConstraints: DragConstraintsProps
  dragDataRef: React.RefObject<DragData>
  dropIndicator: DropIndicator
  eventContainerStyle: React.CSSProperties
  groupBy?: string
  groupData: TGroupedData[]
  hours: Hour[]
  slotWidth?: number
  startHourValue: number
  timelineWidth: number
  toggleGroup: (group: string) => void

  renderEvent?: (event: CalendarEvent, resource: Resource) => React.ReactNode;
  renderResource?: (resource: Resource) => React.ReactNode;

  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void
  onDragEnd: () => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  onDragStart: (e: React.DragEvent<HTMLDivElement>, resourceIndex: number, eventIndex: number) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void
}

export const CalendarContext = createContext<TContextData | null>(null)