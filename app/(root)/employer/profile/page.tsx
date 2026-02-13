"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building2,
  Calendar,
  Edit2,
  Globe,
  Heart,
  Linkedin,
  MapPin,
  Plus,
  Save,
  TrendingUp,
  Twitter,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schemas
const employerSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  headquartersLocation: z.string().optional(),
  operatingLocations: z.string().optional(),
  openPositionsCount: z.string().optional(),
  hiringStatus: z
    .enum(["actively hiring", "not hiring", "selective"])
    .optional(),
  coreValues: z.array(z.string()).optional(),
  foundedYear: z.string().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type EmployerFormData = z.infer<typeof employerSchema>;

const sections = [
  { id: "about", label: "About", icon: Building2 },
  { id: "positions", label: "Open Positions", icon: Briefcase },
  { id: "culture", label: "Culture", icon: Heart },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "social", label: "Social Links", icon: Globe },
];

export default function EmployerProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [coreValues, setCoreValues] = useState<string[]>([]);
  const [showAddValue, setShowAddValue] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const form = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      description: "",
      headquartersLocation: "",
      operatingLocations: "",
      openPositionsCount: "",
      hiringStatus: "actively hiring",
      coreValues: [],
      foundedYear: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
  });

  const onSubmit = (data: EmployerFormData) => {
    const completeEmployerData = {
      company: data,
      coreValues: coreValues,
      logo: logoFile,
    };

    console.log("[v0] Complete Employer Profile Data:", completeEmployerData);
    console.log("[v0] Company Info:", completeEmployerData.company);
    console.log("[v0] Core Values:", completeEmployerData.coreValues);
    console.log("[v0] Logo:", completeEmployerData.logo);

    setEditMode(false);
  };

  const addValue = () => {
    if (newValue.trim()) {
      setCoreValues([...coreValues, newValue]);
      setNewValue("");
      setShowAddValue(false);
    }
  };

  const removeValue = (valueToRemove: string) => {
    setCoreValues(coreValues.filter((value) => value !== valueToRemove));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              Employer Profile
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your company information and job openings
            </p>
          </div>
          <button
            onClick={() => {
              if (editMode) {
                form.handleSubmit(onSubmit)();
              } else {
                setEditMode(true);
              }
            }}
            className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 ${
              editMode
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {editMode ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="fixed top-32 w-64 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Sections
              </p>
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            {!form.watch("companyName") && !editMode ? (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg py-12 text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground font-semibold mb-1 text-lg">
                  No Company Profile Yet
                </p>
                <p className="text-muted-foreground text-sm">
                  Click the "Edit Profile" button to add your company
                  information.
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-6">
                  {/* Logo */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-lg bg-muted border-2 border-border flex items-center justify-center overflow-hidden">
                      {logoFile ? (
                        <span className="text-sm font-semibold text-muted-foreground text-center px-2">
                          {logoFile}
                        </span>
                      ) : (
                        <Building2 className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    {editMode && (
                      <>
                        <button
                          onClick={() => logoRef.current?.click()}
                          className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                        <input
                          ref={logoRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>

                  {/* Company Info */}
                  <div className="flex-1">
                    {editMode ? (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-muted-foreground">
                                Company Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Company Name"
                                  {...field}
                                  className="w-full text-2xl sm:text-3xl font-black bg-transparent text-foreground border-b-2 border-primary focus:outline-none focus:border-primary/70"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-muted-foreground">
                                Industry
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g., Technology, Finance, Healthcare"
                                  {...field}
                                  className="w-full text-lg font-semibold bg-transparent text-muted-foreground border-b-2 border-secondary focus:outline-none focus:border-secondary/70"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-3xl sm:text-4xl font-black mb-2">
                          {form.watch("companyName")}
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground font-semibold mb-2">
                          {form.watch("industry") || "Industry not specified"}
                        </p>
                        {form.watch("foundedYear") && (
                          <p className="text-sm text-muted-foreground">
                            Founded {form.watch("foundedYear")}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Hiring Status Badge */}
                  {!editMode && (
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${
                        form.watch("hiringStatus") === "actively hiring"
                          ? "bg-green-500/15 text-green-700 border-green-500/30"
                          : form.watch("hiringStatus") === "selective"
                            ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
                            : "bg-red-500/15 text-red-700 border-red-500/30"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor:
                            form.watch("hiringStatus") === "actively hiring"
                              ? "#22c55e"
                              : form.watch("hiringStatus") === "selective"
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      />
                      <span className="capitalize">
                        {form.watch("hiringStatus") || "Status not set"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {(editMode || form.watch("description")) && (
                  <div className="mt-6 pt-6 border-t border-primary/20">
                    {editMode ? (
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-muted-foreground">
                              Company Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your company..."
                                {...field}
                                className="w-full h-24 text-base bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none resize-none p-3"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {form.watch("description")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* About Section */}
            {activeSection === "about" && (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  About Company
                </h2>

                {!editMode &&
                !form.watch("website") &&
                !form.watch("companySize") &&
                !form.watch("headquartersLocation") ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No company details added. Click edit to add information.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Website
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="https://example.com"
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-blue-500 focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <a
                          href={form.watch("website") || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          {form.watch("website") || "Not provided"}
                        </a>
                      )}
                    </div>

                    {/* Company Size */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Company Size
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="companySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g., 50-100, 1000+"
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-purple-500 focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="text-foreground font-semibold">
                          {form.watch("companySize") || "Not specified"}
                        </p>
                      )}
                    </div>

                    {/* Headquarters */}
                    <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Headquarters
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="headquartersLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="City, Country"
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-green-500 focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="text-foreground font-semibold">
                          {form.watch("headquartersLocation") ||
                            "Not specified"}
                        </p>
                      )}
                    </div>

                    {/* Founded Year */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Founded
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="foundedYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g., 2010"
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-amber-500 focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="text-foreground font-semibold">
                          {form.watch("foundedYear") || "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Open Positions Section */}
            {activeSection === "positions" && (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Hiring Information
                </h2>

                {!editMode &&
                !form.watch("openPositionsCount") &&
                !form.watch("hiringStatus") ? (
                  <div className="py-12 text-center">
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      No hiring information added yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Open Positions */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Open Positions
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="openPositionsCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g., 15"
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="text-3xl font-black text-primary">
                          {form.watch("openPositionsCount") || "0"}
                        </p>
                      )}
                    </div>

                    {/* Hiring Status */}
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-secondary" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Hiring Status
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="hiringStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-secondary focus:outline-none"
                                >
                                  <option value="actively hiring">
                                    Actively Hiring
                                  </option>
                                  <option value="selective">
                                    Selective Hiring
                                  </option>
                                  <option value="not hiring">Not Hiring</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="text-foreground font-semibold capitalize">
                          {form.watch("hiringStatus") || "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Culture Section */}
            {activeSection === "culture" && (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Core Values
                </h2>

                {coreValues.length === 0 && !editMode ? (
                  <div className="py-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      No core values added yet. Click edit to add your company
                      values.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {coreValues.map((value) => (
                        <div
                          key={value}
                          className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                            editMode
                              ? "bg-muted text-foreground cursor-pointer hover:bg-red-500/20 hover:text-red-500"
                              : "bg-primary/15 text-primary border border-primary/30"
                          }`}
                          onClick={() => editMode && removeValue(value)}
                        >
                          {value}
                          {editMode && <X className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>

                    {editMode && (
                      <>
                        {!showAddValue ? (
                          <button
                            onClick={() => setShowAddValue(true)}
                            className="flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                            Add Core Value
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Enter core value"
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && addValue()
                              }
                              className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                              autoFocus
                            />
                            <Button
                              onClick={addValue}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
                            >
                              Add
                            </Button>
                            <button
                              onClick={() => {
                                setShowAddValue(false);
                                setNewValue("");
                              }}
                              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Locations Section */}
            {activeSection === "locations" && (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Operating Locations
                </h2>

                {!editMode && !form.watch("operatingLocations") ? (
                  <div className="py-12 text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      No operating locations added yet.
                    </p>
                  </div>
                ) : (
                  <>
                    {editMode ? (
                      <FormField
                        control={form.control}
                        name="operatingLocations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-muted-foreground">
                              Locations
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., New York, San Francisco, London, Tokyo"
                                {...field}
                                className="w-full h-24 p-3 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form
                          .watch("operatingLocations")
                          ?.split(",")
                          .map((location, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 flex items-center gap-3"
                            >
                              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <p className="text-foreground font-semibold">
                                {location.trim()}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Social Links Section */}
            {activeSection === "social" && (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  Social Links
                </h2>

                {!editMode &&
                !form.watch("linkedinUrl") &&
                !form.watch("twitterUrl") ? (
                  <div className="py-12 text-center">
                    <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      No social links added yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LinkedIn */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          LinkedIn
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="linkedinUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="https://linkedin.com/company/..."
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-blue-500 focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <a
                          href={form.watch("linkedinUrl") || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          {form.watch("linkedinUrl") || "Not provided"}
                        </a>
                      )}
                    </div>

                    {/* Twitter */}
                    <div className="bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                          <Twitter className="w-5 h-5 text-sky-600" />
                        </div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Twitter/X
                        </label>
                      </div>
                      {editMode ? (
                        <FormField
                          control={form.control}
                          name="twitterUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="https://twitter.com/..."
                                  {...field}
                                  className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-sky-500 focus:outline-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <a
                          href={form.watch("twitterUrl") || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 font-semibold hover:underline"
                        >
                          {form.watch("twitterUrl") || "Not provided"}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
