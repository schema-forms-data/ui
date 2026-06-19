/**
 * DateInput — campo de data/hora com Tailwind, compatível com input[type=date],
 * input[type=time], input[type=datetime-local] e input[type=month].
 *
 * Exporta também DateRangeInput para intervalo de datas (data inicial + data final).
 */

import * as React from "react";
import { cn } from "./utils/cn";

export interface DateInputProps extends React.ComponentProps<"input"> {
  /** "date" | "time" | "datetime-local" | "month" — padrão: "date" */
  type?: "date" | "time" | "datetime-local" | "month";
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, type = "date", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
DateInput.displayName = "DateInput";

export interface DateRangeInputProps {
  /** Valor da data inicial (formato ISO "YYYY-MM-DD") */
  valueFrom?: string;
  /** Valor da data final (formato ISO "YYYY-MM-DD") */
  valueTo?: string;
  onChangeFrom?: (value: string) => void;
  onChangeTo?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  /** Tipos independentes para from/to. Padrão: "date" */
  typeFrom?: "date" | "datetime-local";
  typeTo?: "date" | "datetime-local";
}

const DateRangeInput = ({
  valueFrom,
  valueTo,
  onChangeFrom,
  onChangeTo,
  disabled,
  readOnly,
  className,
  typeFrom = "date",
  typeTo = "date",
}: DateRangeInputProps) => (
  <div className={cn("flex items-center gap-2", className)}>
    <DateInput
      type={typeFrom}
      value={valueFrom ?? ""}
      onChange={(e) => onChangeFrom?.(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      className="flex-1"
    />
    <span className="text-muted-foreground text-sm shrink-0">até</span>
    <DateInput
      type={typeTo}
      value={valueTo ?? ""}
      onChange={(e) => onChangeTo?.(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      className="flex-1"
    />
  </div>
);
DateRangeInput.displayName = "DateRangeInput";

export { DateInput, DateRangeInput };
