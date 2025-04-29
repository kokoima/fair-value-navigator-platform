
# User Interface Specifications

This document provides detailed information about each page in the application, including components, fields, layouts, and functionality.

## Table of Contents

1. [Authentication](#authentication)
   - [Login Page](#login-page)
   - [Register Page](#register-page)
   - [Forgot Password Page](#forgot-password-page)
   - [Register Success Page](#register-success-page)
2. [Dashboard](#dashboard)
3. [Companies Module](#companies-module)
   - [Companies List](#companies-list)
   - [Company Details](#company-details)
   - [Company Add/Edit](#company-add-edit)
4. [Valuations Module](#valuations-module)
   - [Valuation Form](#valuation-form)
   - [Valuation Edit](#valuation-edit)
   - [Valuation Reports](#valuation-reports)
5. [Portfolios Module](#portfolios-module)
   - [Portfolios List](#portfolios-list)
   - [Portfolio Details](#portfolio-details)
   - [Portfolio Analytics](#portfolio-analytics)
   - [Portfolio Report](#portfolio-report)

---

## Authentication

### Login Page

**File Path:** `src/pages/auth/Login.tsx`

**Description:** The login page provides users with an interface to authenticate into the application.

**Layout:**
- Full-height page with centered content
- Light gray background (`bg-gray-50`)
- All content is contained within a maximum width container with horizontal padding

**Components:**
1. **AuthHeader**
   - Location: Top of the page, centered
   - Contains: Logo image and application title
   - Logo path: `/lovable-uploads/26b8c634-12c7-4358-8fe5-4db8a7e91feb.png`
   - Title: "Fair Value" in large, bold text with corporate-700 color class

2. **LoginForm Card**
   - Location: Below the AuthHeader
   - Maximum width: `max-w-md`
   - Contents:
     - **CardHeader:**
       - Title: "Iniciar Sesión" - Large, centered text
       - Description: "Ingresa tus credenciales para acceder a la plataforma" - Smaller, centered text
     
     - **CardContent (Form):**
       - Email input field with:
         - Label: "Email"
         - Placeholder: "tu@email.com"
         - Validation: Required, email type
         - Tab navigation support
       
       - Password input field with:
         - Label: "Contraseña"
         - "¿Olvidaste tu contraseña?" link to right of label (navigates to `/forgot-password`)
         - No placeholder
         - Validation: Required
         - Type: password (masked input)
       
       - Submit button:
         - Text: "Iniciar Sesión" (changes to "Iniciando sesión..." when loading)
         - Full width
         - Primary color
         - Disabled state during form submission
     
     - **CardFooter:**
       - Text: "¿No tienes una cuenta?"
       - "Solicitar acceso" link (navigates to `/register`)
       - Centered alignment

**Functionality:**
- Form submission sends email and password to login API endpoint
- Success: Shows toast notification and redirects to `/dashboard`
- Error: Shows error toast notification
- Form prevents submission while loading
- Keyboard navigation support between fields

### Register Page

**File Path:** `src/pages/auth/Register.tsx`

**Description:** The registration page allows new users to request access to the application.

**Layout:**
- Same layout pattern as Login page with centered content
- Light gray background (`bg-gray-50`)
- Maximum width container with horizontal padding

**Components:**
1. **AuthHeader**
   - Identical to Login page

2. **RegisterForm Card**
   - Location: Below the AuthHeader
   - Contents:
     - **CardHeader:**
       - Title: "Solicitar Acceso" - Large, centered text
       - Description: "Completa el formulario para solicitar acceso a la plataforma" - Smaller, centered text
     
     - **CardContent (Form):**
       - Name input field
         - Label: "Nombre completo"
         - Placeholder: "Introduce tu nombre completo"
         - Validation: Required
       
       - Email input field
         - Label: "Email empresarial"
         - Placeholder: "tu@empresa.com"
         - Validation: Required, email type
       
       - Company input field
         - Label: "Empresa"
         - Placeholder: "Nombre de tu empresa"
         - Validation: Required
       
       - Password input field
         - Label: "Contraseña"
         - Validation: Required, minimum length
         - Type: password (masked input)
       
       - Confirm Password input field
         - Label: "Confirmar contraseña"
         - Validation: Must match password
         - Type: password (masked input)
       
       - Submit button:
         - Text: "Solicitar Acceso" (changes to "Procesando..." when loading)
         - Full width
         - Primary color
         - Disabled state during form submission
     
     - **CardFooter:**
       - Text: "¿Ya tienes una cuenta?"
       - "Iniciar sesión" link (navigates to `/login`)
       - Centered alignment

**Functionality:**
- Form collects user information and sends to register API endpoint
- Success: Redirects to `/register-success`
- Error: Shows appropriate validation or API error messages
- Password fields must match
- Form prevents submission while loading

### Forgot Password Page

**File Path:** `src/pages/auth/ForgotPassword.tsx`

**Description:** Page for users to request a password reset link.

**Layout:**
- Matches the consistent layout pattern of other auth pages
- Light gray background (`bg-gray-50`)
- Centered content with horizontal padding

**Components:**
1. **AuthHeader**
   - Identical to other auth pages

2. **ForgotPasswordForm Card**
   - Location: Below the AuthHeader
   - Contents:
     - **CardHeader:**
       - Title: "Recuperar Contraseña" - Large, centered text
       - Description: "Introduce tu email para recibir un enlace de recuperación" - Smaller, centered text
     
     - **CardContent (Form):**
       - Email input field
         - Label: "Email"
         - Placeholder: "tu@email.com"
         - Validation: Required, email type
       
       - Submit button:
         - Text: "Enviar Enlace" (changes to "Enviando..." when loading)
         - Full width
         - Primary color
         - Disabled state during form submission
     
     - **CardFooter:**
       - "Volver al inicio de sesión" link (navigates to `/login`)
       - Centered alignment

**Functionality:**
- Form collects email and sends to password reset API endpoint
- Success: Shows success message with instructions
- Error: Shows appropriate error message
- Form prevents submission while loading

### Register Success Page

**File Path:** `src/pages/auth/RegisterSuccess.tsx`

**Description:** Confirmation page shown after successful registration request.

**Layout:**
- Matches the consistent layout pattern of other auth pages
- Light gray background (`bg-gray-50`)
- Centered content with horizontal padding

**Components:**
1. **AuthHeader**
   - Identical to other auth pages

2. **RegisterSuccess Card**
   - Location: Below the AuthHeader
   - Contents:
     - **CardHeader:**
       - Title: "¡Solicitud Recibida!" - Large, centered text
       - Success icon (checkmark in circle)
     
     - **CardContent:**
       - Success message explaining that the request has been received
       - Instructions on next steps (will receive email notification)
       
     - **CardFooter:**
       - "Volver al inicio de sesión" button (navigates to `/login`)
       - Full width
         
**Functionality:**
- Static page, no form submission
- Button navigation back to login page

---

## Dashboard

**File Path:** `src/pages/dashboard/Dashboard.tsx`

**Description:** Main landing page after authentication, showing recent activity and summary information.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with padding
- Breadcrumbs at top

**Components:**
1. **DashboardLayout (wrapper)**
   - Sidebar: Left side, collapsible
   - Main content area: Right side, flexible width

2. **Breadcrumbs**
   - Location: Top of main content area
   - Shows current location in application hierarchy

3. **Page Heading**
   - Text: "Actividad Reciente"
   - Size: Large, bold

4. **Activity Card**
   - Contents:
     - Activity items showing recent actions in the application
     - Each activity has:
       - Title (action type)
       - Description (details about the action)
       - Timestamp (relative time, e.g., "Hace 2 días")
     - Items are separated by light borders
     - Activities vary based on user role

**Functionality:**
- Loads and displays recent user activities
- Activity content adapts to user's role
- No form submission
- Card serves as informational display

---

## Companies Module

### Companies List

**File Path:** `src/pages/companies/Companies.tsx`

**Description:** Page listing all companies with search and sorting capabilities.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with padding
- Breadcrumbs at top

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows current location: Dashboard > Companies

3. **Page Heading**
   - Text: "Companies" (translated)
   - Size: Large, bold

4. **Action Bar**
   - Search input:
     - Located on left side
     - Has search icon prefix
     - Placeholder text for searching companies
     - Filters companies by name or sector
   
   - Add Company Button:
     - Located on right side
     - Has plus icon
     - Text: "New" (translated)
     - Navigates to `/companies/new` when clicked

5. **CompaniesTable**
   - Sortable columns:
     - Name
     - Sector
     - Country
     - Latest Valuation Range
     - Valuations Count
   - Row clickable (navigates to company details)
   - Loading state with skeleton UI when fetching data
   - Empty state when no companies or no search results

**Functionality:**
- Loads companies data from API
- Real-time filtering based on search input
- Column sorting by clicking headers
- Row navigation to company details
- Add new company via button

### Company Details

**File Path:** `src/pages/companies/Company.tsx`

**Description:** Detailed view of a single company with valuations and users management.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with multiple cards
- Breadcrumbs at top with back button

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path: Dashboard > Companies > [Company Name]
   - Has back button

3. **Company Details Card**
   - **CompanyHeader:**
     - Company logo (with upload capability in edit mode)
     - Company name (editable)
     - Edit/Save/Cancel buttons
   
   - **CompanyFields:**
     - Trading name
     - Sector/Subsector
     - Country
     - Founded year
     - Registration identifier
     - Website (clickable link)
     - Description
     - All fields become editable in edit mode

4. **Valuations Card**
   - **ValuationsTable:**
     - Search input for filtering valuations
     - "New Valuation" button (opens name dialog)
     - Table with columns:
       - Name
       - Status
       - Creation Date
       - Last Update
       - Actions (duplicate, delete)
     - Row clickable (navigates to valuation details)

5. **Company Users Card**
   - **CompanyUsersTable:**
     - Users with access to the company
     - Invite user button
     - Columns: Name, Email, Role, Actions

6. **Delete Company Button**
   - Located at bottom right
   - Opens confirmation dialog when clicked

7. **Modal Dialogs:**
   - **ValuationNameDialog:** For creating new valuations
   - **DeleteCompanyDialog:** For confirming company deletion

**Functionality:**
- Loads and displays company details
- Edit mode for updating company information
- Logo upload and preview
- Valuations management (list, filter, create, navigate)
- Users management
- Company deletion with confirmation

### Company Add/Edit

**File Path:** `src/pages/companies/CompanyAdd.tsx` and `src/pages/companies/CompanyEdit.tsx`

**Description:** Form for creating new companies or editing existing ones.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with form in a card
- Breadcrumbs at top with back navigation

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - For Add: Dashboard > Companies > New Company
   - For Edit: Dashboard > Companies > [Company Name] > Edit

3. **Page Heading**
   - For Add: "New Company" (translated)
   - For Edit: "Edit Company" (translated)

4. **Company Form**
   - Form fields in a two-column grid layout:
     - Company Name (required)
     - Trading Name
     - Sector dropdown (required)
     - Subsector dropdown (required)
     - Country dropdown (required)
     - Founded Year (number input)
     - Registration Identifier
     - Website (URL input)
     - Description (textarea)
   
   - Form buttons:
     - Cancel: Returns to previous page
     - Submit: "Create" for new companies, "Update" for editing
     - Loading state during submission

**Functionality:**
- Add mode: Empty form for creating new company
- Edit mode: Pre-populated form with existing company data
- Validation for required fields
- Dynamic subsector options based on selected sector
- Form submission to API
- Success: Redirect to company details page
- Error: Display error toast message

---

## Valuations Module

### Valuation Form

**File Path:** `src/pages/valuations/ValuationForm.tsx`

**Description:** Initial page for creating a new valuation.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with form
- Breadcrumbs with back navigation

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path: Dashboard > Companies > [Company Name] > New Valuation

3. **Page Heading**
   - Text: "New Valuation" (translated)
   - Company name subtitle

4. **Valuation Name Form**
   - Input field for valuation name
   - Description text explaining the process
   - Start button to begin valuation

**Functionality:**
- Collects valuation name
- Creates initial valuation record
- Navigates to valuation edit page on submission

### Valuation Edit

**File Path:** `src/pages/valuations/ValuationEdit.tsx`

**Description:** Main interface for working with valuations, with tabbed sections for information, results, and reports.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with tabs
- Breadcrumbs with navigation path

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path: Dashboard > Companies > [Company Name] > Valuations > [Valuation Name]

3. **ValuationGeneralHeader**
   - Valuation name (editable)
   - Status badge
   - Last updated timestamp

4. **ValuationTabs**
   - Tab navigation:
     - Information
     - Results
     - Reports
   
   - **Information Tab:**
     - **ValuationInfoTabs:** Nested tab navigation:
       - General: Qualitative questions about the company
       - Scoring: Rating different aspects of the company
       - Financial: Financial data entry forms
     - Progress indicators for each section
     - Save as Draft / Next buttons
   
   - **Results Tab:**
     - Valuation calculation results
     - Summary of key values
     - Charts and visualizations
     - Details of calculation method
   
   - **Reports Tab:**
     - Report generation options
     - Preview of report sections
     - Download and share options

**Functionality:**
- Comprehensive valuation workflow
- Multi-section data collection
- Real-time progress tracking
- Data validation
- Results calculation when all required data is provided
- Report generation and customization

### Valuation Reports

**File Path:** `src/pages/valuations/reports/ValuationReportGeneration.tsx` and `src/pages/valuations/reports/ValuationReportView.tsx`

**Description:** Pages for generating and viewing valuation reports.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with report preview and options
- Breadcrumbs with navigation path

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path to the report

3. **ReportHeader**
   - Valuation name and company
   - Date generated
   - Report options

4. **ReportContent**
   - Rendered report with sections:
     - Executive Summary
     - Company Overview
     - Valuation Method
     - Financial Analysis
     - Scoring Analysis
     - Conclusion
   
5. **ReportSidebarActions**
   - Section selection checkboxes
   - Download options
   - Share report button

**Functionality:**
- Select report sections to include
- Generate PDF report
- Preview report content
- Download or share the report
- Print functionality

---

## Portfolios Module

### Portfolios List

**File Path:** `src/pages/portfolio/Portfolios.tsx`

**Description:** Page listing all portfolios with creation and management options.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with grid of portfolio cards
- Breadcrumbs at top

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows current location: Dashboard > Portfolios

3. **Page Heading**
   - Text: "Portfolios" (translated)
   - Size: Large, bold

4. **Action Button**
   - "Create Portfolio" button
   - Opens CreatePortfolioDialog when clicked

5. **PortfolioTable**
   - Grid or list of portfolio cards
   - Each card shows:
     - Portfolio name
     - Number of companies
     - Total valuation
     - Last updated date
   - Cards are clickable (navigate to portfolio details)

6. **CreatePortfolioDialog**
   - Modal with form to create new portfolio
   - Fields:
     - Portfolio name
     - Description
   - Buttons: Cancel, Create

**Functionality:**
- Lists all user portfolios
- Creates new portfolios
- Navigates to portfolio details
- Loading state with skeleton UI when fetching

### Portfolio Details

**File Path:** `src/pages/portfolio/PortfolioDetails.tsx`

**Description:** Detailed view of a portfolio with companies and analytics summary.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with multiple sections
- Breadcrumbs at top with back button

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path: Dashboard > Portfolios > [Portfolio Name]
   - Has back button

3. **Portfolio Header**
   - Portfolio name (editable)
   - Portfolio description (editable)
   - Action buttons:
     - Back to portfolios
     - Edit Portfolio
     - Generate Report
     - Delete Portfolio

4. **PortfolioStats**
   - Summary statistics:
     - Total valuation
     - Number of companies
     - Average valuation
     - Growth metrics

5. **Portfolio Content Grid**
   - **PortfolioCompanies:**
     - List of companies in the portfolio
     - Company name, sector, valuation
     - Remove company button for each
     - Loading states
   
   - **SectorDistribution:**
     - Pie chart showing distribution by sector
     - Percentage breakdown
     - View Analytics button

6. **AlertDialog Modals:**
   - Delete portfolio confirmation
   - Remove company confirmation

**Functionality:**
- Displays portfolio overview and statistics
- Allows editing portfolio name and description
- Shows companies in the portfolio
- Visualizes sector distribution
- Manages companies (view, remove)
- Portfolio deletion with confirmation
- Navigation to analytics and reports

### Portfolio Analytics

**File Path:** `src/pages/portfolio/PortfolioAnalytics.tsx`

**Description:** Detailed analytics and charts for portfolio performance.

**Layout:**
- Full application layout with sidebar navigation
- Main content area with charts grid
- Breadcrumbs at top with back button

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path: Dashboard > Portfolios > [Portfolio Name] > Analytics
   - Has back button

3. **Page Header**
   - Portfolio name and description
   - Back button

4. **Charts Grid**
   - Four-panel layout of charts:
     
     - **Sector Distribution Chart:**
       - Pie chart showing sector breakdown
       - Percentage labels
       - Interactive tooltips
     
     - **Company Valuations Chart:**
       - Bar chart of company valuations
       - Company names on X-axis
       - Valuation amount on Y-axis
       - Color-coded bars
     
     - **Growth Potential Chart:**
       - Bar chart showing growth projections
       - Company names on X-axis
       - Growth percentage on Y-axis
       - Color-coded bars
     
     - **Insights Panel:**
       - Key statistics in grid:
         - Total valuation
         - Number of companies
         - Top performing sector
         - Average growth rate
       - Recommendations box with action items

**Functionality:**
- Loads portfolio analytics data
- Renders interactive charts
- Provides key insights and metrics
- All charts have tooltips on hover
- Responsive layout that adjusts to screen size

### Portfolio Report

**File Path:** `src/pages/portfolio/PortfolioReport.tsx`

**Description:** Report generation interface for portfolios.

**Layout:**
- Similar to Valuation Report pages
- Full application layout with sidebar navigation
- Main content area with report preview and options
- Breadcrumbs with navigation path

**Components:**
1. **DashboardLayout (wrapper)**
   - Standard layout with sidebar

2. **Breadcrumbs**
   - Shows path to the portfolio report

3. **ReportHeader**
   - Portfolio name
   - Date generated
   - Report options

4. **ReportContent**
   - Rendered report with sections:
     - Portfolio Summary
     - Companies Overview
     - Sector Analysis
     - Valuation Summary
     - Growth Projections
     - Recommendations
   
5. **ReportSidebarActions**
   - Section selection checkboxes
   - Download options
   - Share report button

**Functionality:**
- Select report sections to include
- Generate PDF report
- Preview report content
- Download or share the report
- Print functionality
