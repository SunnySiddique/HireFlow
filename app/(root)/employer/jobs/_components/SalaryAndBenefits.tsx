import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { X } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface SalaryAndBenefitsProps {
  form: UseFormReturn<JobFormValues>;
  benefits: string[];
  setBenefits: (benefits: string[]) => void;
}

const SalaryAndBenefits = ({ form }: SalaryAndBenefitsProps) => {
  const [benefitInput, setBenefitInput] = useState("");

  const handleAddBenefit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = benefitInput.trim().replace(/,$/, "");
      if (!value) return;
      const current = form.getValues("benefits") as string[];
      form.setValue("benefits", [...current, value]);
      setBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    const current = form.getValues("benefits") as string[];
    form.setValue(
      "benefits",
      current.filter((_, i) => i !== index),
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Salary & Benefits
      </h2>
      <p className="text-muted-foreground mb-8">
        Define compensation and benefits for this role
      </p>

      <div className="space-y-6">
        {/* Salary Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CustomField
            control={form.control}
            name="minimumSalary"
            label="Minimum Salary *"
            type="number"
            placeholder="50000"
          />
          <CustomField
            control={form.control}
            name="maximumSalary"
            label="Maximum Salary *"
            type="number"
            placeholder="120000"
          />
        </div>

        {/* Currency */}
        <CustomField
          control={form.control}
          name="currency"
          label="Currency"
          type="select"
          options={[
            { label: "USD ($)", value: "usd" },
            { label: "EUR (€)", value: "eur" },
            { label: "GBP (£)", value: "gbp" },
            { label: "CAD ($)", value: "cad" },
            { label: "AUD ($)", value: "aud" },
          ]}
          placeholder="Select currency"
        />

        {/* Benefits */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Benefits Offered {`(optional)`}
          </label>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={handleAddBenefit}
                placeholder="e.g., Health Insurance, Remote Work, Stock Options"
                className="w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                Enter ↵
              </span>
            </div>
          </div>

          {/* Benefits List */}
          {(form.watch("benefits") as string[]).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                {(form.watch("benefits") as string[]).length} benefit
                {(form.watch("benefits") as string[]).length !== 1
                  ? "s"
                  : ""}{" "}
                added
              </p>
              <div className="flex flex-wrap gap-2">
                {(form.watch("benefits") as string[]).map((benefit, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-foreground border text-muted-foreground rounded-sm text-sm cursor-pointer"
                    onClick={() => handleRemoveBenefit(index)}
                  >
                    <span>{benefit}</span>
                    <button
                      type="button"
                      className="ml-1 hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SalaryAndBenefits;
