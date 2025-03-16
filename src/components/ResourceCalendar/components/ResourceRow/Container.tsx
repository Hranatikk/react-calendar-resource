import React from 'react';
import { TComponentProps, TGroupedData } from '../../types';
import Component from "./Component"

type TProps = TComponentProps<typeof Component> & {
  groupData: TGroupedData
}

const Container = (props: TProps) => {
  const resourceIndex =
    props.calendarData.findIndex((i) =>
      i.resource.title === props.groupData.resources[props.resourceIndex].resource.title
    )

  return (
    <Component {...props} resourceIndex={resourceIndex} />
  );
};

export default Container;
