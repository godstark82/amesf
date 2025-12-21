import { z } from "zod";

export const RegistrationWithPaperSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  phone: z.string().min(1, "Phone number is required"),
  affiliation: z.string().min(1, "Affiliation is required"),
  country: z.string().min(1, "Country is required"),
  category: z.string().min(1, "Registration category is required"),
  daysAttending: z.string().min(1, "Days attending is required"),
  presentingPaper: z.boolean().default(false),

  // Paper fields are optional - papers are submitted later in user panel
  paperTitle: z.string().optional(),
  paperAbstract: z.string().optional(),
  uploadedFile: z.instanceof(File).optional().nullable(),
});
