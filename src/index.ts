// Styles (Tailwind CSS compiled output)
import './style.css';

// Utilities
export { cn } from './utils/cn';
export { getIconComponent } from './iconUtils';

// Primitives
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

export { Input } from './input';

export { Textarea } from './textarea';
export type { TextareaProps } from './textarea';

export { Label } from './label';

export { Badge, badgeVariants } from './badge';
export type { BadgeProps } from './badge';

export { Separator } from './separator';

// Form controls
export { Checkbox } from './checkbox';

export { RadioGroup, RadioGroupItem } from './radio-group';

export { Switch } from './switch';

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from './select';

export { Slider } from './slider';

// Date & File
export { DateInput, DateRangeInput } from './date-input';
export type { DateInputProps, DateRangeInputProps } from './date-input';

export { FileInput } from './file-input';
export type { FileInputProps } from './file-input';

// Overlay / Feedback
export { Progress } from './progress';

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from './dialog';

export { Popover, PopoverTrigger, PopoverContent } from './popover';

export {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from './tooltip';

export { ScrollArea, ScrollBar } from './scroll-area';

// Complex components
export { IconPicker } from './icon-picker';
export type { IconPickerProps } from './icon-picker';

export { StepIndicator } from './StepIndicator';
export type { StepInfo } from './StepIndicator';
