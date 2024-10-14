import { useState } from "react";
import { Segmented } from "antd";
import { ComponentAttr } from "./ComponentAttr";
import { ComponentEvent } from "./ComponentEvent";
import { ComponentStyle } from "./ComponentStyle";
import { useComponetsStore } from "../../stores/components";

export function Setting() {
  const { curComponentId } = useComponetsStore();
  const [key, setKey] = useState<string>("属性");

  //   仅触发点击事件时，显示
  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["属性", "样式", "事件"]}
      ></Segmented>
      <div className="pt-[20px]">
        {key === "属性" && <ComponentAttr />}
        {key === "样式" && <ComponentStyle />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
}
