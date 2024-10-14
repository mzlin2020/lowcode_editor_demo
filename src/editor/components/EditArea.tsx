import React, { MouseEventHandler, useState } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { Component, useComponetsStore } from "../stores/components";
import HoverMask from "./HoverMask";
import SelectedMask from "./SelectedMask";

export function EditArea() {
  const { components, curComponentId, setCurComponentId } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  // 根据data匹配对应的config组件，并传递数据
  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      // 根据数据的name匹配到对应的配置内容
      const config = componentConfig?.[component.name];
      if (!config?.dev) return null;

      return React.createElement(
        config.dev,
        {
          key: component.id,
          id: component.id,
          styles: component.styles,
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  };

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  // 鼠标移入事件
  const handleMouseOver: MouseEventHandler = (e) => {
    // 事件冒泡经过的所有元素
    const path = e.nativeEvent.composedPath();

    // 遍历的第一个元素通常就是携带data-component-id的元素
    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;

      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  // 选中事件
  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;

      if (componentId) {
        setCurComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseOver}
      onClick={handleClick}
      onMouseLeave={() => setHoverComponentId(undefined)}
    >
      {renderComponents(components)}

      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}

      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}

      <div className="portal-wrapper"></div>
    </div>
  );
}
