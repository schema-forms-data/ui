/**
 * FileInput — Botão de upload de arquivo com indicador de progresso e
 * exibição do nome do arquivo selecionado.
 *
 * Diferente do <input type="file"> nativo, expõe uma interface controlada
 * compatível com react-hook-form:
 *   - value: File | null
 *   - onChange: (file: File | null) => void
 */

import * as React from "react";
import { Upload, X } from "lucide-react";
import { cn } from "./utils/cn";
import { Button } from "./button";
import { Progress } from "./progress";

export interface FileInputProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  /** Valor 0–100. Quando definido e > 0, exibe barra de progresso. */
  uploadProgress?: number;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
  /** Texto do botão. Padrão: "Selecionar arquivo" */
  buttonLabel?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      value,
      onChange,
      uploadProgress,
      accept,
      disabled,
      multiple = false,
      placeholder = "Nenhum arquivo selecionado",
      className,
      buttonLabel = "Selecionar arquivo",
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Forward the external ref to the hidden input
    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      onChange?.(file);
      // Reset so same file can be re-selected
      e.target.value = "";
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
    };

    const isUploading =
      uploadProgress !== undefined &&
      uploadProgress > 0 &&
      uploadProgress < 100;

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={disabled || isUploading}
            className="shrink-0 gap-1.5"
          >
            <Upload className="h-4 w-4" />
            {buttonLabel}
          </Button>

          <span className="flex-1 truncate text-sm text-muted-foreground">
            {value ? value.name : placeholder}
          </span>

          {value && !isUploading && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              disabled={disabled}
              className="h-7 w-7 shrink-0"
              aria-label="Remover arquivo"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isUploading && <Progress value={uploadProgress} className="h-1.5" />}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    );
  },
);
FileInput.displayName = "FileInput";

export { FileInput };
