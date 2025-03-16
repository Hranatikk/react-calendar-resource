import { TComponentProps } from '../../types';
import Component from './Component';

type TProps = Omit<TComponentProps<typeof Component>, "left" | "width" | "opacity">

const Container = ({
  resourceIndex,
  eventIndex,
  event,
  resourceData,
  eventContainerStyle = {},

  dragDataRef,
  dropIndicator,
  startHourValue,
  slotWidth,

  renderEvent,
  renderInitialEvent,

  onDragStart,
  onDragEnd,
}: TProps) => {
  let opacity = 1

  if (
    dragDataRef.current &&
    dragDataRef.current.resourceIndex === resourceIndex &&
    dragDataRef.current.eventIndex === eventIndex &&
    dropIndicator
  ) {
    opacity = 0.3
  }
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);
  const startMinutes =
    eventStart.getHours() * 60 + eventStart.getMinutes() - startHourValue * 60;
  const endMinutes =
    eventEnd.getHours() * 60 + eventEnd.getMinutes() - startHourValue * 60;
  const pixelsPerMinute = slotWidth / 60;
  const left = startMinutes * pixelsPerMinute;
  const width = (endMinutes - startMinutes) * pixelsPerMinute;

  return (
    <Component
      resourceIndex={resourceIndex}
      eventIndex={eventIndex}
      event={event}
      resourceData={resourceData}
      eventContainerStyle={eventContainerStyle}
      
      dragDataRef={dragDataRef}
      dropIndicator={dropIndicator}
      startHourValue={startHourValue}
      slotWidth={slotWidth}
      left={left}
      width={width}
      opacity={opacity}
    
      renderEvent={renderEvent}
      renderInitialEvent={renderInitialEvent}
    
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />

  );
};

export default Container;
