'use client';

import React from 'react';

interface FashionDraftingOverlayProps {
  className?: string;
}

export default function FashionDraftingOverlay({ className = '' }: FashionDraftingOverlayProps) {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle grid pattern for atelier cutting table feel */}
        <pattern id="cuttingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#171717"
            strokeWidth="0.5"
            strokeOpacity="0.04"
          />
          <circle cx="40" cy="40" r="1" fill="#A85E43" fillOpacity="0.15" />
        </pattern>
      </defs>

      {/* 1. Atelier Cutting Grid Base */}
      <rect width="100%" height="100%" fill="url(#cuttingGrid)" opacity="0.8" />

      {/* 2. Haute Couture Mannequin / Dress Form Silhouette */}
      <g opacity="0.32" stroke="#171717" strokeWidth="0.85">
        {/* Neckline & Collar Stand */}
        <ellipse cx="300" cy="95" rx="36" ry="12" strokeDasharray="3 3" />
        <path d="M 264 95 C 264 120, 275 140, 280 148" />
        <path d="M 336 95 C 336 120, 325 140, 320 148" />

        {/* Shoulders */}
        <path d="M 280 148 C 240 152, 190 168, 175 185" />
        <path d="M 320 148 C 360 152, 410 168, 425 185" />

        {/* Armhole Curves (French Curve Profile) */}
        <path
          d="M 175 185 C 165 210, 190 260, 215 275"
          strokeDasharray="4 2"
        />
        <path
          d="M 425 185 C 435 210, 410 260, 385 275"
          strokeDasharray="4 2"
        />

        {/* Bust Line & Princess Seam Lines */}
        <path d="M 215 275 C 250 285, 350 285, 385 275" stroke="#A85E43" strokeOpacity="0.4" />
        <path d="M 260 170 C 260 220, 252 290, 255 370" />
        <path d="M 340 170 C 340 220, 348 290, 345 370" />

        {/* Center Front Placket Guide */}
        <line
          x1="300"
          y1="85"
          x2="300"
          y2="540"
          stroke="#A85E43"
          strokeWidth="0.75"
          strokeDasharray="6 3 2 3"
          strokeOpacity="0.5"
        />

        {/* Cinched Waist Tape Line */}
        <path
          d="M 225 370 C 255 365, 345 365, 375 370"
          strokeWidth="1.2"
          stroke="#171717"
        />

        {/* High Hip Contour Curve */}
        <path
          d="M 225 370 C 215 410, 205 470, 210 540"
          strokeDasharray="4 3"
        />
        <path
          d="M 375 370 C 385 410, 395 470, 390 540"
          strokeDasharray="4 3"
        />
      </g>

      {/* 3. Pattern Drafting Lines & Geometric French Curves */}
      <g stroke="#171717" strokeWidth="0.75" opacity="0.28">
        {/* French Curve Contour Arc */}
        <path
          d="M 90 220 C 130 180, 220 190, 250 250 C 275 300, 330 310, 380 260 C 440 200, 520 220, 550 310"
          strokeDasharray="5 3"
        />

        {/* Bias Drape Geometry */}
        <line x1="120" y1="480" x2="480" y2="120" strokeDasharray="3 3" stroke="#A85E43" strokeOpacity="0.3" />
        <line x1="80" y1="360" x2="520" y2="360" strokeDasharray="2 4" />

        {/* Dart Wedges & Apex Annotations */}
        <polygon
          points="255,270 248,340 262,340"
          fill="#A85E43"
          fillOpacity="0.05"
          stroke="#A85E43"
          strokeWidth="0.75"
        />
        <polygon
          points="345,270 338,340 352,340"
          fill="#A85E43"
          fillOpacity="0.05"
          stroke="#A85E43"
          strokeWidth="0.75"
        />

        {/* Grainline Vector Arrow */}
        <g transform="translate(130, 290)">
          <line x1="0" y1="0" x2="0" y2="100" stroke="#171717" strokeWidth="1" />
          <polyline points="-3,10 0,0 3,10" stroke="#171717" strokeWidth="1" />
          <polyline points="-3,90 0,100 3,90" stroke="#171717" strokeWidth="1" />
          <text
            x="8"
            y="55"
            fontFamily="monospace"
            fontSize="7"
            letterSpacing="0.25em"
            fill="#171717"
            fillOpacity="0.6"
            transform="rotate(90 8 55)"
          >
            GRAINLINE · WEFT 01
          </text>
        </g>
      </g>

      {/* 4. Technical Blueprint Labels & Precision Crosshairs */}
      <g fontFamily="monospace" fontSize="8" fill="#171717" opacity="0.45">
        {/* Upper Left Precision Coordinates */}
        <text x="32" y="50" letterSpacing="0.2em" fill="#A85E43" fontWeight="bold">
          + FIG. 01 / SPEC DRAFT
        </text>
        <text x="32" y="64" letterSpacing="0.15em" fontSize="7" opacity="0.7">
          SCALE: 1:1 ATELIER PROPORTIONS
        </text>
        <text x="32" y="76" letterSpacing="0.15em" fontSize="7" opacity="0.7">
          CHEST ARCH: R = 142mm
        </text>

        {/* Upper Right Seam Notation */}
        <text x="440" y="70" letterSpacing="0.2em" textAnchor="end" fontSize="7">
          1.5cm SEAM ALLOWANCE
        </text>
        <text x="440" y="82" letterSpacing="0.15em" textAnchor="end" fontSize="7" fill="#A85E43">
          [NOTCH REF: A · 04]
        </text>

        {/* Lower Left Material & Fabric Swatch Card */}
        <g transform="translate(30, 610)">
          <rect
            x="0"
            y="0"
            width="140"
            height="62"
            fill="#FAF7F2"
            fillOpacity="0.75"
            stroke="#171717"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
          {/* Swatch texture strip */}
          <rect x="6" y="6" width="28" height="50" fill="#A85E43" fillOpacity="0.18" />
          <line x1="10" y1="6" x2="30" y2="56" stroke="#A85E43" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="18" y1="6" x2="38" y2="56" stroke="#A85E43" strokeWidth="0.5" strokeOpacity="0.4" />

          <text x="42" y="18" fontSize="7" fontWeight="bold" letterSpacing="0.18em" fill="#171717">
            TEXTILE SPEC
          </text>
          <text x="42" y="30" fontSize="6.5" letterSpacing="0.1em" fill="#171717" opacity="0.7">
            WEAVE: SILK & BEAD
          </text>
          <text x="42" y="42" fontSize="6.5" letterSpacing="0.1em" fill="#171717" opacity="0.7">
            TONE: CRIMSON / ATELIER
          </text>
          <text x="42" y="53" fontSize="6" letterSpacing="0.12em" fill="#A85E43" fontWeight="bold">
            PARUL ATELIER ARCHIVE
          </text>
        </g>

        {/* Precision Crosshairs in Muted Copper */}
        <g stroke="#A85E43" strokeWidth="0.75" opacity="0.6">
          <line x1="295" y1="95" x2="305" y2="95" />
          <line x1="300" y1="90" x2="300" y2="100" />

          <line x1="295" y1="368" x2="305" y2="368" />
          <line x1="300" y1="363" x2="300" y2="373" />

          <line x1="535" y1="520" x2="545" y2="520" />
          <line x1="540" y1="515" x2="540" y2="525" />
        </g>
      </g>
    </svg>
  );
}
