"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  MoreVertical,
  Search,
  Users,
  XCircle,
} from "lucide-react";

// Mock data
const mockApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-02-20",
    status: "Shortlisted",
    avatar: "SJ",
    gradient: "from-blue-400 to-blue-600",
    resumeUrl: "#",
    coverLetter:
      "I am excited to apply for the Senior Frontend Developer position. With 5+ years of experience in React and modern web technologies...",
    notes: "Strong portfolio, excellent communication skills",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    jobTitle: "Product Manager",
    appliedDate: "2024-02-19",
    status: "Reviewing",
    avatar: "MC",
    gradient: "from-green-400 to-green-600",
    resumeUrl: "#",
    coverLetter:
      "I bring 7 years of product management experience at leading tech companies...",
    notes: "Good background, needs technical skills assessment",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    jobTitle: "UX/UI Designer",
    appliedDate: "2024-02-18",
    status: "Pending",
    avatar: "ER",
    gradient: "from-purple-400 to-purple-600",
    resumeUrl: "#",
    coverLetter:
      "Passionate designer with expertise in user-centered design...",
    notes: "",
  },
  {
    id: 4,
    name: "David Park",
    email: "david.park@email.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-02-17",
    status: "Rejected",
    avatar: "DP",
    gradient: "from-orange-400 to-orange-600",
    resumeUrl: "#",
    coverLetter:
      "Experienced developer with 3 years in JavaScript frameworks...",
    notes: "Limited experience with required tech stack",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    jobTitle: "Backend Engineer",
    appliedDate: "2024-02-16",
    status: "Shortlisted",
    avatar: "LW",
    gradient: "from-pink-400 to-pink-600",
    resumeUrl: "#",
    coverLetter:
      "Backend specialist with expertise in Node.js and databases...",
    notes: "Great problem-solving skills, strong system design knowledge",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-secondary/10 text-secondary border border-secondary/30",
  Reviewing: "bg-chart-1/10 text-chart-1 border border-chart-1/30",
  Shortlisted: "bg-primary/10 text-primary border border-primary/30",
  Rejected: "bg-destructive/10 text-destructive border border-destructive/30",
};

const statusIcons: Record<string, React.ReactNode> = {
  Pending: <Clock className="w-3 h-3" />,
  Reviewing: <Users className="w-3 h-3" />,
  Shortlisted: <CheckCircle className="w-3 h-3" />,
  Rejected: <XCircle className="w-3 h-3" />,
};

const stats = [
  {
    label: "Total Applicants",
    value: mockApplicants.length,
    icon: <Users className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    label: "Pending",
    value: mockApplicants.filter((a) => a.status === "Pending").length,
    icon: <Clock className="w-5 h-5" />,
    color: "text-secondary",
  },
  {
    label: "Shortlisted",
    value: mockApplicants.filter((a) => a.status === "Shortlisted").length,
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    label: "Rejected",
    value: mockApplicants.filter((a) => a.status === "Rejected").length,
    icon: <XCircle className="w-5 h-5" />,
    color: "text-destructive",
  },
];

