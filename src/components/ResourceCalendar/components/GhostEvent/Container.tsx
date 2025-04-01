import { useCallback } from "react"
import { TComponentProps } from "../../types"
import Component from "./Component"
import type { CalendarEvent, Resource } from "../../types"
import { getPastelColor } from "../../helpers"

type TProps = Omit<TComponentProps<typeof Component>, "renderInitialEvent">

const Container = (props: TProps) => {
  const renderInitialEvent = useCallback((evt: CalendarEvent, resource: Resource) => {
    const resourceColor = getPastelColor(resource.title ?? "");

    return (
      <>
        <div className="rtc-event-item">
          {evt.title}
        </div>

        <div className="rtc-event-background" style={{ backgroundColor: resourceColor }} />
      </>
    );
  }, [])

  return (
    <Component {...props} renderInitialEvent={renderInitialEvent} />
  );
};

export default Container;
