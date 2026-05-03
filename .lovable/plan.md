

# OBRUS Apex Services — Major Website Rebuild Plan

This is a significant overhaul covering: updated homepage with new sections, refreshed content across all pages, a smart multi-step service request form, a login page, and a user dashboard. The admin panel requires a backend (Lovable Cloud) — we will build the frontend structure now and connect the backend later.

---

## What We Will Build

### 1. Homepage Overhaul (`src/pages/Index.tsx`)
- **Hero**: New headline and subtext as specified, buttons "Request a Service" + "View Available Jobs"
- **About Preview**: 2-3 line company intro
- **Services Section**: Updated sub-services for all 4 categories (Manpower with skilled technicians/HVAC/plumbing; Facility with electrical/HVAC/plumbing maintenance; Environmental with waste/fumigation/sanitation; Equipment with industrial tools/HVAC components)
- **Why Choose Us**: New section with 5 points (experienced supervision, vetted manpower, fast response, strong operations understanding, safety commitment)
- **Available Jobs on Homepage**: 4 job cards (HVAC Technician Abuja, Facility Supervisor PH, Electrician Contract, Environmental Officer) with "View All Jobs" button
- **How It Works**: Two-column layout — For Clients (4 steps) and For Job Seekers (4 steps)
- **CTA Section**: "Need manpower, facility support, environmental services, or equipment?" with Request a Quote + Contact Us buttons

### 2. Services Data Update (`src/components/ServicesSection.tsx`)
- Update sub-services/details for all 4 service categories to match the new specifications exactly
- Update Facility Management to remove environmental items (already done previously, verify clean)

### 3. About Page Update (`src/pages/About.tsx`)
- Update intro text to include all 4 service areas
- Keep existing Mission, Vision, Values, and How We Work sections (already match the spec)

### 4. Smart Service Request Form — New Page (`src/pages/RequestService.tsx`)
- **Multi-step form** replacing the simple Quote page
- Step 1: Select service type (4 radio options)
- Step 2: Dynamic fields based on selection (Manpower: role, staff count, duration, location; Facility: facility type, size, services, frequency; Environmental: service type, area size, indoor/outdoor, frequency, urgency, location; Equipment: type, quantity, specs, delivery location)
- Step 3: Budget range (radio: ₦100K-500K, ₦500K-1M, ₦1M+)
- Step 4: File upload (optional, specs/drawings)
- Step 5: Contact details (name, company, phone, email)
- Confirmation message on submit with WhatsApp/phone follow-up note
- Progress indicator showing current step

### 5. Jobs Page Update (`src/pages/Jobs.tsx`)
- Update job listings to match spec: HVAC Technician (Abuja), Facility Supervisor (Port Harcourt), Electrician (Contract), Environmental Officer
- Add experience required and description fields to each job card
- Add filter by role/location

### 6. Login Page — New (`src/pages/Login.tsx`)
- Email + password form
- Link to Sign Up page
- "Forgot password?" link
- Frontend-only for now (will connect to Lovable Cloud later)

### 7. User Dashboard — New (`src/pages/Dashboard.tsx`)
- Sidebar or tab layout with sections:
  - My Service Requests (table with status: Pending / In Progress / Completed)
  - My Job Applications (for job seekers)
  - Profile settings
- Frontend-only with sample data (backend connection later)

### 8. Navigation & Routing Updates
- Add `/request-service` route (replaces `/quote`)
- Add `/login` route
- Add `/dashboard` route
- Update Navbar: keep existing links, add Login/Sign Up buttons in header
- Update Footer: add Environmental Services link

### 9. Content & Copy Updates
- Remove the word "integrated" from Footer tagline and anywhere else
- Update all service descriptions to match the new spec exactly

---

## Files to Create
- `src/pages/RequestService.tsx` — Multi-step smart form
- `src/pages/Login.tsx` — Login page
- `src/pages/Dashboard.tsx` — User dashboard

## Files to Edit
- `src/pages/Index.tsx` — Major rewrite with new sections
- `src/components/ServicesSection.tsx` — Updated sub-services
- `src/pages/Jobs.tsx` — Updated job listings with filters
- `src/pages/About.tsx` — Updated intro copy
- `src/pages/Quote.tsx` — Redirect to /request-service or remove
- `src/components/Navbar.tsx` — Add Login button, update quote link
- `src/components/Footer.tsx` — Add Environmental Services, remove "integrated"
- `src/App.tsx` — New routes

---

## Technical Notes
- All forms are frontend-only. Authentication and data persistence require Lovable Cloud setup as a next step.
- The dashboard will use local state with mock data to demonstrate the UI.
- The multi-step form uses React state to track the current step and dynamically render fields.
- No backend changes in this phase — purely UI/UX.

