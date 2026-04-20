'use client';
import React, { useState, useEffect, useRef } from "react";

const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --deep:    #1a4a38;
    --deeper:  #0f2d22;
    --mid:     #1e5442;
    --gold:    #b89848;
    --gold2:   #d4b060;
    --gold3:   #f0d080;
    --cream:   #f5f0e8;
    --white:   #ffffff;
    --muted:   rgba(245,240,232,0.52);
    --border:  rgba(255,255,255,0.08);
    --border2: rgba(184,152,72,0.35);
    --shadow-gold: rgba(184,152,72,0.25);
    --shadow-deep: rgba(15,45,34,0.5);
    --text-dark: #1a2e26;
  }

  .nb-root {
    font-family: 'Outfit', sans-serif;
    position: relative;
    width: 100%;
    z-index: 1000;
  }

  /* ─── TOPBAR ─── */
  .nb-topbar {
    background: #ffffff;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 48px;
    position: relative;
    overflow: hidden;
    border-bottom: 1.5px solid rgba(184,152,72,0.25);
  }
  @media (max-width: 1024px) { .nb-topbar { padding: 0 32px; height: 72px; } }
  @media (max-width: 768px)  { .nb-topbar { padding: 0 20px; height: 66px; } }
  @media (max-width: 480px)  { .nb-topbar { padding: 0 14px; height: 58px; } }

  .nb-topbar::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1.5px;
    background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold2) 50%, var(--gold) 70%, transparent 100%);
    opacity: 0.55;
    animation: shimmerLine 3s ease-in-out infinite;
  }
  @keyframes shimmerLine {
    0%, 100% { opacity: 0.35; }
    50%       { opacity: 0.8;  }
  }

  /* ─── LOGO ─── */
  .nb-logo {
    display: flex; align-items: center;
    text-decoration: none; flex-shrink: 0; cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  .nb-logo:hover { transform: translateY(-2px) scale(1.03); }

  .nb-logo-emblem {
    width: 64px; height: 64px;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    animation: logoFloat 4s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes logoFloat {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  @media (max-width: 1024px) { .nb-logo-emblem { width: 56px; height: 56px; } }
  @media (max-width: 768px)  { .nb-logo-emblem { width: 50px; height: 50px; } }
  @media (max-width: 480px)  { .nb-logo-emblem { width: 44px; height: 44px; } }

  .nb-logo-img {
    width: 100%; height: 100%;
    object-fit: contain;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    display: block;
  }
  .nb-logo:hover .nb-logo-img { transform: scale(1.07); }

  .nb-spacer { flex: 1; }

  /* ─── INFO PILLS ─── */
  .nb-info-group {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 22px;
    margin: 0 5px;
    border: 1px solid rgba(184,152,72,0.2);
    border-radius: 2px;
    cursor: default;
    position: relative;
    transition: all 0.3s ease;
    background: #fafafa;
  }
  @media (max-width: 1024px) { .nb-info-group { padding: 8px 14px; gap: 9px; margin: 0 3px; } }
  @media (max-width: 900px)  { .nb-info-group { display: none; } }

  .nb-info-group:hover { border-color: rgba(184,152,72,0.5); background: rgba(184,152,72,0.04); transform: translateY(-1px); }
  .nb-info-icon { color: var(--gold); display: flex; align-items: center; flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  .nb-info-group:hover .nb-info-icon { transform: scale(1.15) rotate(5deg); }
  .nb-info-main { display: block; font-size: 13.5px; font-weight: 700; color: var(--deeper); letter-spacing: 0.3px; white-space: nowrap; font-family: 'Cinzel', serif; }
  .nb-info-sub  { display: block; font-size: 8.5px; font-weight: 400; color: #888; letter-spacing: 1.8px; text-transform: uppercase; white-space: nowrap; margin-top: 2px; }

  /* ─── TOP ACTIONS ─── */
  .nb-actions { display: flex; align-items: stretch; height: 80px; position: relative; z-index: 1; margin-left: 10px; }
  @media (max-width: 1024px) { .nb-actions { height: 72px; } }
  @media (max-width: 768px)  { .nb-actions { height: 66px; margin-left: auto; } }
  @media (max-width: 480px)  { .nb-actions { height: 58px; } }

  .nb-action {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; width: 62px; height: 100%;
    color: #888; cursor: pointer; text-decoration: none;
    border: none; background: none;
    border-left: 1px solid rgba(0,0,0,0.06);
    font-family: 'Outfit', sans-serif;
    position: relative; overflow: hidden;
    transition: all 0.25s ease;
  }
  @media (max-width: 1024px) { .nb-action { width: 54px; } }
  @media (max-width: 768px)  { .nb-action { width: 46px; border-left: none; } }
  @media (max-width: 480px)  { .nb-action { width: 38px; gap: 2px; } }

  .nb-action::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--deep), var(--gold));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  .nb-action:hover { color: var(--deep); background: rgba(26,74,56,0.04); }
  .nb-action:hover::after { transform: scaleX(1); }
  .nb-action svg { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); position: relative; z-index: 1; }
  .nb-action:hover svg { transform: translateY(-2px) scale(1.12); }
  .nb-action-lbl { font-size: 7px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; position: relative; z-index: 1; }
  @media (max-width: 768px) { .nb-action-lbl { font-size: 6px; } }
  @media (max-width: 480px) { .nb-action-lbl { display: none; } }

  .nb-action.is-menu.open { color: var(--deep); background: rgba(26,74,56,0.05); }
  .nb-action.is-menu.open::after { transform: scaleX(1); }

  .nb-ham { display: flex; flex-direction: column; gap: 5px; width: 20px; position: relative; z-index: 1; }
  .nb-ham span { display: block; height: 1.5px; background: currentColor; border-radius: 2px; transform-origin: center; transition: transform 0.35s ease, opacity 0.25s, width 0.25s; }
  .nb-ham span:nth-child(2) { width: 13px; }
  .nb-ham.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .nb-ham.open span:nth-child(2) { opacity: 0; width: 0; }
  .nb-ham.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* ─── MAINBAR ─── */
  .nb-mainbar {
    background: #ffffff;
    height: 56px;
    display: flex;
    align-items: stretch;
    padding: 0 48px;
    border-bottom: 2px solid var(--deep);
    position: relative;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
    /* FIX: No overflow-x scroll on mobile */
    overflow: hidden;
  }
  @media (max-width: 1024px) { .nb-mainbar { padding: 0 32px; height: 52px; } }
  @media (max-width: 768px)  {
    .nb-mainbar {
      padding: 0 16px;
      height: 48px;
      /* On mobile, hide mainbar — hamburger menu handles navigation */
      display: none;
    }
  }
  @media (max-width: 480px)  { .nb-mainbar { padding: 0 12px; height: 44px; } }

  /* scrolled */
  .nb-root.scrolled .nb-topbar  { box-shadow: 0 2px 20px rgba(0,0,0,0.08); transition: all 0.35s ease; }
  .nb-root.scrolled .nb-mainbar { box-shadow: 0 6px 30px rgba(0,0,0,0.1);  transition: all 0.35s ease; }

  /* ─── NAV LINKS ─── */
  .nb-nav {
    display: flex;
    align-items: stretch;
    list-style: none;
    flex: 1;
    flex-wrap: nowrap;
    /* FIX: prevent nav from overflowing */
    min-width: 0;
    overflow: hidden;
  }
  .nb-nav-item { display: flex; align-items: center; position: relative; }

  .nb-nav-link {
    display: flex; align-items: center; gap: 6px;
    padding: 0 16px; height: 100%;
    color: #3a3a3a;
    text-decoration: none;
    font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; position: relative;
    transition: color 0.25s;
    white-space: nowrap; background: none; border: none;
    font-family: 'Outfit', sans-serif;
  }
  @media (max-width: 1200px) { .nb-nav-link { padding: 0 12px; font-size: 9.5px; letter-spacing: 1.8px; } }
  @media (max-width: 1024px) { .nb-nav-link { padding: 0 10px; font-size: 9px; letter-spacing: 1.5px; } }

  .nb-nav-link::after {
    content: '';
    position: absolute; bottom: 0; left: 16px; right: 16px; height: 2.5px;
    background: linear-gradient(90deg, var(--deep), var(--gold));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    border-radius: 2px 2px 0 0;
  }
  @media (max-width: 1024px) { .nb-nav-link::after { left: 10px; right: 10px; } }

  .nb-nav-link:hover, .nb-nav-link.active { color: var(--deep); }
  .nb-nav-link:hover::after, .nb-nav-link.active::after { transform: scaleX(1); }

  .nb-star {
    color: var(--gold); font-size: 7px; opacity: 0.7;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
  }
  .nb-nav-link:hover .nb-star, .nb-nav-link.active .nb-star { transform: rotate(72deg) scale(1.4); opacity: 1; color: var(--gold2); }

  /* ─── STANDARD DROPDOWN ─── */
  .nb-dropdown {
    position: absolute; top: calc(100% + 2px); left: 0;
    min-width: 240px;
    background: #ffffff;
    border-top: 3px solid var(--deep);
    border: 1px solid rgba(0,0,0,0.07);
    border-top: 3px solid var(--deep);
    box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
    z-index: 9999;
    opacity: 0; visibility: hidden;
    transform: translateY(10px) rotateX(-8deg);
    transform-origin: top center;
    transition: opacity 0.28s cubic-bezier(0.4,0,0.2,1), transform 0.28s cubic-bezier(0.4,0,0.2,1), visibility 0.28s;
    pointer-events: none;
    perspective: 800px;
    max-height: 70vh; overflow-y: auto;
  }

  .nb-nav-item:hover .nb-dropdown {
    opacity: 1; visibility: visible;
    transform: translateY(0) rotateX(0deg);
    pointer-events: auto;
  }
  .nb-dropdown ul { list-style: none; padding: 8px 0; }
  .nb-dropdown li {
    opacity: 0; transform: translateX(-10px);
    transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1);
    position: relative;
  }
  .nb-nav-item:hover .nb-dropdown li { opacity: 1; transform: translateX(0); }
  .nb-nav-item:hover .nb-dropdown li:nth-child(1)  { transition-delay: 0.04s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(2)  { transition-delay: 0.07s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(3)  { transition-delay: 0.10s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(4)  { transition-delay: 0.13s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(5)  { transition-delay: 0.16s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(6)  { transition-delay: 0.19s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(7)  { transition-delay: 0.22s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(8)  { transition-delay: 0.25s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(9)  { transition-delay: 0.28s; }
  .nb-nav-item:hover .nb-dropdown li:nth-child(10) { transition-delay: 0.31s; }

  .nb-dropdown a {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 20px 11px 18px;
    color: #444;
    font-size: 10px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase;
    text-decoration: none; font-family: 'Outfit', sans-serif;
    border-left: 3px solid transparent;
    transition: color 0.2s, padding-left 0.25s ease, background 0.2s, border-left-color 0.2s;
  }

  .nb-dropdown a:hover { color: var(--deep); padding-left: 28px; border-left-color: var(--gold); background: rgba(26,74,56,0.03); }
  .nb-dropdown-icon { color: var(--gold); font-size: 8px; opacity: 0; transform: translateX(-6px); transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); flex-shrink: 0; }
  .nb-dropdown a:hover .nb-dropdown-icon { opacity: 1; transform: translateX(0); }
  .nb-sub-arrow { margin-left: auto; color: #ccc; font-size: 12px; transition: color 0.2s, transform 0.2s; }
  .nb-dropdown a:hover .nb-sub-arrow { color: var(--deep); transform: translateX(2px); }
  .nb-dropdown li.nb-divider { height: 1px; background: rgba(0,0,0,0.06); margin: 4px 18px; padding: 0; opacity: 1 !important; transform: none !important; }

  /* ─── NESTED SUB-MENU ─── */
  .nb-dropdown li.has-sub > .nb-sub-menu {
    position: absolute; top: -3px; left: 100%;
    min-width: 220px;
    background: #ffffff;
    border-top: 3px solid var(--gold);
    border: 1px solid rgba(0,0,0,0.07);
    border-top: 3px solid var(--gold);
    box-shadow: 12px 16px 48px rgba(0,0,0,0.12);
    z-index: 99999;
    opacity: 0; visibility: hidden;
    transform: translateX(10px) rotateY(-8deg);
    transform-origin: left center;
    transition: opacity 0.25s, transform 0.25s ease, visibility 0.25s;
    pointer-events: none;
    perspective: 600px;
  }
  .nb-dropdown li.has-sub:hover > .nb-sub-menu { opacity: 1; visibility: visible; transform: translateX(0) rotateY(0deg); pointer-events: auto; }
  .nb-sub-menu ul { list-style: none; padding: 8px 0; }
  .nb-sub-menu a {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px; color: #444;
    font-size: 10px; font-weight: 500; letter-spacing: 1.6px; text-transform: uppercase;
    text-decoration: none; font-family: 'Outfit', sans-serif;
    border-left: 3px solid transparent;
    transition: color 0.2s, padding-left 0.25s ease, background 0.2s, border-left-color 0.2s;
  }
  .nb-sub-menu a:hover { color: var(--deep); padding-left: 28px; background: rgba(26,74,56,0.04); border-left-color: var(--gold); }

  /* ─── MEGA DROPDOWN ─── */
  .nb-mega-dropdown {
    position: absolute; top: calc(100% + 2px); left: -180px;
    width: 780px;
    background: #ffffff;
    border-top: 3px solid var(--deep);
    border: 1px solid rgba(0,0,0,0.07);
    border-top: 3px solid var(--deep);
    box-shadow: 0 24px 80px rgba(0,0,0,0.13), 0 4px 20px rgba(0,0,0,0.06);
    z-index: 9999;
    opacity: 0; visibility: hidden;
    transform: translateY(10px) rotateX(-6deg);
    transform-origin: top center;
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    pointer-events: none;
    padding: 32px 36px 28px;
    perspective: 800px;
    max-height: 70vh; overflow-y: auto;
  }
  @media (max-width: 1440px) { .nb-mega-dropdown { left: -120px; width: 700px; } }
  @media (max-width: 1200px) { .nb-mega-dropdown { left: 0; width: 600px; padding: 24px 28px 20px; } }

  .nb-nav-item:hover .nb-mega-dropdown { opacity: 1; visibility: visible; transform: translateY(0) rotateX(0deg); pointer-events: auto; }
  .nb-mega-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 24px; }

  .nb-mega-col h4 {
    font-family: 'Cinzel', serif;
    font-size: 9px; font-weight: 600;
    color: var(--deep); letter-spacing: 2.5px; text-transform: uppercase;
    padding-bottom: 12px;
    border-bottom: 2px solid;
    border-image: linear-gradient(90deg, var(--deep), var(--gold)) 1;
    margin-bottom: 14px;
  }
  .nb-mega-col ul { list-style: none; padding: 0; }
  .nb-mega-col li { opacity: 0; transform: translateY(8px); transition: opacity 0.25s ease, transform 0.25s ease; }
  .nb-nav-item:hover .nb-mega-col li { opacity: 1; transform: translateY(0); }
  .nb-nav-item:hover .nb-mega-col li:nth-child(1) { transition-delay: 0.06s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(2) { transition-delay: 0.10s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(3) { transition-delay: 0.14s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(4) { transition-delay: 0.18s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(5) { transition-delay: 0.22s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(6) { transition-delay: 0.26s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(7) { transition-delay: 0.30s; }
  .nb-nav-item:hover .nb-mega-col li:nth-child(8) { transition-delay: 0.34s; }

  .nb-mega-col a {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 0; color: #555;
    font-size: 11px; font-weight: 400;
    text-decoration: none; font-family: 'Outfit', sans-serif;
    border-left: 2px solid transparent; padding-left: 0;
    transition: color 0.2s, padding-left 0.22s ease, border-left-color 0.2s;
  }
  .nb-mega-col a::before { content: '–'; color: var(--gold); opacity: 0; margin-right: -4px; transition: opacity 0.2s, margin 0.2s; font-size: 10px; }
  .nb-mega-col a:hover { color: var(--deep); padding-left: 10px; }
  .nb-mega-col a:hover::before { opacity: 1; margin-right: 0; }

  /* ─── CTA BUTTONS ─── */
  .nb-cta {
    display: flex; align-items: center; gap: 9px;
    margin: auto 0 auto 18px; padding: 0 20px; height: 36px;
    background: linear-gradient(135deg, var(--deep) 0%, var(--mid) 100%);
    color: #ffffff;
    font-size: 8.5px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all 0.32s ease;
    border-radius: 1px; font-family: 'Outfit', sans-serif;
    flex-shrink: 0; white-space: nowrap; border: none;
    box-shadow: 0 4px 16px rgba(26,74,56,0.25);
  }
  @media (max-width: 1024px) { .nb-cta { padding: 0 14px; font-size: 7.5px; letter-spacing: 2px; height: 32px; } }
  @media (max-width: 768px)  { .nb-cta { display: none; } }

  .nb-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
    transform: translateX(-101%);
    transition: transform 0.38s ease; z-index: 0;
  }
  .nb-cta:hover { color: var(--deeper); box-shadow: 0 8px 32px rgba(184,152,72,0.4); transform: translateY(-1px); }
  .nb-cta:hover::before { transform: translateX(0); }
  .nb-cta span, .nb-cta svg { position: relative; z-index: 1; }
  .nb-cta-arrow { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  .nb-cta:hover .nb-cta-arrow { transform: translateX(5px); }

  /* ─── SEARCH OVERLAY ─── */
  .nb-search-overlay {
    position: fixed; inset: 0;
    background: rgba(10,28,20,0.96);
    backdrop-filter: blur(16px);
    z-index: 99999;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity 0.4s ease, visibility 0.4s;
  }
  .nb-search-overlay.open { opacity: 1; visibility: visible; pointer-events: auto; }
  .nb-search-overlay::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 800px 500px at 50% 40%, rgba(184,152,72,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .nb-search-inner {
    width: 100%; max-width: 700px; padding: 0 32px;
    position: relative; z-index: 1;
    transform: translateY(20px) scale(0.97);
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s;
  }
  @media (max-width: 480px) { .nb-search-inner { padding: 0 20px; } }
  .nb-search-overlay.open .nb-search-inner { transform: translateY(0) scale(1); }
  .nb-search-label {
    font-family: 'Cinzel', serif;
    font-size: 10px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .nb-search-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, var(--gold), transparent); opacity: 0.3; }
  .nb-search-wrap {
    display: flex; align-items: center;
    border-bottom: 1.5px solid rgba(184,152,72,0.4);
    padding-bottom: 12px; gap: 16px;
    transition: border-color 0.3s;
  }
  .nb-search-wrap:focus-within { border-color: var(--gold2); }
  .nb-search-wrap svg { color: var(--gold); flex-shrink: 0; opacity: 0.7; }
  .nb-search-input {
    flex: 1; background: none; border: none; outline: none;
    font-family: 'Playfair Display', serif;
    font-size: 32px; font-weight: 400; font-style: italic;
    color: #ffffff; letter-spacing: 1px; caret-color: var(--gold2);
  }
  @media (max-width: 480px) { .nb-search-input { font-size: 22px; } }
  .nb-search-input::placeholder { color: rgba(255,255,255,0.2); }
  .nb-search-hint { margin-top: 20px; font-size: 9.5px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.25); }
  .nb-search-close {
    position: absolute; top: -80px; right: 0;
    width: 44px; height: 44px;
    border: 1px solid rgba(184,152,72,0.25);
    background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; border-radius: 1px; font-size: 20px;
    transition: all 0.25s;
  }
  .nb-search-close:hover { border-color: var(--gold); color: var(--gold); background: rgba(184,152,72,0.1); transform: rotate(90deg); }

  /* ─── HAMBURGER SLIDE MENU ─── */
  .nb-mega {
    position: absolute; top: 100%; left: 0; right: 0;
    background: #ffffff;
    overflow: hidden; max-height: 0; opacity: 0;
    transition: max-height 0.5s ease, opacity 0.35s ease;
    z-index: 999;
    border-top: 2px solid var(--deep);
    border-bottom: 2px solid rgba(184,152,72,0.2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    /* FIX: ensure no horizontal scroll in slide menu */
    width: 100%;
    overflow-x: hidden;
  }
  .nb-mega.open { max-height: 600px; opacity: 1; }

  .nb-mega-list { list-style: none; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
  .nb-mega-item { opacity: 0; transform: translateX(-20px); transition: opacity 0.32s ease, transform 0.32s ease; }
  .nb-mega.open .nb-mega-item { opacity: 1; transform: translateX(0); }
  .nb-mega.open .nb-mega-item:nth-child(1) { transition-delay: 0.05s; }
  .nb-mega.open .nb-mega-item:nth-child(2) { transition-delay: 0.09s; }
  .nb-mega.open .nb-mega-item:nth-child(3) { transition-delay: 0.13s; }
  .nb-mega.open .nb-mega-item:nth-child(4) { transition-delay: 0.17s; }
  .nb-mega.open .nb-mega-item:nth-child(5) { transition-delay: 0.21s; }
  .nb-mega.open .nb-mega-item:nth-child(6) { transition-delay: 0.25s; }

  .nb-mega-link {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 32px;
    color: #3a3a3a;
    text-decoration: none; font-size: 10px; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
    border-left: 3px solid transparent;
    transition: all 0.25s ease;
    position: relative; overflow: hidden;
    font-family: 'Outfit', sans-serif;
    background: none; border-top: none; border-right: none; border-bottom: none;
    width: 100%; text-align: left;
  }
  @media (max-width: 480px) { .nb-mega-link { padding: 13px 20px; letter-spacing: 2px; } }
  .nb-mega-link:hover { color: var(--deep); padding-left: 48px; border-left: 3px solid var(--gold); background: rgba(26,74,56,0.03); }
  @media (max-width: 480px) { .nb-mega-link:hover { padding-left: 32px; } }
  .nb-mega-arrow { opacity: 0; transform: translateX(-6px); color: var(--gold); font-size: 12px; transition: opacity 0.22s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1); }
  .nb-mega-link:hover .nb-mega-arrow { opacity: 1; transform: translateX(0); }

  /* ─── MOBILE CALL-TO-ACTION inside hamburger menu ─── */
  .nb-mega-mobile-ctas {
    display: none;
    padding: 12px 20px;
    gap: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  @media (max-width: 768px) { .nb-mega-mobile-ctas { display: flex; flex-direction: column; } }

  .nb-mega-mobile-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px 20px; font-size: 10px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    border: none; cursor: pointer; border-radius: 1px;
    font-family: 'Outfit', sans-serif; transition: all 0.25s ease;
    width: 100%;
  }
  .nb-mega-mobile-btn.primary {
    background: linear-gradient(135deg, var(--deep) 0%, var(--mid) 100%);
    color: #ffffff;
  }
  .nb-mega-mobile-btn.primary:hover { background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%); color: var(--deeper); }
  .nb-mega-mobile-btn.outline {
    background: transparent;
    border: 1.5px solid rgba(26,74,56,0.3);
    color: var(--deep);
  }
  .nb-mega-mobile-btn.outline:hover { border-color: var(--deep); background: rgba(26,74,56,0.06); }

  /* ─── MOBILE CONTACT INFO inside hamburger menu ─── */
  .nb-mega-mobile-info {
    display: none;
    padding: 12px 20px;
    gap: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  @media (max-width: 900px) { .nb-mega-mobile-info { display: flex; flex-direction: column; } }

  .nb-mega-mobile-info-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px;
    background: #fafafa;
    border: 1px solid rgba(184,152,72,0.15);
    border-radius: 2px;
  }
  .nb-mega-mobile-info-row svg { color: var(--gold); flex-shrink: 0; }
  .nb-mega-mobile-info-main { font-size: 12px; font-weight: 700; color: var(--deeper); font-family: 'Cinzel', serif; }
  .nb-mega-mobile-info-sub { font-size: 8px; font-weight: 400; color: #888; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 1px; }

  .nb-mega-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 32px;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.35s ease 0.28s, transform 0.35s ease 0.28s;
  }
  @media (max-width: 480px) { .nb-mega-footer { padding: 12px 20px; flex-direction: column; gap: 10px; align-items: flex-start; } }
  .nb-mega.open .nb-mega-footer { opacity: 1; transform: translateY(0); }
  .nb-mega-footer-copy { font-family: 'Playfair Display', serif; font-style: italic; font-size: 11px; color: #999; letter-spacing: 1px; }
  .nb-mega-socials { display: flex; gap: 18px; }
  .nb-mega-social { display: flex; align-items: center; gap: 6px; color: #888; font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: color 0.22s; cursor: pointer; }
  .nb-mega-social:hover { color: var(--deep); }

  /* ─── NOTIFICATION BADGE ─── */
  .nb-badge { position: absolute; top: 14px; right: 10px; width: 6px; height: 6px; border-radius: 50%; background: var(--gold2); box-shadow: 0 0 6px var(--gold2); animation: pulseBadge 2s ease-in-out infinite; }
  @keyframes pulseBadge { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }
`;

/* ── Icons ── */
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9.5"/><polyline points="12 7 12 12.5 15.5 15"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.738-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7.5"/><line x1="21" y1="21" x2="16.4" y2="16.4"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ScaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/><polyline points="3 6 12 3 21 6"/>
    <path d="M3 6l4.5 9A4.5 4.5 0 0 0 12 18a4.5 4.5 0 0 0 4.5-3L21 6"/>
    <line x1="3" y1="21" x2="21" y2="21"/>
  </svg>
);

/* ── Types ── */
type SubItem = { label: string };
type DropdownItem = { label: string; sub?: SubItem[] };
type NavItem = {
  label: string;
  star: boolean;
  dropdown?: DropdownItem[];
  mega?: { heading: string; items: string[] }[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home", star: true,
    dropdown: [
      { label: "Main Home" }, { label: "Legal Consultant" }, { label: "Attorney Home" },
      { label: "Left Menu Home" }, { label: "Law Office" }, { label: "Divided Showcase" },
      { label: "Financial Law" }, { label: "Vertical Slider" }, { label: "Law Firm Grid" }, { label: "Landing" },
    ],
  },
  {
    label: "Pages", star: true,
    dropdown: [
      { label: "About Us" }, { label: "About Me" }, { label: "Pricing Plans" },
      { label: "FAQ Page" }, { label: "Contact Us" }, { label: "Our Team" },
      { label: "Testimonials" }, { label: "Team Member" },
    ],
  },
  {
    label: "Blog", star: true,
    dropdown: [
      { label: "Masonry" },
      { label: "Standard", sub: [{ label: "Standard List" }, { label: "Standard Grid" }] },
      { label: "Post Types", sub: [{ label: "Video Post" }, { label: "Audio Post" }, { label: "Gallery Post" }] },
    ],
  },
  {
    label: "Our Expertise", star: true,
    dropdown: [
      { label: "Standard" }, { label: "Gallery" },
      { label: "Layouts", sub: [{ label: "Full Width" }, { label: "Boxed" }] },
      { label: "Single Types", sub: [{ label: "Single Sidebar" }, { label: "Single Full Width" }] },
    ],
  },
  {
    label: "Shop", star: true,
    dropdown: [
      { label: "Product List" }, { label: "Product Single" },
      { label: "Shop Layouts", sub: [{ label: "Grid Layout" }, { label: "List Layout" }] },
      { label: "Shop Pages", sub: [{ label: "Cart" }, { label: "Checkout" }, { label: "My Account" }] },
    ],
  },
  {
    label: "Elements", star: true,
    mega: [
      { heading: "Classic",       items: ["Accordions","Tabs","Clients","Buttons","Single Image","Contact Form","Portfolio List","Blog List"] },
      { heading: "Presentation",  items: ["Team","Parallax Section","Shop List","Interactive Icon","Vertical Timeline","Horizontal Timeline","Gallery Slider","Testimonials"] },
      { heading: "Infographic",   items: ["Pricing Tables","Progress Bar","Counters","Countdown","Pie Chart","Google Maps","Icon With Text","Video Button"] },
      { heading: "Typography",    items: ["Headings","Columns","Section Title","Blockquote","Dropcaps","Separators","Custom Font","Icon List Item"] },
    ],
  },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("Home");
  const [searchVal, setSearchVal] = useState("");
  const searchInputRef            = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nb-root")) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <div className={`nb-root${scrolled ? " scrolled" : ""}`}>
      <style>{NAV_STYLES}</style>

      {/* ===== SEARCH OVERLAY ===== */}
      <div
        className={`nb-search-overlay${searchOpen ? " open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
      >
        <div className="nb-search-inner">
          <button className="nb-search-close" onClick={() => setSearchOpen(false)}>✕</button>
          <div className="nb-search-label">Search</div>
          <div className="nb-search-wrap">
            <SearchIcon />
            <input
              ref={searchInputRef}
              className="nb-search-input"
              placeholder="Search cases, practice areas…"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
          </div>
          <div className="nb-search-hint">Press ESC to close &nbsp;·&nbsp; Enter to search</div>
        </div>
      </div>

      {/* ===== TOP BAR ===== */}
      <div className="nb-topbar">
        {/* Logo */}
        <a className="nb-logo" href="#">
          <div className="nb-logo-emblem">
            <img
              src="/logo.png"
              alt="Amin Law Associates"
              className="nb-logo-img"
            />
          </div>
        </a>

        <div className="nb-spacer" />

        {/* Info groups — hidden on mobile via CSS */}
        <div className="nb-info-group">
          <span className="nb-info-icon"><ClockIcon /></span>
          <div>
            <span className="nb-info-main">9:00 – 18:00</span>
            <span className="nb-info-sub">Mon – Sat, Office Hours</span>
          </div>
        </div>
        <div className="nb-info-group">
          <span className="nb-info-icon"><PhoneIcon /></span>
          <div>
            <span className="nb-info-main">03009209003</span>
            <span className="nb-info-sub">Free Consultation</span>
          </div>
        </div>

        {/* Actions */}
        <div className="nb-actions">
          <a className="nb-action" href="#" title="Twitter">
            <TwitterIcon /><span className="nb-action-lbl">Twitter</span>
          </a>
          <a className="nb-action" href="#" title="LinkedIn">
            <LinkedInIcon /><span className="nb-action-lbl">LinkedIn</span>
          </a>
          <button className="nb-action" title="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon /><span className="nb-action-lbl">Search</span>
          </button>
          <button
            className={`nb-action is-menu${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(p => !p)}
            title="Menu"
          >
            <div className={`nb-ham${menuOpen ? " open" : ""}`}>
              <span /><span /><span />
            </div>
            <span className="nb-action-lbl">Menu</span>
          </button>
        </div>
      </div>

      {/* ===== MAIN NAV BAR — hidden on mobile ===== */}
      <div className="nb-mainbar">
        <ul className="nb-nav">
          {NAV_ITEMS.map(item => (
            <li key={item.label} className="nb-nav-item">
              <button
                className={`nb-nav-link${active === item.label ? " active" : ""}`}
                onClick={() => setActive(item.label)}
              >
                {item.label}
                {item.star && <span className="nb-star">★</span>}
              </button>

              {/* Standard Dropdown */}
              {item.dropdown && item.dropdown.length > 0 && (
                <div className="nb-dropdown">
                  <ul>
                    {item.dropdown.map((sub, idx) => (
                      <React.Fragment key={sub.label}>
                        <li className={sub.sub ? "has-sub" : ""}>
                          <a href="#" onClick={e => { e.preventDefault(); setActive(item.label); }}>
                            <span className="nb-dropdown-icon">◆</span>
                            {sub.label}
                            {sub.sub && <span className="nb-sub-arrow">›</span>}
                          </a>
                          {sub.sub && (
                            <div className="nb-sub-menu">
                              <ul>
                                {sub.sub.map(s => (
                                  <li key={s.label}>
                                    <a href="#" onClick={e => e.preventDefault()}>
                                      <span className="nb-dropdown-icon" style={{ fontSize: '7px' }}>◆</span>
                                      {s.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                        {idx === 2 && <li className="nb-divider" />}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mega Dropdown */}
              {item.mega && (
                <div className="nb-mega-dropdown">
                  <div className="nb-mega-grid">
                    {item.mega.map(col => (
                      <div key={col.heading} className="nb-mega-col">
                        <h4>{col.heading}</h4>
                        <ul>
                          {col.items.map(link => (
                            <li key={link}>
                              <a href="#" onClick={e => e.preventDefault()}>{link}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <button
          className="nb-cta"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(26,74,56,0.3)',
            color: 'var(--deep)',
            boxShadow: 'none',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget;
            b.style.borderColor = 'var(--deep)';
            b.style.background = 'rgba(26,74,56,0.06)';
          }}
          onMouseLeave={e => {
            const b = e.currentTarget;
            b.style.borderColor = 'rgba(26,74,56,0.3)';
            b.style.background = 'transparent';
          }}
        >
          <ScaleIcon /> Case Review
        </button>
        <button className="nb-cta">
          <span>Free Evaluation</span>
          <span className="nb-cta-arrow"><ArrowIcon /></span>
        </button>
      </div>

      {/* ===== HAMBURGER SLIDE MENU ===== */}
      <div className={`nb-mega${menuOpen ? " open" : ""}`}>

        {/* Mobile contact info — shown when info-group pills are hidden */}
        <div className="nb-mega-mobile-info">
          <div className="nb-mega-mobile-info-row">
            <ClockIcon />
            <div>
              <div className="nb-mega-mobile-info-main">12:00pm – 11:00pm</div>
              <div className="nb-mega-mobile-info-sub">Mon – Sat, Office Hours</div>
            </div>
          </div>
          <div className="nb-mega-mobile-info-row">
            <PhoneIcon />
            <div>
              <div className="nb-mega-mobile-info-main">03009209003</div>
              <div className="nb-mega-mobile-info-sub">Free Consultation</div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <ul className="nb-mega-list">
          {NAV_ITEMS.map(item => (
            <li key={item.label} className="nb-mega-item">
              <button
                className="nb-mega-link"
                onClick={() => { setActive(item.label); setMenuOpen(false); }}
              >
                <span className="nb-mega-arrow">→</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile CTA buttons — shown when desktop CTAs are hidden */}
        <div className="nb-mega-mobile-ctas">
          <button className="nb-mega-mobile-btn outline">
            <ScaleIcon /> Case Review
          </button>
          <button className="nb-mega-mobile-btn primary">
            Free Evaluation <ArrowIcon />
          </button>
        </div>

        <div className="nb-mega-footer">
          <span className="nb-mega-footer-copy">© 2025 Amin Law Associates. All rights reserved.</span>
          <div className="nb-mega-socials">
            <a href="#" className="nb-mega-social"><TwitterIcon /> Twitter</a>
            <a href="#" className="nb-mega-social"><LinkedInIcon /> LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;