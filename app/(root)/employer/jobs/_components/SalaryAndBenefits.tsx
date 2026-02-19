import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { UseFormReturn } from "react-hook-form";

interface SalaryAndBenefitsProps {
  form: UseFormReturn<JobFormValues>;
}
const SalaryAndBenefits = ({ form }: SalaryAndBenefitsProps) => {
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
        <CustomField
          control={form.control}
          name="benefits"
          label="Benefits Offered"
          type="textarea"
          placeholder="Describe the benefits package (health insurance, 401k, PTO, stock options, etc.)"
        />
      </div>
    </>
  );
};

export default SalaryAndBenefits;
