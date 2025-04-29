
# Components Specifications

This document details the reusable components used throughout the application, including their props, functionality, and usage patterns.

## Table of Contents

1. [Layout Components](#layout-components)
2. [Authentication Components](#authentication-components)
3. [Company Components](#company-components)
4. [Valuation Components](#valuation-components)
5. [Portfolio Components](#portfolio-components)
6. [UI Components](#ui-components)

---

## Layout Components

### DashboardLayout

**File Path:** `src/components/layout/DashboardLayout.tsx`

**Description:** The main layout wrapper for all authenticated pages.

**Props:**
- `children`: React nodes to render in the content area

**Structure:**
- Wrapper div with min-height of screen
- Sidebar component (left side)
- Main content area (right side):
  - Header component at top
  - Content area with padding

**Functionality:**
- Manages sidebar collapsed state
- Provides consistent layout across authenticated pages
- Responsive design that adapts to screen sizes

### Sidebar

**File Path:** `src/components/layout/Sidebar.tsx`

**Description:** Navigation sidebar with collapsible functionality.

**Props:**
- None (uses context for collapse state)

**Structure:**
- Vertical navigation panel with:
  - Logo/brand at top
  - Navigation links grouped by section
  - User menu at bottom
  - Collapse/expand button

**Functionality:**
- Collapsible interface (full width or icons-only)
- Active link highlighting
- Navigation with React Router
- Persists collapsed state in localStorage
- Shows different menu items based on user role

### Breadcrumbs

**File Path:** `src/components/layout/Breadcrumbs.tsx`

**Description:** Navigation breadcrumbs showing current location in app hierarchy.

**Props:**
- `items`: Array of breadcrumb items (optional)
  - Each item has: `label`, `href`, `translateKey`
- `showBackButton`: Boolean to display back button (optional)

**Structure:**
- Horizontal list of breadcrumb links
- Optional back button at start
- Separator between items
- Current page highlighted differently

**Functionality:**
- Dynamic generation based on current route
- Translation support
- Navigation with React Router
- Optional manual item override

### Header

**File Path:** `src/components/layout/Header.tsx`

**Description:** Top navigation bar for authenticated pages.

**Props:**
- None

**Structure:**
- Horizontal bar with:
  - Sidebar toggle button (on mobile)
  - Page title
  - Right-side actions:
    - Search toggle
    - Language switcher
    - Notifications
    - User menu dropdown

**Functionality:**
- Controls sidebar on mobile
- Displays notifications
- Provides language switching
- User profile and logout access

---

## Authentication Components

### AuthHeader

**File Path:** `src/components/auth/AuthHeader.tsx`

**Description:** Common header used across authentication pages.

**Props:**
- None

**Structure:**
- Vertical layout with:
  - Logo image
  - Application name ("Fair Value")

**Styling:**
- Centered alignment
- Bottom margin spacing
- Logo sized appropriately
- Bold text for application name

### LoginForm

**File Path:** `src/components/auth/LoginForm.tsx`

**Description:** Form component for user authentication.

**Props:**
- None

**State:**
- `email`: String for email input
- `password`: String for password input
- `isLoading`: Boolean for form submission state

**Structure:**
- Card component containing:
  - CardHeader with title and description
  - CardContent with form:
    - Email input field
    - Password input field with forgotten password link
    - Submit button
  - CardFooter with registration link

**Functionality:**
- Form validation
- API integration with login endpoint
- Error handling with toast notifications
- Loading state during submission
- Navigation to dashboard on success
- Link to forgot password page
- Link to registration page

### RegisterForm

**File Path:** `src/components/auth/RegisterForm.tsx`

**Description:** Form for new user registration.

**Props:**
- None

**Structure:**
- Card component containing:
  - CardHeader with title and description
  - CardContent with form:
    - Full name input
    - Email input
    - Company input
    - Password input
    - Confirm password input
    - Submit button
  - CardFooter with login link

**Functionality:**
- Form validation including password matching
- API integration with register endpoint
- Error handling with toast notifications
- Loading state during submission
- Navigation to success page on successful registration
- Link to login page

### ForgotPasswordForm

**File Path:** `src/components/auth/ForgotPasswordForm.tsx`

**Description:** Form for password recovery process.

**Props:**
- None

**Structure:**
- Card component containing:
  - CardHeader with title and description
  - CardContent with form:
    - Email input
    - Submit button
  - CardFooter with login link

**Functionality:**
- Form validation
- API integration with password reset endpoint
- Success and error notifications
- Loading state during submission
- Link back to login page

### RegisterSuccess

**File Path:** `src/components/auth/RegisterSuccess.tsx`

**Description:** Confirmation message shown after successful registration.

**Props:**
- None

**Structure:**
- Card component containing:
  - CardHeader with title and success icon
  - CardContent with confirmation message
  - CardFooter with button to return to login

**Functionality:**
- Static display component
- Navigation back to login page

---

## Company Components

### CompaniesTable

**File Path:** `src/components/features/companies/CompaniesTable.tsx`

**Description:** Table listing companies with sorting and filtering.

**Props:**
- `companies`: Array of company objects
- `loading`: Boolean loading state
- `sortKey`: Current sort column
- `sortDirection`: Current sort direction ("asc" or "desc")
- `onSort`: Function to handle sort changes
- `onRowClick`: Function to handle row click
- `t`: Translation function

**Structure:**
- Table with columns:
  - Name
  - Sector
  - Country
  - Latest Valuation
  - Valuations Count
- Sortable column headers with indicators
- Skeleton loading state
- Empty state message

**Functionality:**
- Displays company data in tabular format
- Sortable columns with direction indicators
- Row click navigation
- Loading states with skeletons
- Empty state handling

### CompanyHeader

**File Path:** `src/components/features/companies/detail/CompanyHeader.tsx`

**Description:** Header section of company details page with logo and name.

**Props:**
- `editMode`: Boolean indicating edit state
- `company`: Company object with details
- `editedCompany`: Editable company object
- `onEditClick`: Function to enter edit mode
- `onCancelEdit`: Function to cancel editing
- `onSaveEdit`: Function to save changes
- `onFieldChange`: Function to handle field changes
- `logoFile`: File object for logo upload
- `logoPreview`: URL string for logo preview
- `onLogoChange`: Function to handle logo change

**Structure:**
- Horizontal layout with:
  - Logo area (with upload in edit mode)
  - Company name (editable in edit mode)
  - Action buttons (Edit/Save/Cancel)

**Functionality:**
- Displays company name and logo
- Switches between display and edit mode
- Logo upload and preview
- Form field editing
- Save and cancel actions

### CompanyFields

**File Path:** `src/components/features/companies/detail/CompanyFields.tsx`

**Description:** Display and edit form for company details.

**Props:**
- `editMode`: Boolean indicating edit state
- `company`: Company object with details
- `editedCompany`: Editable company object
- `onFieldChange`: Function to handle field changes

**Structure:**
- Grid layout of field groups with labels and values
- Fields include:
  - Trading name
  - Sector/Subsector
  - Country
  - Founded year
  - Registration identifier
  - Website (as link in display mode)
  - Description

**Functionality:**
- Displays company information
- Switches between text display and editable fields
- Input validation and formatting
- Website displays as clickable link in view mode

### DeleteCompanyDialog

**File Path:** `src/components/features/companies/detail/DeleteCompanyDialog.tsx`

**Description:** Confirmation dialog for company deletion.

**Props:**
- `open`: Boolean controlling dialog visibility
- `setOpen`: Function to control dialog state
- `onDelete`: Function to execute deletion
- `t`: Translation function

**Structure:**
- Modal dialog with:
  - Warning title
  - Confirmation message
  - Cancel button
  - Delete button (with destructive styling)

**Functionality:**
- Confirmation before deletion
- Loading state during deletion process
- Cancel and confirm actions

### CompanyUsersTable

**File Path:** `src/components/features/companies/users/CompanyUsersTable.tsx`

**Description:** Table managing users with access to a company.

**Props:**
- None (loads data internally)

**Structure:**
- Section header with title and invite button
- Table with columns:
  - Name
  - Email
  - Role
  - Actions (edit, remove)
- Invite user dialog
- Edit user dialog

**Functionality:**
- Lists users with company access
- Invites new users via dialog
- Edits user roles
- Removes users with confirmation
- Loading states

---

## Valuation Components

### ValuationsTable

**File Path:** `src/components/features/valuations/ValuationsTable.tsx`

**Description:** Table listing valuations for a company.

**Props:**
- `t`: Translation function
- `searchTerm`: String for filtering valuations
- `onSearchChange`: Function for search input
- `filteredValuations`: Array of valuation objects
- `onRowClick`: Function for row click
- `onDuplicateValuation`: Function for duplication
- `onDeleteValuation`: Function for deletion
- `setShowNameDialog`: Function to show creation dialog

**Structure:**
- Header with title, search input, and new button
- Table with columns:
  - Name
  - Status badge
  - Creation date
  - Last update
  - Actions (duplicate, delete)

**Functionality:**
- Lists valuations with filtering
- Creates new valuations via dialog
- Row navigation to valuation details
- Duplication action
- Deletion with confirmation
- Real-time filtering

### ValuationNameDialog

**File Path:** `src/components/features/valuations/ValuationNameDialog.tsx`

**Description:** Dialog for naming a new valuation.

**Props:**
- `open`: Boolean controlling dialog visibility
- `setOpen`: Function to control dialog state
- `valuationName`: String for valuation name
- `onNameChange`: Function for name input changes
- `onNameSubmit`: Function to submit new valuation

**Structure:**
- Modal dialog with:
  - Title "New Valuation"
  - Input field for name
  - Cancel button
  - Create button

**Functionality:**
- Input validation
- Form submission
- Close on cancel or submit
- Focus management

### ValuationTabs

**File Path:** `src/components/features/valuations/ValuationTabs.tsx`

**Description:** Tab navigation for valuation sections.

**Props:**
- `companyId`: Company ID string
- `valuationId`: Valuation ID string
- `activeTab`: Current active tab
- `status`: Valuation status string

**Structure:**
- Horizontal tab list with items:
  - Information
  - Results
  - Reports
- Active tab indicator
- Content area for selected tab

**Functionality:**
- Tab navigation
- URL-based routing
- Active tab highlighting
- Tab status awareness (disabling unavailable tabs)

### ValuationInfoTabs

**File Path:** `src/components/features/valuations/information/ValuationInfoTabs.tsx`

**Description:** Tab navigation for valuation information subtabs.

**Props:**
- `props`: Object containing:
  - Form data and handlers for each section
  - Loading state
  - Run valuation function

**Structure:**
- Left sidebar with step navigation:
  - General (with progress indicator)
  - Scoring (with progress indicator)
  - Financial (with progress indicator)
- Main content area showing selected step

**Functionality:**
- Step navigation
- Progress tracking for each section
- Form submission handling
- Navigation between steps

---

## Portfolio Components

### PortfolioTable

**File Path:** `src/components/features/portfolios/PortfolioTable.tsx`

**Description:** Table or grid of portfolio cards.

**Props:**
- `portfolios`: Array of portfolio objects
- `onSelect`: Function for portfolio selection
- `t`: Translation function

**Structure:**
- Grid layout of portfolio cards
- Each card shows:
  - Portfolio name
  - Number of companies
  - Total valuation
  - Last update date
  - Quick action buttons

**Functionality:**
- Displays portfolio summary cards
- Clickable cards for navigation
- Loading state with skeletons
- Empty state message

### PortfolioStats

**File Path:** `src/components/features/portfolios/PortfolioStats.tsx`

**Description:** Statistics summary for a portfolio.

**Props:**
- `portfolio`: Portfolio object with data

**Structure:**
- Grid of stat cards, each showing:
  - Stat label
  - Value with formatting
  - Visual indicator (icon or mini-chart)
- Stats include:
  - Total valuation
  - Number of companies
  - Average valuation
  - Growth indicators

**Functionality:**
- Displays formatted statistics
- Currency formatting
- Visual representation of metrics

### PortfolioCompanies

**File Path:** `src/components/features/portfolios/PortfolioCompanies.tsx`

**Description:** List of companies in a portfolio.

**Props:**
- `portfolio`: Portfolio object with companies array
- `onRemoveCompany`: Function to remove company

**Structure:**
- Card with header and scrollable content
- List of companies showing:
  - Company name
  - Sector
  - Valuation amount
  - Remove button

**Functionality:**
- Lists companies in portfolio
- Handles removing companies with confirmation
- Scrollable list for many items
- Loading states

### SectorDistribution

**File Path:** `src/components/features/portfolios/SectorDistribution.tsx`

**Description:** Visualization of sector distribution in a portfolio.

**Props:**
- `sectorDistribution`: Array of sector data objects
- `portfolioId`: Portfolio ID string
- `onViewAnalytics`: Function to navigate to analytics

**Structure:**
- Card with:
  - Header with title
  - Pie chart visualization
  - Legend with sector colors
  - View analytics button

**Functionality:**
- Renders interactive pie chart
- Shows percentage breakdown
- Color-coding of sectors
- Navigation to detailed analytics

---

## UI Components

These components are part of the shadcn/ui library, which provides consistent, accessible UI elements throughout the application. They follow a common design system and are used as building blocks for more complex components.

### Button

**File Path:** `src/components/ui/button.tsx`

**Description:** Multi-purpose button component with various styles.

**Props:**
- `variant`: Visual style ("default", "destructive", "outline", "secondary", "ghost", "link")
- `size`: Size variant ("default", "sm", "lg", "icon")
- `asChild`: Boolean to render as a child component
- Standard HTML button attributes

**Styling:**
- Consistent padding and dimensions
- Focus and hover states
- Disabled state
- Icon support

### Card

**File Path:** `src/components/ui/card.tsx`

**Description:** Container component for grouped content.

**Subcomponents:**
- `Card`: Main wrapper
- `CardHeader`: Top section for titles
- `CardTitle`: Heading element
- `CardDescription`: Explanatory text
- `CardContent`: Main content area
- `CardFooter`: Bottom section for actions

**Styling:**
- Rounded corners
- Border and shadow
- Consistent padding
- Background and text colors

### Input

**File Path:** `src/components/ui/input.tsx`

**Description:** Text input field component.

**Props:**
- Standard HTML input attributes
- Type-specific attributes

**Styling:**
- Consistent height and padding
- Focus states
- Error states
- Disabled styling

### Label

**File Path:** `src/components/ui/label.tsx`

**Description:** Form field label component.

**Props:**
- Standard HTML label attributes

**Styling:**
- Font size and weight
- Spacing
- Disabled state

### Select

**Props:**
- `value`: Current selected value
- `onValueChange`: Change handler function
- `disabled`: Boolean to disable the select
- Child components define options

**Subcomponents:**
- `SelectTrigger`: Clickable button that opens the dropdown
- `SelectValue`: Display for selected value
- `SelectContent`: Dropdown container
- `SelectItem`: Individual option

**Styling:**
- Dropdown with consistent styling
- Focus and hover states
- Chevron indicator
- Option highlighting

### Checkbox

**Props:**
- `checked`: Boolean for checked state
- `onCheckedChange`: Change handler function
- `disabled`: Boolean to disable the checkbox
- Standard HTML input attributes

**Styling:**
- Custom checkbox appearance
- Check mark animation
- Focus states
- Disabled styling

### Dialog/Modal

**Subcomponents:**
- `Dialog`: Main wrapper
- `DialogTrigger`: Element that opens the dialog
- `DialogContent`: Container for dialog content
- `DialogHeader`: Top section for titles
- `DialogTitle`: Heading element
- `DialogDescription`: Explanatory text
- `DialogFooter`: Bottom section for actions

**Functionality:**
- Focus trap within dialog
- Close on escape key
- Close on outside click
- Accessible via keyboard

### Toast

**Description:** Notification toast component.

**Usage:**
- `toast()` function to show notifications
- Options for success, error, info types
- Duration control
- Action buttons

**Styling:**
- Animated entrance and exit
- Status colors
- Dismiss button
