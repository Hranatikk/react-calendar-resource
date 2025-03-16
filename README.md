# React Calendar Resource

React Calendar Resource is an interactive and customizable React component for resource scheduling. It provides a timeline-based calendar view where users can manage events and resources efficiently with drag-and-drop functionality.

## Features

- **Resource-based scheduling** – Organize and display events per resource.
- **Drag-and-drop support** – Easily move and reschedule events.
- **Customizable UI** – Adjust styles, time slots, and event rendering.
- **Interactive event management** – Create, edit, and delete events dynamically.
- **Zero dependencies** – No using 3rd-party libraries.

## Installation

```sh
npm install react-calendar-resource
```

or

```sh
yarn add react-calendar-resource
```

## Usage

```tsx
import React from 'react';
import { ResourceCalendar } from 'react-calendar-resource';

const data = [
  {
    resource: { id: 1, title: 'Resource 1' },
    events: [
      { id: 1, title: 'Event 1', start: '2024-03-15T09:00:00', end: '2024-03-15T10:00:00' }
    ]
  }
];

const App = () => (
  <ResourceCalendarTimeline
    data={data}
    onEventDragEnd={(start, resource, event) => console.log('Event moved', start, resource, event)}
  />
);

export default App;
```

## Props

| Prop                  | Type                                                          | Default                                          | Description                                                                                                                                                                                                  |
|-----------------------|---------------------------------------------------------------|--------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **data**              | `CalendarData[]`                                              | _None_                                           | An array of calendar data objects. Each object contains a resource and its associated events. This is the primary dataset for rendering the calendar.                                                     |
| **selectedDate**      | `Date`                                                        | _None_                                           | The current date used as the reference for the timeline. It determines the time slots and event display.                                                                                                     |
| **containerStyle**    | `React.CSSProperties`                                         | `{}`                                             | Optional inline styles applied to the overall calendar container for custom appearance.                                                                                                                       |
| **renderResource**    | `(resource: Resource) => React.ReactNode`                     | Renders the resource's title                     | A custom render function for displaying a resource in the left column. Override this to provide a custom layout or additional details.                                                                      |
| **renderEvent**       | `(event: CalendarEvent, resource: Resource) => React.ReactNode` | Renders a default event view                     | A custom render function for displaying calendar events in the timeline. Customize this to include icons, custom formatting, or additional UI elements.                                                     |
| **onEventDragEnd**    | `(newDate: Date, resource: Resource, event: CalendarEvent) => void` | _None_                                      | Callback triggered when an event drag-and-drop action is completed. It provides the new start time, the resource, and the event to update your data accordingly.                                          |
| **onDoubleClick**     | `(time: Date, resource: Resource) => void`                     | _None_                                           | Callback fired when a double-click occurs on a time slot. This can be used to create new events or trigger custom actions.                                                                                     |
| **eventContainerStyle** | `React.CSSProperties`                                      | `{}`                                             | Optional inline styles applied to the container holding event elements. Useful for customizing event block appearance such as background color, borders, or padding.                                       |
| **startHour**         | `number`                                                      | `0`                                              | The starting hour for the calendar timeline. This defines the beginning of the time slots displayed in the calendar.                                                                                          |
| **endHour**           | `number`                                                      | `23`                                             | The ending hour for the timeline, determining the last time slot of the day.                                                                                                                                  |
| **dragConstraints**   | `DragConstraintsProps`                                        | `{ minuteStep: 10, preventOverlap: true }`         | An object that defines constraints for event dragging: `minuteStep` specifies the snapping increment in minutes, and `preventOverlap` prevents events from overlapping if set to `true`.                |
| **groupBy**           | `keyof Resource`                                              | _None_                                           | Optional property to group resources based on a specific key from the `Resource` type (e.g., department, floor, specialty). When provided, the calendar groups resources internally and displays toggles. |


## License

This project is licensed under the MIT License.

