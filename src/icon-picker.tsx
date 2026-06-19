/**
 * IconPicker — Seletor de ícone Lucide reutilizável (shadcn-style).
 *
 * Uso básico (componente controlado, sem react-hook-form):
 *   <IconPicker value={icone} onChange={(name) => setIcone(name)} />
 *
 * Para renderizar um ícone por nome, importe:
 *   import { getIconComponent } from "@schema-forms-data/ui";
 */

import React, { useState, useMemo } from "react";
import { icons, Search, type LucideIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { ScrollArea } from "./scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { getIconComponent } from "./iconUtils";

/* ── catálogo de ícones ─────────────────────────────────── */
const ALL_ICONS = Object.entries(icons).map(([name, component]) => ({
  name,
  kebab: name.replace(/([A-Z])/g, (_, c, i) =>
    i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`,
  ),
  component: component as LucideIcon,
}));

/* ── props ──────────────────────────────────────────────── */
export interface IconPickerProps {
  /** Nome PascalCase do ícone Lucide (ex: "UserRound"). */
  value?: string | null;
  /** Chamado com o nome ao selecionar, ou `undefined` ao limpar. */
  onChange: (name: string | undefined) => void;
  /** Label exibido acima do botão trigger. Padrão: "Ícone (Lucide)" */
  label?: string;
  /** Esconde o label. */
  hideLabel?: boolean;
  /** Classe CSS extra no wrapper externo. */
  className?: string;
}

/* ── componente ─────────────────────────────────────────── */
export const IconPicker = ({
  value,
  onChange,
  label = "Ícone (Lucide)",
  hideLabel = false,
  className,
}: IconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const SelectedIcon = useMemo(() => getIconComponent(value), [value]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter(
      (ic) => ic.name.toLowerCase().includes(q) || ic.kebab.includes(q),
    );
  }, [search]);

  const handleSelect = (name: string | undefined) => {
    onChange(name);
    setOpen(false);
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setSearch("");
  };

  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      {!hideLabel && <Label className="text-xs">{label}</Label>}

      <Button
        type="button"
        variant="outline"
        className="w-full h-8 justify-start text-xs font-normal gap-2"
        onClick={() => setOpen(true)}
      >
        {SelectedIcon ? (
          <>
            {React.createElement(SelectedIcon as React.ElementType, {
              className: "h-3.5 w-3.5 shrink-0",
            })}
            <span className="truncate">{value}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Selecionar ícone…</span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col gap-0 p-0">
          <DialogHeader className="px-4 pt-4 pb-2 border-b">
            <DialogTitle>Selecionar ícone</DialogTitle>
            <DialogDescription>
              Pesquise e clique em um ícone da biblioteca Lucide.
            </DialogDescription>
          </DialogHeader>

          <div className="px-4 py-2 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Buscar ícones…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 px-4 py-2">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-8 pb-2">
              <Button
                type="button"
                variant={!value ? "secondary" : "outline"}
                className="flex flex-col items-center justify-center h-20 gap-1 p-1"
                onClick={() => handleSelect(undefined)}
              >
                <div className="h-6 w-6 rounded border-2 border-dashed border-muted-foreground/30" />
                <span className="text-[10px] leading-tight text-center">
                  Nenhum
                </span>
              </Button>

              {filtered.map(({ name, component: IconComp }) => (
                <Button
                  type="button"
                  key={name}
                  variant={value === name ? "secondary" : "outline"}
                  className="flex flex-col items-center justify-center h-20 gap-1 p-1 overflow-hidden"
                  onClick={() => handleSelect(name)}
                >
                  {React.createElement(IconComp as React.ElementType, {
                    size: 24,
                  })}
                  <span className="text-[9px] leading-tight text-center break-all line-clamp-2">
                    {name}
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
