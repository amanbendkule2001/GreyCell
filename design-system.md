# Graycell Website --- Design System

## 1. Design philosophy

The Graycell visual system is inspired by German industrial engineering:

-   precision
-   restraint
-   hierarchy
-   technical confidence
-   disciplined grids
-   functional motion
-   high-quality photography
-   data as visual language

The objective is not to imitate Siemens visually. The objective is to
create the same perception of engineering discipline.

## 2. Brand hierarchy

Primary: - GRAYCELL

Descriptor: - Power Engineering Group

Primary headline: - ENGINEERED POWER. BUILT TO PERFORM.

## 3. Color tokens

### Core

``` css
--color-graphite-950: #0B0F12;
--color-graphite-900: #11161A;
--color-graphite-800: #1A2025;
--color-steel-700: #4B555C;
--color-steel-500: #737D84;
--color-steel-300: #B9C0C5;
--color-steel-100: #E7EAEC;
--color-white: #FFFFFF;
--color-off-white: #F4F5F3;
```

### Technical accent

``` css
--color-electric-700: #075B99;
--color-electric-600: #0878C9;
--color-electric-500: #1595E5;
--color-electric-100: #DCEFFF;
```

### Sustainability accent

Use sparingly:

``` css
--color-green-600: #16834B;
--color-green-100: #E3F4EA;
```

Green is reserved primarily for: - natural ester/sustainability -
environmental indicators - success states where appropriate

Do not make green the dominant Graycell brand color.

## 4. Semantic colors

``` css
--color-success: #16834B;
--color-warning: #B7791F;
--color-danger: #B42318;
--color-info: #0878C9;
```

## 5. Typography

Recommended family: - Inter or equivalent modern grotesk - optional IBM
Plex Sans for technical emphasis

Technical numeric/data treatment: - IBM Plex Mono or equivalent
monospace

### Type scale

``` text
Display XL: 72/76
Display L: 56/60
H1: 48/54
H2: 40/46
H3: 32/38
H4: 24/30
H5: 20/26
Body L: 18/30
Body: 16/26
Body S: 14/22
Caption: 12/18
Technical XL: 48/1
Technical L: 32/1
Technical: 20/1.1
```

Responsive versions must reduce appropriately on mobile.

## 6. Font weights

``` text
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

Avoid excessive 800/900 weights.

## 7. Spacing scale

Base: 4px.

``` text
4
8
12
16
20
24
32
40
48
64
80
96
120
160
```

Use consistent section spacing.

## 8. Container

Desktop: - max-width: 1440px - side padding: 32--64px depending on
viewport

Tablet: - 24--40px

Mobile: - 16--20px

## 9. Grid

Primary: - 12-column desktop grid - 8-column tablet - 4-column mobile

Use strict alignment.

Avoid arbitrary positioning except for controlled hero/art direction.

## 10. Radius

Industrial aesthetic:

``` text
radius-sm: 4px
radius-md: 6px
radius-lg: 8px
radius-xl: 12px
```

Avoid 24--40px rounded cards as the default.

## 11. Borders

``` text
1px solid steel-100
1px solid graphite-800
```

Use borders to create technical structure.

## 12. Shadows

Keep shadows subtle.

Preferred: - low-opacity, large blur - mostly used for floating
navigation/modals

Avoid heavy card shadows.

## 13. Buttons

### Primary

Graphite background / white text.

### Technical CTA

Electric blue background / white text.

### Secondary

Transparent with 1px border.

### Text action

No background, arrow indicator.

Button shape: - 4--6px radius - 44px minimum height - 48--56px for major
CTAs

## 14. Technical labels

Use: - uppercase - 11--13px - semibold - increased letter spacing

Example:

``` text
RATED CAPACITY
```

Then large numeric value:

``` text
2500
kVA
```

## 15. Cards

Cards should feel like technical modules.

Structure:

``` text
Label
Title
Technical data
Description
Action
```

Don't make every card visually identical. Use: - product cards -
technical cards - project cards - resource cards - process cards

as distinct variants of the same underlying card system.

## 16. Photography

Priority: 1. real Graycell products 2. real Graycell factory 3. real
Graycell engineers/processes 4. real installations 5. approved
partner/product imagery 6. conceptual AI-generated imagery only when
clearly non-documentary

Avoid generic stock photos of smiling engineers.

## 17. Hero style

Preferred: - graphite/dark industrial background - product-focused
imagery - controlled electric blue accents - technical annotations -
restrained motion

Avoid: - blue sky/green grass as the main hero - generic wind turbines
as the primary identity - decorative lightning bolts

## 18. Motion tokens

``` text
Fast: 150ms
Standard: 250ms
Emphasis: 450ms
Engineering: 700–1200ms
```

Use easing: - ease-out for UI - controlled custom curves for engineering
sequences

## 19. Motion principles

Good: - electrical flow - assembly - technical diagram reveal - number
transitions - progressive disclosure - scroll-linked engineering process

Bad: - bouncing - excessive parallax - spinning everything - decorative
particles everywhere - constant background motion

## 20. Responsive principles

Desktop: - large technical compositions - multi-column specification
layouts - interactive diagrams

Mobile: - content first - sticky enquiry action - horizontally
scrollable technical tables - simplified animation - touch-friendly
controls

## 21. Accessibility

Minimum: - WCAG-conscious contrast - focus-visible states - semantic
headings - reduced-motion support - form labels - alt text - keyboard
accessible menus

## 22. Visual anti-patterns

Do not use: - glassmorphism as primary style - giant gradient text -
excessive rounded rectangles - fake 3D blobs - generic AI SaaS visuals -
random icon collections - decorative line noise - visual clutter
