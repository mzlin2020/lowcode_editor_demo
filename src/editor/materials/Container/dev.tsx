import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(["Button", "Container"], id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
      style={styles}
    >
      {children}
    </div>
  );
};

export default Container;
