
# Data Models & API Interactions

This document details the data structures, state management, and API interactions used throughout the application.

## Table of Contents

1. [Authentication Models](#authentication-models)
2. [Company Models](#company-models)
3. [Valuation Models](#valuation-models)
4. [Portfolio Models](#portfolio-models)
5. [API Services](#api-services)
6. [State Management](#state-management)

---

## Authentication Models

### User

**Type Definition:** Implicit from API responses

**Properties:**
- `id`: String - Unique identifier
- `email`: String - User email address
- `name`: String - User's full name
- `role`: String - User role ("normal", "pro", "enterprise")
- `createdAt`: Date - Account creation timestamp
- `metadata`: Object - Additional user metadata

### Authentication Response

**File Path:** `src/types/auth.ts`

```typescript
export interface LoginResponse {
  token: string;
  userRole: 'normal' | 'pro' | 'enterprise';
  refreshToken?: string;
}

export interface JWTPayload {
  sub: string;
  role: string;
  exp: number;
}
```

**Usage:**
- Authentication state management
- Role-based access control
- Token storage and refresh

---

## Company Models

### Company

**Type Definition:** `src/types/company.ts`

**Core Properties:**
- `id`: String/Number - Unique identifier
- `name`: String - Company name
- `tradingName`: String - Trading/business name
- `description`: String - Company description
- `sector`: String - Industry sector
- `subsector`: String - Industry subsector
- `country`: String - Country of operation
- `foundedYear`: Number - Year founded
- `identifier`: String - Registration ID
- `website`: String - Company website URL
- `logoUrl`: String - Company logo image URL
- `status`: String - Company status
- `createdAt`: Date - Record creation date
- `updatedAt`: Date - Last update date

**Relationships:**
- Valuations: One-to-many relationship with Valuation objects
- Users: Many-to-many relationship with User objects

### Sector Data

**Type Definition:** `src/types/company.ts`

```typescript
export interface SectorData {
  name: string;
  subsectors: string[];
}
```

**Usage:**
- Populating sector/subsector dropdowns
- Categorizing companies

### SectorDistributionData

**Type Definition:** `src/types/company.ts`

```typescript
export interface SectorDistributionData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
```

**Usage:**
- Visualization of sector distribution in portfolios
- Pie chart data structure

---

## Valuation Models

### Valuation

**Core Properties:**
- `id`: String/Number - Unique identifier
- `name`: String - Valuation name
- `companyId`: String/Number - Associated company ID
- `status`: String - Status ("draft", "in_progress", "completed")
- `createdAt`: Date - Creation date
- `updatedAt`: Date - Last update date
- `createdBy`: String/Number - Creator user ID
- `result`: Object - Valuation results

### Qualitative Question

**Core Properties:**
- `id`: String - Question identifier
- `category`: String - Question category
- `question`: String - Question text
- `description`: String - Help text
- `type`: String - Question type ("text", "select", "radio", etc.)
- `options`: Array - Available options for select/radio questions
- `value`: String - Selected answer
- `required`: Boolean - Whether answer is required
- `impact`: Number - Impact weight on valuation

### Scoring Category

**Core Properties:**
- `id`: String - Category identifier
- `name`: String - Category name
- `description`: String - Category description
- `questions`: Array - Array of scoring questions
  - Question properties:
    - `id`: String - Question identifier
    - `question`: String - Question text
    - `description`: String - Help text
    - `options`: Array - Rating options (1-5 or custom scale)
    - `value`: String/Number - Selected rating
    - `weight`: Number - Question weight

### Financial Data

**Core Properties:**
- Structured financial information with:
  - Income statement rows
  - Balance sheet rows
  - Years of data (typically 3-5 years)
  - Calculated ratios and metrics

---

## Portfolio Models

### Portfolio

**File Path:** `src/types/portfolio.ts`

```typescript
export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  totalValuation: number;
  companies: PortfolioCompany[];
}

interface PortfolioCompany {
  id: string;
  name: string;
  sector: string;
  valuation: number;
  lastUpdated: string;
}
```

**Relationships:**
- One-to-many relationship with companies
- Many-to-one relationship with user (owner)

---

## API Services

### Authentication API

**File Path:** `src/services/auth/authApi.ts`

**Key Functions:**
- `loginApi(email, password)`: User login
- `registerApi(userData)`: User registration
- `forgotPasswordApi(email)`: Password recovery
- `resetPasswordApi(token, password)`: Password reset
- `logoutApi()`: User logout

### Company API

**File Path:** `src/services/companies/companyApi.ts`

**Key Functions:**
- `fetchCompanies()`: Get list of companies
- `fetchCompanyDetails(id)`: Get single company
- `createCompany(data)`: Create new company
- `updateCompany(id, data)`: Update company
- `deleteCompany(id)`: Delete company
- `fetchSectors()`: Get sectors list
- `fetchCountries()`: Get countries list

### Valuation API

**File Path:** `src/services/valuations/*`

**Files:**
- `valuationsAPI.ts`: Core valuation operations
- `qualitativeAPI.ts`: Qualitative question management
- `scoringAPI.ts`: Scoring management
- `financialAPI.ts`: Financial data management

**Key Functions:**
- `fetchValuations(companyId)`: Get valuations for company
- `createValuation(data)`: Create new valuation
- `updateValuation(id, data)`: Update valuation
- `deleteValuation(id)`: Delete valuation
- `runValuation(id)`: Calculate valuation results
- `fetchQualitativeQuestions()`: Get qualitative questions
- `updateQualitativeAnswers(data)`: Update answers
- `fetchScoringCategories()`: Get scoring categories
- `updateScoringAnswers(data)`: Update scoring
- `fetchFinancialData(id)`: Get financial data
- `updateFinancialData(id, data)`: Update financial data

### API Configuration

**File Path:** `src/services/axiosConfig.ts`

```typescript
import axios from "axios";
import { setupInterceptors } from "./auth/authInterceptors.ts";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
setupInterceptors(api);
```

**Features:**
- Centralized API configuration
- Base URL from environment variables
- Default headers
- Request/response interceptors
- Authentication token handling
- Error handling

---

## State Management

The application uses a combination of local component state and React Query for server state management. Context API is used for global UI state like sidebar collapsed state and authentication.

### React Query Usage

**Benefits:**
- Data caching and background updates
- Loading and error states
- Pagination and infinite scrolling
- Optimistic updates
- Refetching strategies
- Query invalidation

**Example Implementation:**
```typescript
const { data: sectors = [], isLoading: loadingSectors } = useQuery({
  queryKey: ["sectors"],
  queryFn: fetchSectors
});
```

### Authentication State Management

**Implementation:**
- Token storage in localStorage
- Token refresh mechanism
- User role-based rendering
- Protected routes

### Form State Management

**Implementation:**
- Local component state for form inputs
- Form validation with client-side checks
- Error handling and display
- Submission state tracking

### UI State Management

**Implementation:**
- Modal/dialog open/close state
- Sidebar collapsed state
- Tab selection state
- Search and filter state
