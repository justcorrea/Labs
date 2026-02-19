# Stargazing Community App — Mobile-First Product & Technical Design

## 1) Product Vision
Build a welcoming, science-informed mobile-first platform that helps people discover darker skies, plan better observing sessions, and share stargazing and astrophotography experiences with trusted local context.

### Primary outcomes
- Help users **find high-quality, safe observing locations** quickly.
- Improve observing success using **real-time sky + weather intelligence**.
- Encourage retention through **community, reputation, and challenges**.
- Protect sensitive locations with **privacy controls and coordinate fuzzing**.

## 2) Target Users & Jobs-to-be-Done

### User segments
1. **Beginner stargazers**: need simple, trustworthy places and “what can I see tonight?” guidance.
2. **Intermediate observers**: compare site quality, monitor transparency/seeing, track targets.
3. **Astrophotographers**: need technical logging, exposure suggestions, repeatability.
4. **Local astronomy groups**: want to share vetted sites, events, and safety notes.

### Core user jobs
- “Find a nearby dark site that is legal, safe, and worth the drive.”
- “Know if conditions are good before I leave home.”
- “Log and share what I observed/photographed with meaningful metadata.”
- “Discover community-verified reports from people near me.”

## 3) UX Principles (Mobile-First + Night Use)
- **Night-vision-first**: default dark mode with red-accent option; avoid bright whites.
- **One-hand usability**: bottom-tab navigation + large map controls.
- **Progressive disclosure**: show essentials first, advanced telescope/astrophoto details on demand.
- **Trust cues everywhere**: verification badges, report freshness, and confidence indicators.
- **Low-connectivity resilience**: cached map tiles, last-known conditions, draft post queue.

## 4) Information Architecture

### Bottom navigation
1. **Map** (default)
2. **Feed**
3. **Plan**
4. **Capture**
5. **Profile**

### Supporting surfaces
- Location Details Sheet
- Add/Edit Pin Flow
- Bortle Learning Module
- Condition Drilldown
- Notification Center
- Badge & Challenge Hub

## 5) Feature Design

## 5.1 Interactive Map

### Pin model
Each stargazing pin includes:
- Name/title
- Coordinates (exact/private fuzzed)
- **Bortle scale (1–9)**
- Description
- Safety notes
- Accessibility details (road type, walk distance, wheelchair access, bathrooms)
- Tags (parking, hours, permits, hazards, cell coverage)
- User photos
- Verification status (unverified/community verified/mod verified)
- Last-updated timestamps for conditions + reports

### Map interactions
- Filter chips: Bortle range, distance, accessibility, hazards, verification level.
- Heat overlay for “darkness quality” + pin density.
- Quick action from pin: Save, Navigate, Report Conditions, Upload Photo, Verify.

## 5.2 Bortle Scale Integration
- Every location card shows large Bortle badge (e.g., “Bortle 3”).
- Dedicated **Learn Bortle** module:
  - Visual skyline examples per class (1–9).
  - “What you can typically see” (Milky Way structure, limiting magnitude cues).
  - Light pollution impact simulator (same target under Bortle 2 vs 7).
- Contextual educational tips during planning (“At Bortle 6, try bright clusters/planets”).

## 5.3 Community Feeds

### Feed types
- **Local feed**: weighted by proximity + recency + trust score.
- **Popular feed**: weighted by engagement + quality + freshness.

### Social mechanics
- Posts: location reports, photos, observing logs, safety updates.
- Repost/recommendation flow with optional commentary.
- Threaded comments + upvotes for both locations and reports.
- “Was this useful?” on condition reports to improve ranking quality.

## 5.4 Sky Conditions Layer

### Real-time layers
- Cloud cover percentage.
- Transparency index.
- Seeing index (arcsecond-scale simplified to Good/Fair/Poor for non-experts).
- Wind, humidity, dew-point spread for equipment risk.

### Astronomical context
- Moon phase, illumination, rise/set.
- Astronomical twilight start/end.
- Darkness window score (usable dark hours adjusted for moon/cloud).

### Confidence model
- Show source timestamps + confidence badge when data is stale or sparse.

## 5.5 Session Planning Tools
- **Best Time Tonight** card: top 2–3 windows by target visibility + conditions.
- Alerts/notifications:
  - Meteor showers (peak windows)
  - ISS visible passes
  - Aurora probability spikes (geo-dependent)
  - “Conditions improved near saved site”
- Personal observing list:
  - Saved targets
  - Difficulty + recommended equipment
  - Completion/log history

## 5.6 Astrophotography Tools
- Photo upload supports equipment metadata:
  - Camera, lens/telescope, focal length, mount, filter
  - Exposure count, duration, ISO/gain, calibration frames
- Location-based photo logs with timeline and repeat-session comparison.
- Exposure suggestion helper:
  - Input: target type, Bortle, moon phase, focal length
  - Output: starter settings and integration-time guidance

