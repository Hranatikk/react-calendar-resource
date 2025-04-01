import { useCalendarContext } from "../../../../context/CalendarContext"
import { TComponentProps } from "../../types"
import Component from "./Component"

type TProps = Pick<TComponentProps<typeof Component>, "hour"> & {
  index: number
}

const Container = ({ hour, index }: TProps) => {
  const { slotWidth, hours } = useCalendarContext()

  const borderRight = index === hours.length - 1 ? "none" : undefined
  const left = index * slotWidth

  return (
    <Component
      hour={hour}
      left={left}
      borderRight={borderRight}
      slotWidth={slotWidth}
    />
  )
}

export default Container
