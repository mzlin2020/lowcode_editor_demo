import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";

const Button = ({ type, text, styles, ...props }: CommonComponentProps) => {
  return (
    // @ts-ignore
    <AntdButton type={type} style={styles} {...props}>
      {text}
    </AntdButton>
  );
};

export default Button;
