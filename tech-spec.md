# Graycell Website --- Technical & Architecture Specification

## 1. Architecture

Recommended stack:

-   Next.js App Router
-   TypeScript
-   Tailwind CSS
-   React
-   Framer Motion
-   GSAP selectively
-   Zod for runtime validation at external boundaries
-   Native `fetch` or a small typed API client
-   Local typed mock repository for V1

Architecture:

``` text
UI
 ↓
Page / Feature Components
 ↓
Domain Services
 ↓
Repository Interface
 ↓
Mock Repository (V1)
 ↓
Future API/CMS Repository
```

The UI must not know whether data comes from local files, an API or a
CMS.

## 2. Suggested folder structure

``` text
src/
├── app/
│   ├── page.tsx
│   ├── products/
│   ├── solutions/
│   ├── engineering/
│   ├── technology/
│   ├── projects/
│   ├── resources/
│   ├── group/
│   └── contact/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── products/
│   ├── solutions/
│   ├── engineering/
│   ├── technology/
│   ├── projects/
│   ├── resources/
│   ├── forms/
│   ├── seo/
│   └── ui/
│
├── data/
│   └── mock-data.ts
│
├── domain/
│   ├── product/
│   ├── project/
│   ├── resource/
│   ├── solution/
│   └── company/
│
├── services/
│   ├── products.service.ts
│   ├── projects.service.ts
│   ├── resources.service.ts
│   └── enquiries.service.ts
│
├── repositories/
│   ├── products.repository.ts
│   ├── projects.repository.ts
│   └── resources.repository.ts
│
├── config/
│   └── site-config.ts
│
├── lib/
│   ├── validation/
│   ├── seo/
│   └── utils/
│
└── types/
```

## 3. Domain models

### Product

``` ts
interface Product {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  category: ProductCategory;
  status: ContentStatus;
  ownership: ProductOwnership;

  summary: string;

  capacity?: {
    min?: number;
    max?: number;
    unit: "kVA" | "MVA";
    label?: string;
  };

  voltage?: {
    values?: string[];
    min?: string;
    max?: string;
    label?: string;
  };

  type?: string;
  applications: string[];
  technologies: string[];
  features: string[];

  specifications: TechnicalSpecification[];

  documents: DocumentReference[];
  media: MediaReference[];

  relatedProductIds: string[];
  enquiryEnabled: boolean;

  seo: SEOData;
}
```

### Technical specification

``` ts
interface TechnicalSpecification {
  key: string;
  label: string;
  value: string;
  unit?: string;
  group?: string;
  sourceStatus: "verified" | "requires_confirmation";
}
```

### Product ownership

``` ts
type ProductOwnership =
  | "graycell_manufactured"
  | "graycell_solution"
  | "partner_offering"
  | "associated_offering"
  | "requires_confirmation";
```

This prevents accidental claims about manufacturing ownership.

### Project

``` ts
interface Project {
  id: string;
  slug: string;
  title: string;
  status: ContentStatus;

  application?: string;
  industry?: string;
  location?: string;
  solution?: string;
  equipment?: string[];
  capacity?: string;
  voltage?: string;

  challenge?: string;
  solutionDescription?: string;
  result?: string;

  media: MediaReference[];
  relatedProductIds: string[];

  isCaseStudy: boolean;
  seo: SEOData;
}
```

If project details are unavailable, use an application showcase rather
than fabricating a case study.

### Solution

``` ts
interface Solution {
  id: string;
  slug: string;
  name: string;
  summary: string;
  applications: string[];
  productIds: string[];
  technologyIds: string[];
  media: MediaReference[];
  status: ContentStatus;
  seo: SEOData;
}
```

### Technology

``` ts
interface Technology {
  id: string;
  slug: string;
  name: string;
  summary: string;
  benefits: string[];
  productIds: string[];
  status: ContentStatus;
  media: MediaReference[];
  seo: SEOData;
}
```

### Resource

