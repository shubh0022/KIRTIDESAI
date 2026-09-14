'use client';

import React from 'react';

interface FashionDraftingOverlayProps {
  className?: string;
}

export default function FashionDraftingOverlay({ className = '' }: FashionDraftingOverlayProps) {
  return (
    <svg
      viewBox="0 0 700 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle atelier cutting-table grid: ultra faint, 0.025 opacity */}
        <pattern id="atelierCuttingGrid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="#171717"
            strokeWidth="0.5"
            strokeOpacity="0.03"
          />
          <circle cx="48" cy="48" r="0.75" fill="#A85E43" fillOpacity="0.1" />
        </pattern>
      </defs>

      {/* 1. Base Cutting Grid */}
      <rect width="100%" height="100%" fill="url(#atelierCuttingGrid)" />

      {/* 2. Dress Form / Atelier Mannequin - Positioned in the Left Negative Space */}
      <g stroke="#171717" strokeWidth="0.65" opacity="0.12">
        {/* Mannequin Stand & Neckline */}
        <ellipse cx="140" cy="170" rx="28" ry="9" strokeDasharray="3 3" />
        <path d="M 112 170 C 112 190, 120 205, 124 212" />
        <path d="M 168 170 C 168 190, 160 205, 156 212" />

        {/* Mannequin Shoulders */}
        <path d="M 124 212 C 95 215, 60 226, 48 240" />
        <path d="M 156 212 C 185 215, 220 226, 232 240" />

        {/* Armhole profile */}
        <path d="M 48 240 C 40 260, 58 300, 78 312" strokeDasharray="4 2" />
        <path d="M 232 240 C 240 260, 222 300, 202 312" strokeDasharray="4 2" />

        {/* Princess Seam Lines & Bust Curve */}
        <path d="M 78 312 C 105 320, 175 320, 202 312" stroke="#A85E43" strokeOpacity="0.3" />
        <path d="M 110 230 C 110 270, 104 325, 106 390" />
        <path d="M 170 230 C 170 270, 176 325, 174 390" />

        {/* Center Front Placket / Grainline Guide */}
        <line
          x1="140"
          y1="160"
          x2="140"
          y2="540"
          stroke="#A85E43"
          strokeWidth="0.6"
          strokeDasharray="6 3 2 3"
          strokeOpacity="0.4"
        />

        {/* Waist Tape Marking */}
        <path d="M 88 390 C 110 386, 170 386, 192 390" strokeWidth="0.8" stroke="#171717" />

        {/* Hip Contour Flares */}
        <path d="M 88 390 C 80 425, 72 475, 76 530" strokeDasharray="4 3" />
        <path d="M 192 390 C 200 425, 208 475, 204 530" strokeDasharray="4 3" />
      </g>

      {/* 3. Pattern Drafting French Curve Arcs - strictly in outer negative space */}
      <g stroke="#171717" strokeWidth="0.55" opacity="0.09">
        {/* French Curve profile sweeping from top left */}
        <path
          d="M 30 110 C 80 70, 160 80, 190 140 C 210 180, 260 190, 300 150"
          strokeDasharray="4 3"
        />

        {/* Bias drape 45 degree angle reference */}
        <line x1="20" y1="420" x2="260" y2="180" strokeDasharray="3 3" stroke="#A85E43" strokeOpacity="0.25" />
        <line x1="40" y1="390" x2="220" y2="390" strokeDasharray="2 4" />

        {/* Right margin subtle construction arcs */}
        <path
          d="M 640 280 C 600 320, 610 380, 660 420"
          strokeDasharray="4 2"
        />
        <line x1="580" y1="520" x2="670" y2="520" strokeDasharray="2 4" />
      </g>

      {/* 4. Intentional Fashion Design Technical Annotations */}
      <g fontFamily="var(--font-mono), monospace" fontSize="7" fill="#171717" opacity="0.22">
        {/* Top Left Atelier Spec Coordinates */}
        <text x="32" y="44" letterSpacing="0.22em" fill="#A85E43" fontWeight="600">
          FORM 01 · PATTERN DRAFT
        </text>
        <text x="32" y="56" letterSpacing="0.18em" fontSize="6.5">
          SCALE: 1:1 ATELIER PROPORTIONS
        </text>
        <text x="32" y="68" letterSpacing="0.18em" fontSize="6.5">
          CENTER FRONT ℄ / BIAS DRAPE 45°
        </text>

        {/* Dress Form Waistline Annotation */}
        <text x="144" y="394" letterSpacing="0.18em" fontSize="6" fill="#A85E43">
          WAISTLINE REF · 01
        </text>

        {/* Top Right Seam Allowance Reference */}
        <text x="668" y="44" letterSpacing="0.2em" textAnchor="end" fontSize="6.5">
          SEAM ALLOWANCE 1.5 CM
        </text>
        <text x="668" y="56" letterSpacing="0.18em" textAnchor="end" fontSize="6.5" fill="#A85E43">
          [NOTCH REF: ATELIER · 01]
        </text>

        {/* Bottom Right Atelier Technical Spec Stamp */}
        <text x="668" y="840" letterSpacing="0.2em" textAnchor="end" fontSize="6.5">
          TEXTILE: EMBROIDERED CORSETRY
        </text>
        <text x="668" y="852" letterSpacing="0.18em" textAnchor="end" fontSize="6.5" fill="#A85E43">
          PARUL INSTITUTE OF DESIGN
        </text>
      </g>

      {/* 5. Minimal Precision Crosshairs (Kept strictly in outer borders) */}
      <g stroke="#A85E43" strokeWidth="0.6" opacity="0.3">
        <line x1="28" y1="36" x2="36" y2="36" />
        <line x1="32" y1="32" x2="32" y2="40" />

        <line x1="664" y1="36" x2="672" y2="36" />
        <line x1="668" y1="32" x2="668" y2="40" />

        <line x1="664" y1="832" x2="672" y2="832" />
        <line x1="668" y1="828" x2="668" y2="836" />
      </g>
    </svg>
  );
}