export default function ApplicantsPage() {
  return (
    <div className="flex-1 flex flex-col lg:ml-60">
      {/* Page Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            Applicants
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Manage and review job applications
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="pb-4 lg:pb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              style={{ left: "8px" }}
            />
            <Input
              type="text"
              placeholder="Search applicants..."
              className="w-full pl-12.5 text-sm"
              style={{ paddingLeft: "27px" }}
            />
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-2">
            <Select defaultValue="All">
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>

                <SelectItem value="Pending">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                </SelectItem>

                <SelectItem value="Reviewing">
                  <span className="flex items-center gap-2">
                    <Users className="w-3 h-3" /> Reviewing
                  </span>
                </SelectItem>

                <SelectItem value="Shortlisted">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> Shortlisted
                  </span>
                </SelectItem>

                <SelectItem value="Rejected">
                  <span className="flex items-center gap-2">
                    <XCircle className="w-3 h-3" /> Rejected
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm gap-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="pt-4 space-y-6 lg:space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {stats.map((stat, idx) => (
              <Card
                key={idx}
                className="p-4 lg:p-6 bg-background border border-border hover:shadow-lg transition"
              >
                <div className="flex items-start gap-3 lg:gap-4">
                  <div
                    className={`p-2 lg:p-3 rounded-lg bg-muted ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Applicants Table */}
          <Card className="bg-background border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow className="border-b border-border hover:bg-muted">
                    <TableHead className="text-foreground font-semibold text-xs lg:text-sm">
                      Candidate
                    </TableHead>
                    <TableHead className="text-foreground font-semibold text-xs lg:text-sm hidden sm:table-cell">
                      Job Title
                    </TableHead>
                    <TableHead className="text-foreground font-semibold text-xs lg:text-sm hidden md:table-cell">
                      Applied Date
                    </TableHead>
                    <TableHead className="text-foreground font-semibold text-xs lg:text-sm">
                      Status
                    </TableHead>
                    <TableHead className="text-foreground font-semibold text-xs lg:text-sm text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplicants.map((applicant) => (
                    <TableRow
                      key={applicant.id}
                      className="border-b border-border hover:bg-accent/50 transition"
                    >
                      <TableCell className="py-3 lg:py-4">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <Avatar
                            className={`h-8 lg:h-10 w-8 lg:w-10 bg-gradient-to-br ${applicant.gradient}`}
                          >
                            <AvatarFallback className="text-white text-xs lg:text-sm font-bold">
                              {applicant.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-foreground truncate">
                              {applicant.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs lg:text-sm text-foreground hidden sm:table-cell truncate">
                        {applicant.jobTitle}
                      </TableCell>
                      <TableCell className="text-xs lg:text-sm text-muted-foreground hidden md:table-cell">
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusColors[applicant.status]} text-xs lg:text-sm gap-1`}
                        >
                          {statusIcons[applicant.status]}
                          {applicant.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Applicant Detail Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition">
                                <Eye className="w-4 h-4" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                  <Avatar
                                    className={`h-9 w-9 bg-gradient-to-br ${applicant.gradient}`}
                                  >
                                    <AvatarFallback className="text-white text-sm font-bold">
                                      {applicant.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  {applicant.name}
                                </DialogTitle>
                              </DialogHeader>

                              <div className="space-y-5 py-2">
                                {/* Contact Information */}
                                <div>
                                  <h3 className="text-sm font-semibold text-foreground mb-2">
                                    Contact Information
                                  </h3>
                                  <div className="space-y-1.5 text-sm bg-muted/50 rounded-lg p-3">
                                    <p>
                                      <span className="text-muted-foreground">
                                        Email:{" "}
                                      </span>
                                      <span className="text-foreground">
                                        {applicant.email}
                                      </span>
                                    </p>
                                    <p>
                                      <span className="text-muted-foreground">
                                        Position:{" "}
                                      </span>
                                      <span className="text-foreground">
                                        {applicant.jobTitle}
                                      </span>
                                    </p>
                                    <p>
                                      <span className="text-muted-foreground">
                                        Applied:{" "}
                                      </span>
                                      <span className="text-foreground">
                                        {new Date(
                                          applicant.appliedDate,
                                        ).toLocaleDateString()}
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                {/* Resume */}
                                <div>
                                  <h3 className="text-sm font-semibold text-foreground mb-2">
                                    Resume
                                  </h3>
                                  <Button
                                    variant="outline"
                                    className="w-full border-border text-foreground hover:bg-muted text-sm"
                                  >
                                    View Resume
                                  </Button>
                                </div>

                                {/* Cover Letter */}
                                <div>
                                  <h3 className="text-sm font-semibold text-foreground mb-2">
                                    Cover Letter
                                  </h3>
                                  <p className="text-sm text-foreground bg-muted p-3 rounded-lg leading-relaxed">
                                    {applicant.coverLetter}
                                  </p>
                                </div>

                                {/* Internal Notes */}
                                <div>
                                  <h3 className="text-sm font-semibold text-foreground mb-2">
                                    Internal Notes
                                  </h3>
                                  <textarea
                                    defaultValue={applicant.notes}
                                    className="w-full p-3 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                    rows={3}
                                    placeholder="Add internal notes..."
                                  />
                                </div>

                                {/* Update Status */}
                                <div>
                                  <h3 className="text-sm font-semibold text-foreground mb-2">
                                    Update Status
                                  </h3>
                                  <Select defaultValue={applicant.status}>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">
                                        Pending
                                      </SelectItem>
                                      <SelectItem value="Reviewing">
                                        Reviewing
                                      </SelectItem>
                                      <SelectItem value="Shortlisted">
                                        Shortlisted
                                      </SelectItem>
                                      <SelectItem value="Rejected">
                                        Rejected
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <DialogFooter className="gap-2">
                                <Button variant="outline" className="flex-1">
                                  Cancel
                                </Button>
                                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <button className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
