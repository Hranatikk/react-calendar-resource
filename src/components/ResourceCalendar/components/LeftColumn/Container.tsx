import { TComponentProps } from '../../types';
import Component from "./Component"

type TProps = TComponentProps<typeof Component>

const Container = (props: TProps) => {
  return (
    <Component {...props} />
  );
};

export default Container;