## 5.7 Safety & Trust
- Multi-step community verification:
  1. Users submit/claim site
  2. Community confirmations + photo evidence
  3. Moderator/partner astronomy-club verification
- Safety tags: legal parking, closure times, permit requirement, wildlife/weather hazards.
- Reporting tools for outdated, unsafe, or private-sensitive content.
- Privacy controls:
  - Public pin
  - Friends-only pin
  - Private pin
  - Coordinate fuzzing radius (e.g., 0.5–5 km)

## 5.8 Gamification & Engagement
- Badges:
  - Dark-sky pilgrim (visit Bortle ≤3 sites)
  - Lunar logger (observe through moon phases)
  - Deep-sky hunter (capture/report object categories)
- Challenges:
  - Seasonal constellations
  - Meteor event participation
  - “7 nights of observing” streaks
- Reputation score combines contribution quality, verification accuracy, and helpful votes.

## 6) Mobile UI Blueprint

### Primary screens
1. **Map Home**
   - Fullscreen map, filter drawer, condition mini-bar, nearby top site carousel.
2. **Location Detail**
   - Bortle badge, verification level, safety/accessibility tags, photos, latest reports.
3. **Feed**
   - Tabs: Local | Popular | Following.
4. **Plan**
   - Tonight score, alert timeline, observing checklist.
5. **Capture**
   - Quick log template + metadata autofill from previous setups.

### Accessibility & comfort
- High-contrast text in dark mode.
- Optional “red-only” theme for dark adaptation.
- Large-touch controls for gloved/night use.

## 7) Technical Architecture (Scalable + Modular)

### Client
- Cross-platform mobile app (React Native or Flutter).
- Offline-first local cache (map tiles, saved sites, recent feeds).
- Background location and notification handling with strict permission gating.

### Backend (service-oriented)
1. **User & Auth Service**
2. **Location/Map Service**
3. **Conditions Aggregation Service** (weather + astronomy providers)
4. **Feed/Engagement Service**
5. **Media Service** (image upload, processing, CDN delivery)
6. **Notification Service**
7. **Reputation & Moderation Service**

### Data stores
- PostGIS-enabled relational DB for geospatial queries.
- Object storage (S3-compatible) for images.
- Cache/queue (Redis + message broker) for feed ranking and async jobs.
- Analytics warehouse for feature usage and recommendation tuning.

### API style
- Public mobile API gateway (REST/GraphQL hybrid).
- Event-driven internal workflows for uploads, verification updates, and alert triggers.

## 8) Data Model (Core Entities)
- `User`
- `LocationPin`
- `LocationVerification`
- `ConditionSnapshot`
- `AstronomySnapshot`
- `Post`
- `Comment`
- `Vote`
- `PhotoLog`
- `ObservingTarget`
- `Challenge`
- `BadgeAward`
- `NotificationSubscription`

## 9) Ranking & Recommendation Logic

### Location ranking score (example)
`score = (darkness_weight * bortle_quality) + (trust_weight * verification_score) + (freshness_weight * recent_reports) + (safety_weight * safety_completeness) - (distance_penalty)`

### Feed ranking signals
- Proximity relevance
- Engagement velocity (upvotes/comments/time)
- Contributor reputation
- Content freshness
- User preference graph (followed users/targets)

## 10) Privacy, Safety, and Policy
- Coordinate fuzzing default for new users when posting from private land.
- Anti-doxxing controls: block exact home-adjacent pins.
- Role-based moderation with escalation playbooks.
- Compliance baseline:
  - GDPR/CCPA style data controls
  - Export/delete account data
  - Consent-based location sharing

## 11) Future-Ready Modular Extensions
- AR constellation overlay module.
- Telescope control integrations (ASCOM/INDI-adjacent bridges where feasible).
- Club/event scheduling and group observing mode.
- Dark-sky conservation partnerships and certified-site badges.

## 12) Rollout Plan

### MVP (Phase 1)
- Map pins + Bortle + photos + basic verification
- Local/popular feed with comments/upvotes
- Core sky layers (cloud, moon phase, darkness window)
- Best Time Tonight recommendations

### Phase 2
- Advanced astrophoto metadata and exposure helper
- Rich safety tags, moderation workflows, challenge system
- ISS/meteor/aurora notifications

### Phase 3
- Personalized ranking/recommendations at scale
- AR overlays and partner integrations

## 13) Success Metrics
- **Activation**: % users who save or add first location within first 24 hours.
- **Planning utility**: % sessions with “Best Time Tonight” used before sunset.
- **Community health**: report helpfulness rate, comment quality, moderation turnaround.
- **Content quality**: verified pin ratio, condition freshness.
- **Retention**: weekly active observers, challenge completion, photo-log repeat rate.
