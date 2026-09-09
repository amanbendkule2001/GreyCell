# Graycell Website --- AI SEO & Semantic Search Specification

## 1. Objective

Build pages that are easy for: - search engines - answer engines - AI
crawlers - future AI search systems - human engineers

to understand.

Do not optimize for a fictional ranking guarantee. The goal is clean,
explicit, machine-readable information.

## 2. Semantic HTML

Use:

``` html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Use headings in logical order:

``` text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

Never use heading tags purely for font size.

## 3. Product page semantics

A product page should make the following explicit:

-   product name
-   product category
-   manufacturer/brand context
-   capacity
-   voltage
-   application
-   technical specifications
-   documents
-   enquiry action

Use visible text, not information hidden only inside animations.

## 4. URL structure

Use readable, stable URLs:

``` text
/products
/products/oil-filled-distribution-transformers
/products/dry-type-transformers
/products/natural-ester-transformers
/products/compact-substations

/solutions/renewable-energy
/solutions/industrial

/technology/foil-winding
/technology/natural-ester
/technology/smart-monitoring

/projects/[slug]
/resources/[slug]
```

Avoid: - query-only product identity - random IDs in public URLs -
deeply nested unnecessary paths

## 5. Metadata

Every indexable page requires:

``` ts
interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}
```

Title pattern:

``` text
[Page/Product] | Graycell
```

Do not stuff keywords.

## 6. Breadcrumbs

Product:

``` text
Home
→ Products
→ Transformers
→ Oil-Filled Distribution Transformers
```

Project:

``` text
Home
→ Projects
→ Project Name
```

Breadcrumbs should be visible and represented in structured data.

## 7. JSON-LD

Use JSON-LD where appropriate.

### Organization

Use for the master brand where legally appropriate.

Suggested fields: - name - url - logo - email - sameAs only for verified
official profiles - contactPoint where appropriate

Do not invent social profiles.

### WebSite

Include: - name - url - potential search action only if the site
actually supports it

### Product

Use only where the product data is sufficiently complete.

Potential fields: - name - description - image - brand - manufacturer -
sku/model only if real - additionalProperty for technical attributes -
offers only when actual public offer/pricing data exists

Do not invent: - price - availability - SKU - GTIN - review score

### BreadcrumbList

Generate for hierarchical pages.

### Article

Use for engineering articles.

### FAQPage

Use only for actual visible FAQ content.

Do not generate fake FAQ markup purely for SEO.

## 8. Technical specification semantics

Visible specification tables should use semantic table markup:

``` html
<table>
<thead>
<tr>
<th>Parameter</th>
<th>Value</th>
</tr>
</thead>
<tbody>
...
</tbody>
</table>
```

Do not render specification tables as images.

## 9. Images

Every meaningful image: - has descriptive alt text - is optimized - has
meaningful file naming - does not repeat keyword stuffing

Example:

Good: `graycell-oil-filled-distribution-transformer.webp`

Bad: `best-transformer-manufacturer-transformer-pune-india.webp`

Decorative images:

``` html
alt=""
```

## 10. Internal linking

Build strong contextual links:

``` text
Product
→ Technology
→ Application
→ Project
→ Resource
→ Enquiry
```

Example: Oil-filled transformer → Natural ester technology →
Renewable-energy solution → related project → technical catalogue

Only create relationships that are factually valid.

## 11. AI-readable content

Avoid putting essential information only in: - canvas - WebGL - images -
hover-only UI - animations

Technical facts must exist as HTML text.

Interactive diagrams should have equivalent accessible textual
descriptions.

## 12. Search-friendly content structure

Each major page should answer:

1.  What is this?
2.  Who is it for?
3.  What are its main characteristics?
4.  What applications does it serve?
5.  What technologies are involved?
6.  What technical information is available?
7.  What documents are available?
8.  How can the visitor enquire?

## 13. AI/answer-engine content

Use concise factual sections: - overview - key specifications -
applications - features - technical notes - FAQs

Do not write filler paragraphs solely to increase word count.

## 14. Claim governance

Every technical claim should have one of:

``` text
verified
approved
requires_confirmation
```

`requires_confirmation` content must not be published in production.

Important examples: - capacity - voltage - standards - certifications -
MSEDCL approval - Siemens relationship - partner status - project
details - client logos - testing capabilities - smart monitoring
features

## 15. Entity clarity

The website should clearly distinguish:

``` text
Graycell — master brand
Graycell Power Solutions Pvt. Ltd. — group company reference
Graycell Energy LLP — group company reference
```

Do not imply that every group company manufactures every product.

## 16. AI-generated imagery

Do not use AI-generated images as factual evidence.

Never use them as: - fake factory photographs - fake project evidence -
fake employee photographs - fake certificates - fake products
represented as actual Graycell products

Use AI imagery only as conceptual visual material.

## 17. Sitemap

Generate XML sitemap for: - published products - published solutions -
published technologies - published projects - published resources -
group pages

Exclude: - drafts - internal documents - private pages - search
results - filter URLs - duplicate query URLs

## 18. Robots

Do not block normal public pages.

Block: - internal admin - private API routes - temporary preview
routes - query/filter explosion where appropriate

## 19. Canonicals

Every indexable canonical page should have a self-referencing canonical
unless there is a deliberate canonical relationship.

## 20. Structured-data validation

Before launch: - validate JSON-LD - verify URLs - verify names - verify
images - verify product claims - verify breadcrumbs - remove placeholder
data

## 21. AI search principle

Do not optimize for a specific future AI product.

Build: - semantic HTML - explicit facts - trustworthy content - strong
internal linking - structured data - accessible documentation -
authoritative first-party information

Those are durable foundations.
