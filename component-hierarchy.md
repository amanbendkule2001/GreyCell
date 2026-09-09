# Graycell Website --- Component Hierarchy

## 1. Rule

Before creating a component, search this hierarchy.

If an existing component can support the requirement through
props/variants, extend it instead of creating a duplicate.

## 2. Global hierarchy

``` text
App
├── SiteShell
│   ├── Header
│   │   ├── BrandMark
│   │   ├── PrimaryNavigation
│   │   ├── MegaMenu
│   │   ├── SearchTrigger
│   │   └── EngineerCTA
│   │
│   ├── Main
│   │
│   └── Footer
│       ├── FooterNavigation
│       ├── GroupCompanies
│       ├── ContactSummary
│       └── LegalLinks
│
└── FloatingActions
    ├── WhatsAppButton
    └── QuickEnquiryButton
```

## 3. Primitive UI

``` text
Button
IconButton
Link
Badge
Tag
Divider
Container
Section
Grid
Stack
Heading
Eyebrow
Text
TechnicalValue
TechnicalLabel
StatusIndicator
```

## 4. Layout

``` text
PageLayout
Section
SectionHeader
SplitLayout
TwoColumnLayout
TechnicalGrid
MasonryGrid
StickyPanel
StickyTabs
```

## 5. Hero

``` text
EngineeringHero
HeroMedia
HeroTechnicalOverlay
HeroTechnicalStats
HeroCTAGroup
GridOverlay
```

Variants: - `product` - `corporate` - `solution` - `technology`

## 6. Product components

``` text
ProductExplorer
ProductFilterBar
ProductFilterDrawer
ProductSearch
ProductGrid
ProductCard
ProductCardTechnicalData
ProductDetail
ProductHero
ProductTechnicalSummary
ProductSpecificationTable
ProductSpecificationGroup
ProductFeatureList
ProductApplicationList
ProductTechnologyList
ProductDocumentList
ProductRelatedProducts
ProductEnquiryCTA
ProductCompare
```

Do not create: - OilTransformerCard - DryTransformerCard -
EsterTransformerCard

unless they require genuinely unique behaviour.

Use:

``` tsx
<ProductCard product={product} />
```

## 7. Requirement builder

``` text
RequirementBuilder
RequirementProgress
RequirementStep
RequirementOptionGrid
RequirementSlider
RequirementSummary
RequirementResult
RequirementDisclaimer
RequirementSubmitCTA
```

Steps: 1. Requirement type 2. Application 3. Capacity 4. Voltage 5.
Installation 6. Special requirements 7. Contact 8. Review

## 8. Engineering components

``` text
EngineeringJourney
EngineeringStage
EngineeringTimeline
ProcessDiagram
ManufacturingStory
ManufacturingGallery
TestingOverview
QualityFlow
EngineeringMetric
```

## 9. Technology

``` text
TechnologyGrid
TechnologyCard
TechnologyDetail
TechnologyDiagram
TechnologyBenefitList
TechnologyRelatedProducts
```

## 10. Compact substation

``` text
CompactSubstationExperience
SubstationDiagram
SubstationZone
SubstationAnnotation
SubstationFeaturePanel
SubstationGallery
SubstationTechnicalData
```

Zones: - MV - Transformer - LV - Protection - Monitoring - Enclosure

## 11. Solutions

``` text
SolutionExplorer
SolutionCard
SolutionDetail
ApplicationSelector
ApplicationCard
SolutionProductList
```

## 12. Projects

``` text
ProjectExplorer
ProjectCard
ProjectDetail
ProjectMetadata
ProjectGallery
ProjectSolutionSummary
ProjectRelatedProducts
```

If the item is only an image/application showcase, use:

``` text
ApplicationShowcase
```

not:

``` text
CaseStudy
```

unless the project facts are verified.

## 13. Resources

``` text
ResourceCentre
ResourceSearch
ResourceFilters
ResourceGrid
ResourceCard
DocumentCard
DocumentDownload
ResourceCategory
```

## 14. Group/company

``` text
GroupOverview
GroupArchitecture
CompanyCard
CompanyDetail
CapabilityMatrix
```

## 15. Forms

``` text
EnquiryForm
EnquiryField
FieldLabel
FieldError
RequirementTypeField
ApplicationField
CapacityField
VoltageField
FileUploadField
FormSummary
FormSuccess
FormError
```

## 16. Media

``` text
ResponsiveImage
ImageGallery
Lightbox
VideoPlayer
VideoPoster
TechnicalImage
AnnotatedImage
```

## 17. SEO

``` text
SEOHead
Breadcrumbs
JsonLd
```

## 18. State components

``` text
LoadingState
EmptyState
ErrorState
NotFoundState
Skeleton
```

## 19. Component creation rule

Create a new component only when: - it has reusable semantics - it has
reusable styling - it represents a distinct domain concept - or it
isolates genuinely complex behaviour

Do not create components merely to split a 30-line JSX block.

## 20. Variant rule

Prefer:

``` tsx
<Card variant="product" />
```

over:

``` text
ProductCard.tsx
DryTypeCard.tsx
OilCard.tsx
EsterCard.tsx
```

when the structure is fundamentally the same.

## 21. Page composition examples

### Homepage

``` text
PageLayout
├── EngineeringHero
├── TechnicalProofStrip
├── RequirementEntry
├── SolutionGrid
├── GroupArchitecture
├── ProductExplorer
├── EngineeringJourney
├── TechnologyGrid
├── SolutionExplorer
├── ManufacturingStory
├── ProjectExplorer
├── ResourceCentre
├── EnquiryCTA
└── Footer
```

### Product detail

``` text
PageLayout
├── Breadcrumbs
├── ProductHero
├── StickyTabs
├── ProductTechnicalSummary
├── ProductDetail
├── ProductSpecificationTable
├── ProductTechnologyList
├── ProductApplicationList
├── ProductDocumentList
├── ProductRelatedProducts
├── ProductEnquiryCTA
└── Footer
```
