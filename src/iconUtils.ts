/**
 * Utilitários para trabalhar com ícones Lucide por nome.
 */

import { icons, type LucideIcon } from "lucide-react";

/**
 * Retorna o componente Lucide a partir de um nome PascalCase ou kebab-case.
 * Retorna `null` se não encontrado.
 *
 * @example
 *   const Icon = getIconComponent("UserRound");
 *   if (Icon) return <Icon size={16} />;
 */
export function getIconComponent(name: string | null | undefined): LucideIcon | null {
    if (!name) return null;
    if (name.includes("-")) {
        const pascal = name
            .split("-")
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join("");
        return (icons[pascal as keyof typeof icons] as LucideIcon) ?? null;
    }
    return (icons[name as keyof typeof icons] as LucideIcon) ?? null;
}
