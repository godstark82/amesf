'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Mail,
  User,
  Phone,
  Building2,
  Globe,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { CONSTANTS } from "@/lib/constants";
import { registerUser, type RegistrationData } from "@/lib/registration";

const categoryTable = [
  ["Student (Poster Presentation) IILM Only", "₹500/-"],
  ["Student (Poster Presentation) Non-IILM", "₹750/-"],
  ["Research Scholars/Faculty - IILM Only (Oral/Poster)", "₹1500/-"],
  ["Research Scholars/Faculty - Non-IILM (Oral/Poster)", "₹2000/-"],
  ["Research Scholars/Faculty - IILM Only (Oral/Poster + Publication in Peer Reviewed Journals)", "₹2500/-"],
  ["Research Scholars/Faculty - Non-IILM (Oral/Poster + Publication in Peer Reviewed Journals)", "₹3000/-"],
  ["Research Scholars/Faculty - IILM Only (Oral/Poster + Publication in Proceedings)", "₹1500/- + APC Charges"],
  ["Research Scholars/Faculty - Non-IILM (Oral/Poster + Publication in Proceedings)", "₹2000/- + APC Charges"],
  ["Research Scholars/Faculty - IILM Only (Oral/Poster + Publication in Scopus Journals)", "₹1500/- + APC Charges"],
  ["Research Scholars/Faculty - Non-IILM (Oral/Poster + Publication in Scopus Journals)", "₹2000/- + APC Charges"],
];

const bankDetails = [
  ["Beneficiary Name", "IILM UNIVERSITY"],
  ["Account Number", "10094813150"],
  ["IFSC Code", "IDFB0020154"],
  ["SWIFT Code", "IDFBINBBMUM"],
  ["Bank Name", "IDFC FIRST BANK"],
  ["Branch", "GREATER NOIDA BRANCH"],
];


interface FormErrors {
  [key: string]: string;
}

