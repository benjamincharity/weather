import React from "react";

export function Card(props: React.HTMLProps<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={`rounded-xl bg-opacity-30 bg-white ${className}`}
      {...rest}
    />
  );
}
