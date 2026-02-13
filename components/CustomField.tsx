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
    | "url";
  options?: { label: string; value: string | number }[];

  isLable?: boolean;
  isCheckBox?: boolean;
  isAbout?: boolean;
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
}: CustomFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`${isCheckBox ? "flex justify-center items-center flex-row-reverse" : "flex-col"}`}
        >
          {!isLable ? (
            <FormLabel className={"text-xs font-bold text-muted-foreground"}>
              {label}
            </FormLabel>
          ) : null}

          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                className={`${isAbout ? "h-48" : "h-20"} w-full  text-base bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none resize-none p-3`}
                {...field}
              />
            ) : type === "select" ? (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
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
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            ) : type === "checkbox-group" ? (
              <div className="flex flex-col gap-2">
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
                        className="text-foreground cursor-pointer select-none"
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Input
                className="w-full text-lg font-semibold bg-transparent text-foreground focus:outline-none focus:border-secondary/70"
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