export default function UploadPaperPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    affiliation: "",
    country: "",
    category: "",
    daysAttending: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateField = (name: string, value: string | boolean | File | null): string => {
    switch (name) {
      case "fullName":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Full name is required";
        }
        return "";
      case "email":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Email is required";
        }
        if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        return "";
      case "password":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Password is required";
        }
        if (typeof value === "string" && value.length < 8) {
          return "Password must be at least 8 characters long";
        }
        return "";
      case "confirmPassword":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Please confirm your password";
        }
        if (typeof value === "string" && value !== form.password) {
          return "Passwords do not match";
        }
        return "";
      case "phone":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Phone number is required";
        }
        if (typeof value === "string" && !/^[\d\s\+\-\(\)]+$/.test(value)) {
          return "Please enter a valid phone number";
        }
        return "";
      case "affiliation":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Affiliation is required";
        }
        return "";
      case "country":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Country is required";
        }
        return "";
      case "category":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Registration category is required";
        }
        return "";
      case "daysAttending":
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Days attending is required";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = [
      "fullName",
      "email",
      "password",
      "confirmPassword",
      "phone",
      "affiliation",
      "country",
      "category",
      "daysAttending",
    ];
    const newTouched: { [key: string]: boolean } = {};
    const newErrors: FormErrors = {};
    
    allFields.forEach((field) => {
      newTouched[field] = true;
      const value = form[field as keyof typeof form];
      const error = validateField(field, value as string | boolean | File | null);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setStatus("Please fix the errors in the form before submitting.");
      setStatusType("error");
      return;
    }
    
    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const registrationData: RegistrationData = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        affiliation: form.affiliation,
        country: form.country,
        category: form.category,
        daysAttending: form.daysAttending,
        presentingPaper: false,
      };

      const result = await registerUser(registrationData);

      if (!result.success) {
        setStatus(result.error || result.message || "Submission failed");
        setStatusType("error");
        setLoading(false);
        return;
      }

      setStatus(result.message || "Submission successful");
      setStatusType("success");
      setShowModal(true);

      // Store email for user panel access
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userEmail', form.email);
      }

      // Auto-login the user after successful registration
      if (result.userId && typeof window !== 'undefined') {
        try {
          const { signInWithEmailAndPassword } = await import('firebase/auth');
          const { auth } = await import('@/lib/firebase');
          if (auth) {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            sessionStorage.setItem('userEmail', form.email);
            sessionStorage.setItem('userId', result.userId);
          }
        } catch (loginError: any) {
          console.error('Auto-login failed:', loginError);
          // Still show success, user can login manually
          if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/wrong-password') {
            setStatus("Registration successful, but auto-login failed. Please log in manually.");
            setStatusType("error");
          }
        }
      }

      // Reset form after successful submission
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        affiliation: "",
        country: "",
        category: "",
        daysAttending: "",
      });
      setErrors({});
      setTouched({});
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      setStatus("Unexpected error occurred, please try again.");
      setStatusType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Bank details */}
        <Card className="border-none shadow-medium overflow-hidden">
          <CardHeader className="bg-linear-to-r from-primary to-primary/90 text-white">
            <h2 className="text-2xl font-bold">Bank Details</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-muted/50">
                  </tr>
                </thead>
                <tbody>
                  {bankDetails.map(([label, value], idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-3 py-1.5">{label}</td>
                      <td className="px-3 py-1.5 text-right font-medium text-primary">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-3 bg-muted/30 border-t border-gray-300">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">APC:</span> Article
                Processing Charges, applicable where indicated.
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Registration Fees */}
        <Card className="border-none shadow-medium overflow-hidden">
          <CardHeader className="bg-linear-to-r from-primary to-primary/90 text-white">
            <h2 className="text-2xl font-bold">Registration Categories & Fees</h2>
            <p className="text-primary-foreground/80 text-sm">
              Choose the category that applies to you
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-muted/50">
                    <th className="px-3 py-2 text-left font-semibold">Category</th>
                    <th className="px-3 py-2 text-right font-semibold">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryTable.map(([cat, amt], idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-3 py-1.5">{cat}</td>
                      <td className="px-3 py-1.5 text-right font-medium text-primary">
                        {amt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-3 bg-muted/30 border-t border-gray-300">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">APC:</span> Article
                Processing Charges, applicable where indicated.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="border-none shadow-medium" id="register">
          <CardHeader className="bg-linear-to-r from-primary to-primary/90 text-white">
            <h2 className="text-2xl font-bold">Conference Registration</h2>
            <p className="text-primary-foreground/80">
              Fill out the form below to register for the conference. You can submit papers later from your user panel.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Account Creation Notice */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Account Creation
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    By registering, you'll create an account that allows you to log in later to manage your submissions, 
                    view your registration status, and submit papers. Your password will be securely stored.
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Personal Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      Full Name *
                    </Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Dr. John Doe"
                        required
                        className={`transition-all duration-200 ${
                          errors.fullName
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {touched.fullName && !errors.fullName && form.fullName && (
                        <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.fullName && (
                      <p id="fullName-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john.doe@university.edu"
                        required
                        className={`transition-all duration-200 ${
                          errors.email
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {touched.email && !errors.email && form.email && (
                        <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      Password * <span className="text-xs text-muted-foreground font-normal">(min. 8 characters)</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Create a secure password"
                        required
                        className={`transition-all duration-200 pr-10 ${
                          errors.password
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      {touched.password && !errors.password && form.password && (
                        <CheckCircle className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.password && (
                      <p id="password-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Re-enter your password"
                        required
                        className={`transition-all duration-200 pr-10 ${
                          errors.confirmPassword
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      {touched.confirmPassword && !errors.confirmPassword && form.confirmPassword && (
                        <CheckCircle className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirmPassword-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+91 98765 43210"
                        required
                        className={`transition-all duration-200 ${
                          errors.phone
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {touched.phone && !errors.phone && form.phone && (
                        <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliation" className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      Affiliation *
                    </Label>
                    <div className="relative">
                      <Input
                        id="affiliation"
                        name="affiliation"
                        value={form.affiliation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="University/Institution Name"
                        required
                        className={`transition-all duration-200 ${
                          errors.affiliation
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.affiliation}
                        aria-describedby={errors.affiliation ? "affiliation-error" : undefined}
                      />
                      {touched.affiliation && !errors.affiliation && form.affiliation && (
                        <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.affiliation && (
                      <p id="affiliation-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.affiliation}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      Country *
                    </Label>
                    <div className="relative">
                      <Input
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="India"
                        required
                        className={`transition-all duration-200 ${
                          errors.country
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? "country-error" : undefined}
                      />
                      {touched.country && !errors.country && form.country && (
                        <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {errors.country && (
                      <p id="country-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      Registration Category *
                    </Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger
                        id="category"
                        className={`w-full ${
                          errors.category
                            ? "border-destructive focus:ring-destructive/20"
                            : ""
                        }`}
                        aria-invalid={!!errors.category}
                        aria-describedby={errors.category ? "category-error" : undefined}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryTable.map(([cat]) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p id="category-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daysAttending" className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      Days Attending *
                    </Label>
                    <Select
                      value={form.daysAttending}
                      onValueChange={(value) => handleSelectChange("daysAttending", value)}
                    >
                      <SelectTrigger
                        id="daysAttending"
                        className={`w-full transition-all duration-200 ${
                          errors.daysAttending
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                        aria-invalid={!!errors.daysAttending}
                        aria-describedby={errors.daysAttending ? "daysAttending-error" : undefined}
                      >
                        <SelectValue placeholder="Select days attending" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day1">Day 1</SelectItem>
                        <SelectItem value="day2">Day 2</SelectItem>
                        <SelectItem value="bothDays">Both Days</SelectItem>
                      </SelectContent>
                    </Select>
                    {touched.daysAttending && !errors.daysAttending && form.daysAttending && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </div>
                    )}
                    {errors.daysAttending && (
                      <p id="daysAttending-error" className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.daysAttending}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Information Notice */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Paper Submission
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    After registration, you can log in to your user panel to submit papers and manage your submissions.
                  </p>
                </div>
              </div>

              {/* Technical Support Notice */}
              <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm">
                  <span className="font-semibold">Technical Support:</span> If you
                  face any issues during submission, please email your paper
                  directly to{" "}
                  <a
                    href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {CONSTANTS.SUPPORT_EMAIL}
                  </a>
                </p>
              </div>

              {/* Status Messages */}
              {status && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg border animate-in fade-in duration-300 ${
                    statusType === "error"
                      ? "bg-destructive/10 border-destructive/20 text-destructive"
                      : statusType === "success"
                      ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
                      : "bg-primary/10 border-primary/20 text-primary"
                  }`}
                >
                  {statusType === "error" ? (
                    <XCircle className="w-5 h-5 shrink-0" />
                  ) : statusType === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <p className="font-semibold">{status}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="min-w-[220px] h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Submission Confirmed!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-center text-muted-foreground">
              Your registration has been successfully completed for {CONSTANTS.CONFERENCE_ABBR}, hosted by {CONSTANTS.COLLAGE_NAME}
            </p>

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Account Created Successfully
              </p>
              <p className="text-sm text-muted-foreground">
                Your account has been created and you've been automatically logged in. 
                You can now access your user panel to manage your submissions and view your registration details.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">What's Next?</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>You will receive a confirmation email shortly</li>
                <li>Log in to your user panel to submit papers and manage your submissions</li>
                <li>Check your email regularly for updates</li>
              </ul>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              We appreciate your interest and look forward to seeing you at the event.
            </p>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <DialogClose
              render={
                <Button variant="outline" className="w-full sm:w-auto">
                  Close
                </Button>
              }
            />
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                setShowModal(false);
                window.location.href = '/user';
              }}
            >
              View My Submissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

