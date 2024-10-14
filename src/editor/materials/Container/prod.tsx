import { CommonComponentProps } from "../../interface";

const Container = ({ children, styles }: CommonComponentProps) => {
  return (
    <div
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
      style={styles}
    >
      {children}
    </div>
  );
};

export default Container;
