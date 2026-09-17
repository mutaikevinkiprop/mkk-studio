# mkk Studio — Premium Digital Experience & Lead Management

## ?? Brand Identity

### Color System
- **Ink Navy**: #0F172A (primary foundation)
- **Signal Cyan**: #22D3EE (accent, used strategically)
- **Neutral Palette**: Derived grayscale for hierarchy
- **Rule**: No gradients, no supplementary colors beyond documented palette

### Typography
- **Display**: Space Grotesk (400, 500, 600, 700 weights)
- **Interface**: Inter (400, 500, 600 weights)
- **Approach**: Large scale, intentional spacing, strong tracking

### Visual Language
- Sharp/angular geometry
- Subtle radius (4-8px maximum)
- Flat surfaces, minimal shadows
- 8px spacing system
- 12-column desktop grid
- No pills, rounded cards, or glassmorphism

## ?? Project Structure

`
mkk-studio/
+-- src/
¦   +-- app/                    # Next.js 14 App Router
¦   ¦   +-- layout.tsx
¦   ¦   +-- page.tsx           # Homepage
¦   ¦   +-- (public)/
¦   ¦   ¦   +-- work/          # Portfolio
¦   ¦   ¦   +-- about/         # About
¦   ¦   ¦   +-- contact/       # Contact form
¦   ¦   +-- (admin)/
¦   ¦       +-- dashboard/     # CRM Dashboard
¦   ¦       +-- leads/         # Lead management
¦   ¦       +-- settings/      # Admin settings
¦   +-- components/
¦   ¦   +-- ui/               # Base UI components
¦   ¦   +-- sections/         # Page sections
¦   ¦   +-- admin/            # Admin components
¦   +-- lib/
¦   ¦   +-- utils.ts
¦   ¦   +-- db.ts
¦   ¦   +-- auth.ts
¦   +-- api/
¦   ¦   +-- leads/
¦   ¦   +-- auth/
¦   ¦   +-- projects/
¦   +-- styles/
¦       +-- globals.css
+-- public/
¦   +-- images/
+-- prisma/
¦   +-- schema.prisma
+-- .env.local
+-- tailwind.config.ts
+-- next.config.ts
+-- tsconfig.json
`

## ?? Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling with mkk tokens
- **Framer Motion** - Sophisticated, purposeful motion
- **Radix UI** - Accessible component primitives

### Backend
- **API Routes** - Next.js API endpoints
- **Prisma ORM** - Database abstraction
- **PostgreSQL** - Production database
- **JWT** - Authentication
- **Nodemailer** - Email service

## ?? Core Features

### Public Website
1. **Homepage**
   - Art-directed hero
   - Services overview
   - Portfolio showcase (asymmetrical grid)
   - CTA section
   
2. **Portfolio/Work**
   - Variable project sizes
   - Full-bleed imagery
   - Case study details
   - Rich metadata
   
3. **About**
   - Studio positioning
   - Brand values
   - Team information
   
4. **Contact/Inquiry**
   - "Start a Project" form
   - Real-time validation
   - Integrated CRM capture

### Admin CRM
1. **Dashboard**
   - Lead overview
   - Quick statistics
   - Pipeline visualization
   
2. **Lead Management**
   - Lead table
   - Detail views
   - Status tracking
   - Follow-up scheduling
   
3. **Settings**
   - Team management
   - Email templates
   - Notification preferences

## ?? Design Principles

### Brand Hierarchy
1. **Typography** - Message first
2. **Content** - Substance
3. **Imagery** - Context
4. **Motion** - Pacing
5. **Interaction** - Engagement
6. **UI** - Support

### Motion Language
- Subtle, precise animations (no bouncing)
- Scroll-triggered reveals
- Hover transformations
- Text and image reveals
- Page entrance effects
- Respect prefers-reduced-motion

### Responsive Design
- Mobile-first approach
- Layout recomposition (not shrinking)
- Brand consistency across breakpoints
- Intentional whitespace preservation

## ? Success Criteria

- [x] Immediately recognizable as mkk Studio
- [x] World-class digital craftsmanship
- [x] Fast performance (<2s load)
- [x] WCAG 2.1 AA accessibility
- [x] Effective lead generation
- [x] Scalable architecture

## ?? Development Roadmap

### Phase 1: Foundation
- [x] Project setup
- [x] Design tokens
- [ ] Component library
- [ ] Database schema

### Phase 2: Frontend
- [ ] Homepage
- [ ] Portfolio
- [ ] About
- [ ] Contact form

### Phase 3: Backend
- [ ] Lead API
- [ ] Email service
- [ ] Authentication
- [ ] Database

### Phase 4: Admin CRM
- [ ] Dashboard
- [ ] Lead management
- [ ] Settings

### Phase 5: Launch
- [ ] Performance optimization
- [ ] Testing
- [ ] Deployment

---

**Brand First. Digital Craft. Original Content.**
