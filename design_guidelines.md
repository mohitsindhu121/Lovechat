# Romantic Couples Chat App - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from WhatsApp's chat patterns, Hinge's romantic aesthetic, and Instagram's profile interactions. This experience-focused app prioritizes emotional connection through soft, intimate visual language.

## Typography
- **Primary Font**: 'Playfair Display' (Google Fonts) - romantic serif for headers and special moments
- **Secondary Font**: 'Inter' (Google Fonts) - clean sans-serif for chat and UI elements
- **Hierarchy**:
  - Hero/Headers: text-4xl to text-6xl, font-semibold (Playfair)
  - Chat messages: text-base, font-normal (Inter)
  - Timestamps/metadata: text-xs to text-sm, font-light (Inter)
  - Buttons/CTAs: text-sm to text-base, font-medium (Inter)

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm
- Chat bubbles: p-4, gap-2 between messages
- Screen padding: px-4 md:px-8
- Section spacing: py-12 md:py-16
- Avatar sizes: w-12 h-12 for chat, w-24 h-24 for profiles

## Component Library

### Navigation
- **Top Bar**: Fixed header with couple's avatars on opposite sides, relationship name centered, subtle heart icon accent
- **Bottom Navigation** (mobile): 4 tabs - Chat, Memories, Profile, Settings with icon-only design

### Chat Interface
- **Message Bubbles**: Rounded-3xl, asymmetric design (partner's left, user's right), max-w-xs to max-w-sm
- **Input Area**: Fixed bottom bar with rounded-full text input, emoji picker, photo attachment, floating send button
- **Chat Header**: Partner's avatar, name, online status indicator, menu options
- **Message Features**: Timestamp on hover, read receipts (small heart icons), photo thumbnails in chat flow

### Profile Components
- **Profile Card**: Centered avatar (rounded-full, w-32 h-32), editable name field, relationship anniversary date, edit button
- **Couples Dashboard**: Split-screen design showing both profiles side-by-side with connection timeline
- **Memory Gallery**: Masonry grid (2-3 columns) for shared photos/moments with heart-count reactions

### Special Features
- **Love Notes**: Floating card design (shadow-lg) for sending special messages, appears with subtle scale animation
- **Connection Meter**: Horizontal progress bar with heart markers showing daily interaction
- **Hearts Animation**: Continuous floating hearts (CSS keyframes) along screen edges, intensifies during active chat

### Forms & Inputs
- **Text Fields**: rounded-full with subtle inner shadow, focus state with gentle glow
- **Image Upload**: Circular crop preview for avatars, drag-and-drop zone with heart-dashed border
- **Buttons**: 
  - Primary: rounded-full, px-8 py-3, backdrop-blur-md when over images
  - Secondary: rounded-full, border-2, px-6 py-2
  - Icon buttons: rounded-full, p-3

### Overlays
- **Modals**: Centered cards with rounded-3xl, max-w-md, backdrop blur effect
- **Image Viewer**: Full-screen overlay with swipe gestures, heart reaction button floating bottom-right

## Images

### Landing Page Hero
**Large Hero Image**: Full-width, min-h-screen romantic couple silhouette at sunset/golden hour (soft bokeh background). Center-aligned headline overlay with blurred-background CTA buttons. Image should evoke warmth, intimacy, connection.

### In-App Images
- **Empty State**: Illustrated couple holding hands/hearts for "Start your first conversation"
- **Profile Backgrounds**: Optional subtle gradient overlays, user-uploadable couple photos
- **Memory Section**: User-uploaded photos displayed in rounded-2xl cards
- **Onboarding**: Illustrated heart connections showing app features (3-4 simple illustrations)

### Placeholder Strategy
- Avatar placeholders: Gradient circles with initials or default heart icon
- Photo placeholders: Soft rose-pink gradients with camera icon

## Page Structures

### Landing Page (5 sections)
1. **Hero**: Full-screen image with headline "Your Private Space for Two," CTA buttons with backdrop-blur
2. **Features Grid**: 3-column (2 on tablet, 1 mobile) with icons - Private Chat, Memory Sharing, Love Notes
3. **App Preview**: Large phone mockup showcasing chat interface with hearts animation
4. **Testimonials**: 2-column couples' stories with photos and quotes
5. **Footer CTA**: Download section with app store buttons, newsletter signup, social links

### Chat Screen
Single column, full-height: Header (fixed), message area (scrollable with infinite load), input bar (fixed bottom)

### Profile Screen
Centered single column: Avatar + name at top, editable fields below, memory gallery grid, logout at bottom

**Visual Unifiers**: Soft drop shadows (shadow-sm to shadow-md), rounded corners throughout (rounded-2xl to rounded-3xl), subtle gradient accents, persistent heart motifs in icons and decorative elements.