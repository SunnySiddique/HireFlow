"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface AuthFieldProps<T extends FieldValues> {
  id: string;
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password";
  options?: { label: string; value: string | number }[];
  isLogin?: boolean;
}

const AuthField = <T extends FieldValues>({
  id,
  control,
  name,
  label,
  placeholder,
  type = "text",
  isLogin,
}: AuthFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-foreground font-semibold">
              {label}
            </FormLabel>
            {isLogin && (
              <a
                href="#"
                className="text-primary font-semibold text-sm hover:underline"
              >
                Forgot?
              </a>
            )}
          </div>
          <FormControl>
            <div className="relative">
              <Input
                id={id}
                type={inputType}
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
                className="h-11 bg-accent border-border text-foreground placeholder:text-muted-foreground"
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AuthField;
