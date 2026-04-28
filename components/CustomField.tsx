"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";

interface CustomFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "checkbox-group"
    | "url"
    | "date";
  options?: { label: string; value: string | number }[];

  isLable?: boolean;
  isCheckBox?: boolean;
  isAbout?: boolean;
  isJob?: boolean;
}

const CustomField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  options,
  isLable = false,
  isCheckBox = false,
  isAbout = false,
  isJob = false,
}: CustomFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`w-full ${
            isCheckBox
              ? "flex items-center justify-between gap-3 flex-row-reverse"
              : "flex flex-col gap-2"
          }`}
        >
          {!isLable && (
            <FormLabel className="text-sm md:text-base font-medium text-muted-foreground">
              {label}
            </FormLabel>
          )}

          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                className={`w-full text-sm md:text-base bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none p-3 min-h-[80px] ${
                  isAbout ? "min-h-[160px]" : ""
                } ${isJob ? "resize-y" : "resize-none"}`}
                {...field}
              />
            ) : type === "select" ? (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full h-11 text-sm md:text-base">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "checkbox" ? (
              <div className="flex items-center justify-between w-full">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </div>
            ) : type === "checkbox-group" ? (
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                {options?.map((option) => {
                  const id = `${name}-${option.value}`;
                  return (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        id={id}
                        checked={field.value === option.value}
                        onCheckedChange={() => field.onChange(option.value)}
                      />
                      <label
                        htmlFor={id}
                        className="text-sm md:text-base text-foreground cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Input
                className="w-full h-11 text-sm md:text-base bg-transparent text-foreground border border-border rounded-md px-3 focus:outline-none focus:border-primary"
                type={type}
                placeholder={placeholder}
                {...field}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(
                      e.target.value ? Number(e.target.value) : "",
                    );
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomField;