``` ts
interface Resource {
  id: string;
  slug: string;
  title: string;
  type:
    | "catalogue"
    | "datasheet"
    | "certificate"
    | "technical_document"
    | "application_note"
    | "article"
    | "faq";
  productIds: string[];
  file?: DocumentReference;
  status: ContentStatus;
  seo: SEOData;
}
```

### Company

``` ts
interface GroupCompany {
  id: string;
  name: string;
  legalName?: string;
  summary: string;
  capabilities: string[];
  status: ContentStatus;
}
```

## 4. Contact configuration

``` ts
interface ContactConfig {
  salesEmail: string;
  whatsappNumber?: string;
  phoneNumbers?: string[];
  officeAddress?: string;
  factoryAddress?: string;
}
```

V1:

``` ts
salesEmail: "sales@graycellpower.com"
whatsappNumber: undefined
```

Do not invent the WhatsApp number.

## 5. Enquiry model

``` ts
interface EnquiryRequest {
  name: string;
  company: string;
  email: string;
  phone: string;

  requirementType:
    | "transformer"
    | "compact_substation"
    | "mv_system"
    | "other"
    | "not_sure";

  application?: string;
  capacity?: string;
  primaryVoltage?: string;
  secondaryVoltage?: string;
  quantity?: number;
  location?: string;
  installation?: "indoor" | "outdoor" | "unknown";

  specialRequirements?: string;
  message?: string;

  attachments?: UploadReference[];

  sourcePage: string;
}
```

## 6. API-ready interfaces

Future repository interfaces:

``` ts
interface ProductRepository {
  getAll(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getById(id: string): Promise<Product | null>;
  search(filters: ProductFilters): Promise<Product[]>;
}
```

``` ts
interface ProjectRepository {
  getAll(): Promise<Project[]>;
  getBySlug(slug: string): Promise<Project | null>;
}
```

``` ts
interface ResourceRepository {
  getAll(): Promise<Resource[]>;
  getById(id: string): Promise<Resource | null>;
}
```

``` ts
interface EnquiryService {
  submit(request: EnquiryRequest): Promise<{
    success: boolean;
    referenceId?: string;
    error?: string;
  }>;
}
```

## 7. Product filters

``` ts
interface ProductFilters {
  categories?: string[];
  applications?: string[];
  technologies?: string[];
  voltage?: string[];
  capacityMin?: number;
  capacityMax?: number;
  ownership?: ProductOwnership[];
  query?: string;
}
```

## 8. Document rules

Documents must include:

``` ts
interface DocumentReference {
  id: string;
  title: string;
  type: string;
  url: string;
  version?: string;
  publishedAt?: string;
  access: "public" | "restricted" | "internal";
}
```

Never expose internal/restricted documents through public routes.

## 9. Upload security

Recommended initial limits: - maximum file size: 10 MB - accepted: PDF,
DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG - reject executable files -
validate MIME type and extension - rename files server-side - store
outside executable web roots - scan files in production - do not expose
original local paths

These are implementation defaults and can be changed by the
backend/security owner.

## 10. Routing

Recommended routes:

``` text
/
/products
/products/[slug]
/solutions
/solutions/[slug]
/engineering
/technology
/technology/[slug]
/projects
/projects/[slug]
/resources
/resources/[slug]
/group
/contact
/build-your-requirement
```

## 11. Error states

Every dynamic collection/detail view must support: - loading - empty -
not found - unavailable - retry where appropriate

## 12. Future CMS migration

The frontend must not assume a specific CMS.

Migration target:

``` text
MockRepository
      ↓
APIRepository
      ↓
CMS/API
```

Product schema must remain stable where practical.

## 13. Analytics events

Define events now, even if analytics is added later:

``` text
product_view
product_filter_used
product_document_download
requirement_builder_started
requirement_builder_completed
enquiry_started
enquiry_submitted
whatsapp_clicked
email_clicked
project_view
resource_search
resource_download
```

Do not collect unnecessary personal data.

## 14. Security boundaries

Public: - published content - approved documents - public contact
details

Admin/future CMS: - drafts - internal notes - private documents -
enquiry management - user permissions

Never place admin secrets in the frontend bundle.
