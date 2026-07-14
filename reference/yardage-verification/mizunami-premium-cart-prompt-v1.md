# Mizunami Yardage Image Generation Prompt v1

## Purpose

Create premium Golfzon-inspired 3D top-down yardage assets for Golf5 Country Mizunami Course, while preserving the practical course information from the collected source layouts.

## Source

- Original files: `reference/yardage-originals/mizunami-cart/mizunami-hole-01-layout.jpg` through `mizunami-hole-18-layout.jpg`
- Final app assets: `public/images/yardage/mizunami-hole-01-premium-cart-v1.png` through `mizunami-hole-18-premium-cart-v1.png`

## Base Prompt

```text
Use case: style-transfer
Asset type: mobile Yardage Book course map asset
Primary request: Create a premium Golfzon-inspired 3D top-down golf hole map based on the reference image for Mizunami Hole {N}. Preserve the source layout as accurately as possible, and keep the cart path visible.
Input images: Image 1 is the source course layout reference for Mizunami Hole {N}.
Subject: one complete golf hole map only, including tee area, fairway, rough boundary, green, bunkers, trees, OB boundary feeling, water/penalty zone if present, terrain features if present, and the grey cart road/path.
Style/medium: polished 3D rendered golf course map, premium mobile yardage-book asset, realistic grass materials, soft shadows, slightly elevated orthographic top-down view, Golfzon-like course visualization.
Composition/framing: vertical portrait, tee at bottom and green at top, hole fills most of the frame, centered with dark green surroundings.
Lighting/mood: morning sunlight, refined premium golf dashboard mood, clear fairway/rough/green/bunker/cart-path separation.
Color palette: rich emerald fairway, darker rough, deep forest border, white sand bunkers, natural grey cart road, realistic water if present, subtle gold-green highlights.
Constraints: preserve the original routing direction, dogleg shape, green position and approximate shape, tee position, bunker positions, tree clusters, water/penalty zones if present, and the cart road path. Keep fairway and rough boundaries clearly visible. Keep the cart road as a thin natural grey path following the source image. No UI chrome, no labels, no distance numbers, no Japanese text, no Korean text, no English text, no arrows, no star marker, no icons, no watermark, no logo.
Avoid: changing the hole into a different layout, adding extra bunkers, removing the cart road, removing major trees, removing hazards, strong checkerboard fairway patterns, visible text, scorecard elements, people, golf carts.
```

## Hole-Specific Notes

- Hole 3 included a stronger note to preserve visible rock or terrain features.
- Holes 4, 12, and 15 used a short-hole prompt so they would remain par-3 style assets.
- Holes with water hazards used stronger water/penalty-zone preservation wording.

## Review Checklist

- Routing direction and dogleg shape remain close to the source.
- Tee and green positions remain visually consistent.
- Important bunkers and water hazards remain visible.
- Cart road is retained as a thin grey path.
- No source text, distance labels, arrows, icons, or star markers remain in the generated asset.
- Fairway, rough, green, bunker, water, and cart road are visually distinguishable on mobile.
