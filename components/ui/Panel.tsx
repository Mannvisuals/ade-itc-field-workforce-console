import { ReactNode } from "react";

export function Panel({
  title,
  action,
  className = "",
  children,
}: {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-panel border border-rule bg-card ${className}`}
    >
      {title ? (
        <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
          <h2 className="panel-title">{title}</h2>
          {action}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}
