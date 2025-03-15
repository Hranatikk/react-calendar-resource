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
import ResourceCalendarTimeline from 'react-calendar-resource';

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

| Prop                | Type                                      | Description                                      |
|---------------------|-----------------------------------------|--------------------------------------------------|
| `data`             | `CalendarData[]`                        | List of resources with associated events.       |
| `minuteStep`       | `number`                                | Step size in minutes for event positioning.     |
| `selectedDate`     | `Date`                                  | Currently selected date in the calendar.        |
| `containerStyle`   | `React.CSSProperties`                   | Custom styles for the calendar container.       |
| `renderResource`   | `(resource: Resource) => React.ReactNode` | Function to render a resource item.             |
| `renderEvent`      | `(event: CalendarEvent, resource: Resource) => React.ReactNode` | Function to render an event item. |
| `onEventDragEnd`   | `(newDate: Date, resource: Resource, event: CalendarEvent) => void` | Callback when an event is moved. |
| `onDoubleClick`    | `(time: Date, resource: Resource) => void` | Callback triggered on double-clicking a time slot. |
| `eventContainerStyle` | `React.CSSProperties`                 | Custom styles for event containers.             |
| `startHour`        | `number`                                | Starting hour of the timeline.                  |
| `endHour`          | `number`                                | Ending hour of the timeline.                    |

## License

This project is licensed under the MIT License.

