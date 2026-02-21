import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { Check, CreditCard, DollarSign, Gift, X } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface SalaryAndBenefitsProps {
  form: UseFormReturn<JobFormValues>;
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
      {/* Enhanced Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Salary & Benefits
          </h2>
        </div>
        <p className="text-muted-foreground ml-11 text-sm">
          Define compensation and benefits for this role
        </p>
      </div>

      <div className="space-y-8">
        {/* Salary Range */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Salary Range
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <CustomField
                control={form.control}
                name="minimumSalary"
                label="Minimum Salary *"
                type="number"
                placeholder="50000"
              />
            </div>
            <div className="space-y-2">
              <CustomField
                control={form.control}
                name="maximumSalary"
                label="Maximum Salary *"
                type="number"
                placeholder="120000"
              />
            </div>
          </div>
        </div>

        {/* Currency */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-secondary" />
            Currency
          </h3>
          <div className="space-y-2">
            <CustomField
              control={form.control}
              name="currency"
              label=""
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
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gift className="w-4 h-4 text-primary" />
            Benefits Offered (Optional)
          </h3>
          <div className="space-y-3">
            {/* Input */}
            <div className="relative group">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={handleAddBenefit}
                placeholder="e.g., Health Insurance, Remote Work, Stock Options"
                className="w-full rounded-lg border border-border/50 bg-card text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all group-hover:border-primary/30"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                ⏎
              </span>
            </div>

            {/* Benefits List */}
            {(form.watch("benefits") as string[]).length > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                    {(form.watch("benefits") as string[]).length}
                  </span>
                  Benefit
                  {(form.watch("benefits") as string[]).length !== 1
                    ? "s"
                    : ""}{" "}
                  Added
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {(form.watch("benefits") as string[]).map(
                    (benefit, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-white/5 border border-primary/20 text-foreground rounded-lg text-sm font-medium group/benefit hover:border-primary/40 hover:bg-primary/5 transition-all"
                      >
                        <Check className="w-3 h-3 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-0.5 hover:bg-destructive/10 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
            {(form.watch("benefits") as string[]).length === 0 && (
              <div className="rounded-lg border border-dashed border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No benefits added yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryAndBenefits;
