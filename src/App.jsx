import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Cpu,
  Eye,
  ShieldCheck,
  Database,
  Zap,
  Search,
  Command,
  Play,
  RefreshCw,
  BarChart2,
  Layers,
  AlertTriangle,
  CheckCircle,
  Terminal,
  X,
  ChevronRight,
  Sliders,
  Server,
  Radio,
  ArrowRight,
  Sparkles,
  Info,
  Maximize2,
  Crosshair,
  Lock,
  Compass,
  CornerDownLeft,
  SlidersHorizontal,
  Grid
} from 'lucide-react';

const customStyles = `
:root {
  --bg-app: #05070A;
  --bg-deep: #080C12;
  --bg-surface: #0D1118;
  --bg-elevated: #111722;
  --border-graphite: #171D26;
  --border-elevated: #232E40;
  --text-silver: #B8C0CC;
  --text-bright: #E7EBF2;
  --text-muted: #697382;
  --blue-dark: #0B1C32;
  --blue-deep: #0E2A4A;
  --blue-electric: #3FA9FF;
  --blue-bright: #66C4FF;
  --green-operational: #00FF9D;
  --red-anomaly: #FF3B5C;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Reset & Global Canvas Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-app);
  color: var(--text-bright);
  font-family: var(--font-sans);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}

/* Main Container Layout */
.app-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
  padding: 12px 16px;
}

/* Header Styles */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-graphite);
  padding-bottom: 12px;
  margin-bottom: 16px;
  background-color: rgba(5, 7, 10, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 30;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-diamond {
  width: 12px;
  height: 12px;
  background-color: var(--blue-electric);
  transform: rotate(45deg);
  box-shadow: 0 0 10px var(--blue-electric);
}

.logo-text {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-bright);
}

.header-tagline {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 640px) {
  .header-tagline {
    display: none;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-indicator-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-deep);
  border: 1px solid var(--border-graphite);
  padding: 4px 12px;
}

.ping-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--green-operational);
  animation: pulse-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse-ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.status-badge-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-silver);
}

/* Magnetic Button Components */
.magnetic-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid;
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
}

.magnetic-btn-active {
  background-color: var(--bg-elevated);
  border-color: var(--blue-electric);
  color: var(--blue-bright);
  box-shadow: 0 0 15px rgba(63, 169, 255, 0.25);
}

.magnetic-btn-inactive {
  background-color: rgba(13, 17, 24, 0.8);
  border-color: var(--border-graphite);
  color: var(--text-silver);
}

.magnetic-btn-inactive:hover {
  border-color: rgba(184, 192, 204, 0.4);
  color: var(--text-bright);
}

.magnetic-btn-inner {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
}

.keyboard-kbd {
  font-size: 9px;
  color: var(--text-muted);
  border: 1px solid var(--border-graphite);
  padding: 2px 4px;
  margin-left: 4px;
}

/* Interactive Panel Component */
.interactive-panel {
  position: relative;
  background-color: rgba(13, 17, 24, 0.8);
  border: 1px solid var(--border-graphite);
  transition: border-color 0.3s ease;
  overflow: hidden;
}

.interactive-panel:hover {
  border-color: var(--border-elevated);
}

.interactive-panel.clickable {
  cursor: pointer;
}

.corner-accent {
  position: absolute;
  width: 6px;
  height: 6px;
  transition: border-color 0.3s ease;
}

.corner-tl {
  top: 0;
  left: 0;
  border-top: 1px solid rgba(184, 192, 204, 0.4);
  border-left: 1px solid rgba(184, 192, 204, 0.4);
}

.corner-tr {
  top: 0;
  right: 0;
  border-top: 1px solid rgba(184, 192, 204, 0.4);
  border-right: 1px solid rgba(184, 192, 204, 0.4);
}

.corner-bl {
  bottom: 0;
  left: 0;
  border-bottom: 1px solid rgba(184, 192, 204, 0.4);
  border-left: 1px solid rgba(184, 192, 204, 0.4);
}

.corner-br {
  bottom: 0;
  right: 0;
  border-bottom: 1px solid rgba(184, 192, 204, 0.4);
  border-right: 1px solid rgba(184, 192, 204, 0.4);
}

.interactive-panel:hover .corner-accent {
  border-color: var(--blue-electric);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-graphite);
  background-color: rgba(8, 12, 18, 0.5);
}

.panel-title {
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--text-silver);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-title-dot {
  width: 6px;
  height: 6px;
  background-color: var(--blue-electric);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.panel-badge {
  font-size: 10px;
  font-family: var(--font-mono);
  padding: 2px 8px;
  background-color: var(--border-graphite);
  border: 1px solid var(--border-elevated);
  color: var(--text-muted);
}

.panel-body {
  padding: 16px;
}

/* Grid Layout Subsystem */
.app-content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  flex: 1;
}

@media (min-width: 1024px) {
  .app-content-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
  .app-sidebar {
    grid-column: span 2 / span 2;
  }
  .app-workspace {
    grid-column: span 7 / span 7;
  }
  .app-aside {
    grid-column: span 3 / span 3;
  }
}

/* Sidebar Navigation */
.app-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(23, 29, 38, 0.6);
  padding-right: 8px;
}

.nav-buttons-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.nav-item-active {
  color: var(--blue-bright);
  background-color: var(--bg-surface);
  border-left: 2px solid var(--blue-electric);
}

.nav-item-inactive {
  color: var(--text-muted);
}

.nav-item-inactive:hover {
  color: var(--text-silver);
  background-color: var(--bg-deep);
}

.nav-icon {
  width: 16px;
  height: 16px;
}

.nav-icon-active {
  color: var(--blue-electric);
}

.nav-icon-inactive {
  color: var(--text-muted);
}

.sidebar-health-card {
  padding: 12px;
  background-color: var(--bg-deep);
  border: 1px solid var(--border-graphite);
  margin-top: 24px;
  font-size: 10px;
  font-family: var(--font-mono);
}

.sidebar-health-title {
  color: var(--text-muted);
  margin-bottom: 4px;
  text-transform: uppercase;
}

.sidebar-health-status {
  color: var(--green-operational);
  font-weight: 700;
}

.sidebar-health-nodes {
  color: var(--text-muted);
  margin-top: 8px;
  font-size: 9px;
}

/* Workspace Main Panel */
.app-workspace {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.workspace-title-row {
  margin-bottom: 4px;
}

.workspace-title {
  font-size: 1.25rem;
  font-family: var(--font-mono);
  letter-spacing: -0.025em;
  color: var(--text-bright);
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.workspace-subtitle {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-top: 4px;
}

/* Overview Metrics Cards */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (min-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.metric-val {
  font-size: 1.5rem;
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--text-bright);
}

.metric-val-blue {
  color: var(--blue-bright);
}

.metric-sub-green {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--green-operational);
  margin-top: 4px;
}

.metric-sub-blue {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--blue-electric);
  margin-top: 4px;
}

.metric-sub-muted {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-top: 4px;
}

/* Live Topology Map */
.topology-wrapper {
  position: relative;
  width: 100%;
  height: 380px;
  background-color: rgba(8, 12, 18, 0.9);
  border: 1px solid var(--border-graphite);
  border-radius: 2px;
  overflow: hidden;
  padding: 16px;
}

.topology-overlay-header {
  position: absolute;
  top: 12px;
  left: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
}

.topology-overlay-title {
  font-size: 10px;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  color: var(--text-muted);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
}

.topology-overlay-node-count {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--blue-electric);
  background-color: var(--bg-surface);
  padding: 2px 8px;
  border: 1px solid var(--border-graphite);
}

.topology-overlay-footer {
  position: absolute;
  bottom: 12px;
  right: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.topology-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.bg-electric { background-color: var(--blue-electric); }
.bg-anomaly { background-color: var(--red-anomaly); }
.bg-operational { background-color: var(--green-operational); }

.topology-svg {
  width: 100%;
  height: 100%;
}

.selected-node-bar {
  margin-top: 12px;
  padding: 12px;
  background-color: var(--bg-deep);
  border: 1px solid var(--border-elevated);
  font-size: 12px;
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.node-clear-btn {
  font-size: 10px;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
}

.node-clear-btn:hover {
  color: var(--text-bright);
}

/* Models Monitor */
.quick-monitor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) {
  .quick-monitor-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.models-full-stack {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.model-card-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: center;
}

@media (min-width: 768px) {
  .model-card-metrics {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.mini-sparkline {
  width: 96px;
  height: 32px;
  overflow: visible;
}

/* Intelligence Signals */
.signals-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.signal-meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  border-top: 1px solid var(--border-graphite);
  padding-top: 8px;
}

/* Activity Log & Telemetry Sidebar */
.app-aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid rgba(23, 29, 38, 0.6);
  padding-left: 8px;
}

.activity-feed-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 4px;
}

.activity-feed-item {
  padding: 8px;
  background-color: var(--bg-deep);
  border: 1px solid var(--border-graphite);
  font-size: 11px;
  font-family: var(--font-mono);
}

.activity-feed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 9px;
  margin-bottom: 4px;
}

.telemetry-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
}

.telemetry-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.telemetry-progress-bg {
  width: 100%;
  height: 4px;
  background-color: var(--border-graphite);
}

.telemetry-progress-fill {
  height: 100%;
  background-color: var(--blue-electric);
}

/* Inference Pipeline Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: rgba(5, 7, 10, 0.85);
  backdrop-filter: blur(12px);
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 672px;
  background-color: var(--bg-surface);
  border: 1px solid rgba(63, 169, 255, 0.4);
  box-shadow: 0 0 50px rgba(63, 169, 255, 0.15);
  padding: 24px;
  overflow: hidden;
}

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-close-btn:hover {
  color: var(--text-bright);
}

.modal-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.modal-title-text {
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--text-bright);
  text-transform: uppercase;
}

.pipeline-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 32px;
}

.pipeline-stage-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pipeline-stage-bar {
  height: 6px;
  background-color: var(--border-graphite);
  transition: all 0.5s ease;
}

.pipeline-stage-bar.active {
  background-color: var(--blue-electric);
  box-shadow: 0 0 10px var(--blue-electric);
}

.pipeline-stage-label {
  font-size: 9px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  color: var(--text-muted);
}

.pipeline-stage-label.active {
  color: var(--blue-bright);
}

.terminal-box {
  background-color: var(--bg-deep);
  border: 1px solid var(--border-graphite);
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  margin-bottom: 24px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.terminal-stage-title {
  color: var(--blue-electric);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-detail-text {
  color: var(--text-silver);
  font-size: 12px;
  line-height: 1.6;
}

.terminal-footer-info {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border-graphite);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-muted);
}

.finding-card {
  padding: 16px;
  background-color: var(--bg-elevated);
  border: 1px solid var(--border-elevated);
  margin-bottom: 24px;
}

.finding-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.finding-title {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--blue-bright);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.finding-badge {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--green-operational);
  background-color: rgba(0, 255, 157, 0.1);
  padding: 2px 8px;
  border: 1px solid rgba(0, 255, 157, 0.3);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Command Palette */
.cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 96px;
  background-color: rgba(5, 7, 10, 0.8);
  backdrop-filter: blur(4px);
}

.cmd-container {
  width: 100%;
  max-width: 576px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-elevated);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.cmd-search-header {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-graphite);
}

.cmd-input {
  width: 100%;
  background: transparent;
  padding: 14px 12px;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-bright);
  border: none;
  outline: none;
}

.cmd-input::placeholder {
  color: var(--text-muted);
}

.cmd-esc-badge {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  border: 1px solid var(--border-graphite);
  padding: 2px 6px;
}

.cmd-results-list {
  max-height: 288px;
  overflow-y: auto;
  padding: 8px;
}

.cmd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-silver);
  transition: color 0.15s ease, background-color 0.15s ease;
}

.cmd-item:hover {
  background-color: var(--bg-elevated);
  color: var(--text-bright);
}

.cmd-item-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cmd-item-arrow {
  width: 14px;
  height: 14px;
  color: var(--blue-electric);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.cmd-item:hover .cmd-item-arrow {
  opacity: 1;
}

.cmd-item-cat {
  font-size: 9px;
  color: var(--text-muted);
  border: 1px solid var(--border-graphite);
  padding: 2px 6px;
  text-transform: uppercase;
}

.cmd-empty {
  padding: 16px;
  text-align: center;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

/* Utilities */
.icon-sm { width: 12px; height: 12px; }
.icon-md { width: 16px; height: 16px; }
.icon-lg { width: 20px; height: 20px; }
.text-electric { color: var(--blue-electric); }
.text-operational { color: var(--green-operational); }
.text-anomaly { color: var(--red-anomaly); }
.text-muted { color: var(--text-muted); }
.text-silver { color: var(--text-silver); }
.text-bright { color: var(--text-bright); }
.text-bright-blue { color: var(--blue-bright); }
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;

const INITIAL_MODELS = [
  {
    id: 'vision-core',
    name: 'VISION CORE v4.2',
    category: 'Spatial Perception',
    confidence: 98.2,
    latency: 42,
    status: 'Operational',
    throughput: '1.2M img/s',
    load: 64,
    sparkline: [65, 70, 68, 74, 82, 80, 88, 92, 98, 98],
    description: 'High-frequency visual intelligence engine processing real-time video streams and geometric point clouds.'
  },
  {
    id: 'language-core',
    name: 'LANGUAGE CORE (NEXUS-7)',
    category: 'Syntactic Synthesis',
    confidence: 95.7,
    latency: 61,
    status: 'Operational',
    throughput: '840k tok/s',
    load: 81,
    sparkline: [90, 85, 88, 91, 89, 94, 92, 95, 96, 95],
    description: 'Deep semantic synthesis model optimizing contextual reasoning and multi-turn symbolic logic.'
  },
  {
    id: 'predictive-engine',
    name: 'PREDICTIVE ENGINE',
    category: 'Temporal Projection',
    confidence: 91.8,
    latency: 73,
    status: 'Monitoring',
    throughput: '3.4M event/s',
    load: 45,
    sparkline: [40, 52, 60, 58, 65, 78, 85, 88, 90, 91],
    description: 'Probabilistic time-series forecaster anticipating complex system state transitions and anomalies.'
  },
  {
    id: 'anomaly-detector',
    name: 'ANOMALY DETECTOR',
    category: 'Security & Entropy',
    confidence: 93.1,
    latency: 48,
    status: 'Operational',
    throughput: '10.8 GB/s',
    load: 59,
    sparkline: [30, 35, 42, 60, 55, 70, 82, 85, 91, 93],
    description: 'Continuous zero-day vector scanner isolating architectural divergences and systemic drifts.'
  }
];

const TOPOLOGY_NODES = [
  { id: 'data-1', label: 'Telemetry Ingest', type: 'DATA', x: 12, y: 30, status: 'active', rate: '4.2 GB/s' },
  { id: 'data-2', label: 'Vector Vault', type: 'DATA', x: 12, y: 70, status: 'active', rate: '14.1 TB' },
  { id: 'proc-1', label: 'Tensor Array Alpha', type: 'PROCESSING', x: 34, y: 25, status: 'active', capacity: '88%' },
  { id: 'proc-2', label: 'Quant Engine', type: 'PROCESSING', x: 34, y: 75, status: 'active', capacity: '62%' },
  { id: 'mod-vision', label: 'Vision Core', type: 'MODEL', x: 58, y: 20, status: 'active', modelId: 'vision-core' },
  { id: 'mod-lang', label: 'Language Core', type: 'MODEL', x: 58, y: 45, status: 'active', modelId: 'language-core' },
  { id: 'mod-pred', label: 'Predictive Engine', type: 'MODEL', x: 58, y: 70, status: 'warning', modelId: 'predictive-engine' },
  { id: 'intel-1', label: 'Synthesis Engine', type: 'INTELLIGENCE', x: 80, y: 35, status: 'active', signal: 'High' },
  { id: 'intel-2', label: 'Entropy Monitor', type: 'INTELLIGENCE', x: 80, y: 65, status: 'active', signal: 'Nominal' },
  { id: 'out-1', label: 'Autonomous Actuator', type: 'OUTPUT', x: 94, y: 50, status: 'active', latency: '4ms' },
];

const TOPOLOGY_EDGES = [
  { from: 'data-1', to: 'proc-1' },
  { from: 'data-1', to: 'proc-2' },
  { from: 'data-2', to: 'proc-2' },
  { from: 'proc-1', to: 'mod-vision' },
  { from: 'proc-1', to: 'mod-lang' },
  { from: 'proc-2', to: 'mod-lang' },
  { from: 'proc-2', to: 'mod-pred' },
  { from: 'mod-vision', to: 'intel-1' },
  { from: 'mod-lang', to: 'intel-1' },
  { from: 'mod-pred', to: 'intel-2' },
  { from: 'intel-1', to: 'out-1' },
  { from: 'intel-2', to: 'out-1' },
];

const INTELLIGENCE_SIGNALS = [
  {
    id: 'sig-01',
    title: 'ANOMALY DETECTED',
    category: 'System Drift',
    impact: 'MEDIUM',
    confidence: 92,
    source: 'Predictive Engine',
    timestamp: '2m ago',
    description: 'Model latency increased 8.4% across the last 12 minutes due to non-linear tensor distribution.'
  },
  {
    id: 'sig-02',
    title: 'PATTERN IDENTIFIED',
    category: 'Throughput Surge',
    impact: 'LOW',
    confidence: 87,
    source: 'Data Ingest Array',
    timestamp: '8m ago',
    description: 'Inference volume has increased consistently over the last four hours across vector pipeline B.'
  },
  {
    id: 'sig-03',
    title: 'SYSTEM INSIGHT',
    category: 'Load Rebalance',
    impact: 'OPTIMAL',
    confidence: 96,
    source: 'Vision Core',
    timestamp: '14m ago',
    description: 'Vision Core is currently handling 34% of active inference traffic with zero memory fragmentation.'
  }
];

const ACTIVITY_LOGS = [
  { id: 1, source: 'VISION CORE', text: 'Inference batch #9042 verified', time: '2.4s ago', level: 'info' },
  { id: 2, source: 'DATA PIPELINE', text: 'Vector index re-clustered successfully', time: '18s ago', level: 'info' },
  { id: 3, source: 'PREDICTIVE ENGINE', text: 'Transient divergence threshold flagged', time: '41s ago', level: 'warn' },
  { id: 4, source: 'LANGUAGE CORE', text: 'Multi-turn context buffer cleared', time: '52s ago', level: 'info' },
  { id: 5, source: 'SECURITY CORE', text: 'Cryptographic attestation valid', time: '1m ago', level: 'secure' }
];

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1
    }));

    const render = () => {
      ctx.fillStyle = '#05070A';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(23, 29, 38, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(102, 196, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background" />;
};

const MagneticButton = ({ children, onClick, className = '', active = false }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onClick={onClick}
      className={`magnetic-btn ${active ? 'magnetic-btn-active' : 'magnetic-btn-inactive'} ${className}`}
    >
      <span className="magnetic-btn-inner">{children}</span>
    </motion.button>
  );
};

const InteractivePanel = ({ children, className = '', title, badge, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`interactive-panel ${onClick ? 'clickable' : ''} ${className}`}
    >
      <div className="corner-accent corner-tl" />
      <div className="corner-accent corner-tr" />
      <div className="corner-accent corner-bl" />
      <div className="corner-accent corner-br" />

      {(title || badge) && (
        <div className="panel-header">
          {title && (
            <span className="panel-title">
              <span className="panel-title-dot" />
              {title}
            </span>
          )}
          {badge && <span className="panel-badge">{badge}</span>}
        </div>
      )}

      <div className="panel-body">{children}</div>
    </div>
  );
};

const TopologyMap = ({ onSelectNode, selectedNodeId }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pulseOffset, setPulseOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseOffset((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topology-wrapper">
      <div className="topology-overlay-header">
        <span className="topology-overlay-title">
          <Grid className="icon-sm text-electric" /> SYSTEM TOPOLOGY MATRIX
        </span>
        <span className="topology-overlay-node-count">10 ACTIVE NODES</span>
      </div>

      <div className="topology-overlay-footer">
        <div className="topology-legend-item">
          <span className="legend-dot bg-electric" /> DATA FLOW
        </div>
        <div className="topology-legend-item">
          <span className="legend-dot bg-anomaly" /> ANOMALY
        </div>
        <div className="topology-legend-item">
          <span className="legend-dot bg-operational" /> OPERATIONAL
        </div>
      </div>

      <svg className="topology-svg">
        {TOPOLOGY_EDGES.map((edge, idx) => {
          const source = TOPOLOGY_NODES.find((n) => n.id === edge.from);
          const target = TOPOLOGY_NODES.find((n) => n.id === edge.to);
          if (!source || !target) return null;

          const isConnectedToHover =
            hoveredNode && (edge.from === hoveredNode || edge.to === hoveredNode);
          const isSelectedEdge =
            selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId);

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={`${source.x}%`}
                y1={`${source.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={
                  isSelectedEdge
                    ? '#3FA9FF'
                    : isConnectedToHover
                    ? '#66C4FF'
                    : '#171D26'
                }
                strokeWidth={isSelectedEdge || isConnectedToHover ? 1.5 : 1}
                strokeDasharray={edge.from.includes('pred') ? '4 4' : 'none'}
                style={{ transition: 'stroke 0.3s ease' }}
              />
              <circle
                r="2.5"
                fill={isSelectedEdge ? '#66C4FF' : '#3FA9FF'}
                style={{ filter: 'drop-shadow(0 0 8px #3FA9FF)' }}
              >
                <animateMotion
                  path={`M ${(source.x / 100) * 800} ${(source.y / 100) * 350} L ${(target.x / 100) * 800} ${(target.y / 100) * 350}`}
                  dur={`${2 + (idx % 3)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {TOPOLOGY_NODES.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredNode === node.id;

          return (
            <g
              key={node.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelectNode(node)}
            >
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={isSelected ? 18 : isHovered ? 14 : 10}
                fill="none"
                stroke={
                  node.status === 'warning'
                    ? '#FF3B5C'
                    : isSelected || isHovered
                    ? '#3FA9FF'
                    : '#171D26'
                }
                strokeWidth={1}
                style={{ transition: 'all 0.3s ease', opacity: 0.6 }}
              />

              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.type === 'MODEL' ? 7 : 5}
                fill={
                  node.status === 'warning'
                    ? '#FF3B5C'
                    : isSelected
                    ? '#66C4FF'
                    : '#0D1118'
                }
                stroke={
                  node.status === 'warning'
                    ? '#FF3B5C'
                    : isSelected
                    ? '#3FA9FF'
                    : '#B8C0CC'
                }
                strokeWidth={1.5}
                style={{ transition: 'all 0.3s ease' }}
              />

              <text
                x={`${node.x}%`}
                y={`${node.y + (node.y > 70 ? -6 : 7)}%`}
                textAnchor="middle"
                fill={isSelected ? '#E7EBF2' : '#B8C0CC'}
                fontSize="10"
                fontFamily="monospace"
                style={{ pointerEvents: 'none', userSelect: 'none', letterSpacing: '0.05em' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const MiniSparkline = ({ data = [], color = '#3FA9FF' }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 30 - ((val - min) / range) * 24;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="mini-sparkline">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const InferencePipelineModal = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState(0);

  const stages = [
    { title: 'INPUT SIGNAL INGESTION', detail: 'Parsing 12,842 parallel inference streams from vector core' },
    { title: 'LATENT REASONING SYNTHESIS', detail: 'Evaluating cross-attention matrices & semantic vector geometry' },
    { title: 'ENTROPY & ANOMALY SCAN', detail: 'Executing zero-day divergence validation across sub-networks' },
    { title: 'SYNTHESIS COMPLETE', detail: 'High-confidence insight isolated with 94.8% system certainty' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setStage(0);
      return;
    }
    const timer1 = setTimeout(() => setStage(1), 800);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => setStage(3), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="modal-container"
      >
        <button onClick={onClose} className="modal-close-btn">
          <X className="icon-lg" />
        </button>

        <div className="modal-title-row">
          <Zap className="icon-lg text-electric" style={{ animation: 'pulse 1s infinite' }} />
          <span className="modal-title-text">NEXUS LIVE INFERENCE PIPELINE</span>
        </div>

        <div className="pipeline-grid">
          {stages.map((s, idx) => (
            <div key={idx} className="pipeline-stage-col">
              <div className={`pipeline-stage-bar ${stage >= idx ? 'active' : ''}`} />
              <span className={`pipeline-stage-label ${stage >= idx ? 'active' : ''}`}>
                0{idx + 1}. STAGE
              </span>
            </div>
          ))}
        </div>

        <div className="terminal-box">
          <div>
            <div className="terminal-stage-title">
              <Terminal className="icon-md" />
              <span>{stages[stage].title}</span>
            </div>
            <p className="terminal-detail-text">{stages[stage].detail}</p>
          </div>

          <div className="terminal-footer-info">
            <span>STATUS: {stage === 3 ? 'COMPLETE' : 'EXECUTING TENSOR OPERATORS...'}</span>
            <span>LATENCY: 1.82s</span>
          </div>
        </div>

        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="finding-card"
          >
            <div className="finding-header">
              <span className="finding-title">
                <CheckCircle className="icon-md text-operational" /> KEY FINDING ISOLATED
              </span>
              <span className="finding-badge">CONFIDENCE: 94.8%</span>
            </div>
            <p className="text-silver" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              Potential structural anomaly detected within predictive engine attention weights. System recommended automatic vector recalculation.
            </p>
          </motion.div>
        )}

        <div className="modal-footer">
          <MagneticButton onClick={onClose} active={stage === 3}>
            {stage === 3 ? 'CLOSE INSPECTION' : 'CANCEL INFERENCE'}
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
};

const CommandPalette = ({ isOpen, onClose, onSelectTab, onRunAnalysis }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const actions = [
    { label: 'Run AI System Analysis', action: onRunAnalysis, category: 'INFERENCE' },
    { label: 'Navigate to Overview', action: () => { onSelectTab('overview'); onClose(); }, category: 'NAVIGATION' },
    { label: 'Inspect Core Models', action: () => { onSelectTab('models'); onClose(); }, category: 'NAVIGATION' },
    { label: 'View Intelligence Signals', action: () => { onSelectTab('intelligence'); onClose(); }, category: 'NAVIGATION' },
    { label: 'Open Data Flow Topology', action: () => { onSelectTab('dataflow'); onClose(); }, category: 'NAVIGATION' },
    { label: 'Check System Diagnostics', action: () => { onSelectTab('system'); onClose(); }, category: 'NAVIGATION' }
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cmd-backdrop">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="cmd-container"
      >
        <div className="cmd-search-header">
          <Search className="icon-md text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask NEXUS or execute command..."
            className="cmd-input"
            autoFocus
          />
          <span className="cmd-esc-badge">ESC</span>
        </div>

        <div className="cmd-results-list">
          {filtered.map((item, idx) => (
            <div key={idx} onClick={item.action} className="cmd-item">
              <span className="cmd-item-label">
                <ChevronRight className="cmd-item-arrow" />
                {item.label}
              </span>
              <span className="cmd-item-cat">{item.category}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="cmd-empty">NO MATCHING COMMANDS FOUND</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

  const [liveMetrics, setLiveMetrics] = useState({
    confidence: 94.8,
    latency: 41,
    load: 67,
    volume: '4.82M',
    throughput: '18.4 GB/s'
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        confidence: +(94.5 + Math.random() * 0.6).toFixed(1),
        latency: Math.floor(39 + Math.random() * 5),
        load: Math.floor(65 + Math.random() * 5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#05070A', color: '#E7EBF2' }}>
      <style>{customStyles}</style>

      <CanvasBackground />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <div className="logo-group">
              <div className="logo-diamond" />
              <span className="logo-text">NEXUS</span>
            </div>
            <span className="header-tagline">INTELLIGENCE OPERATING ENVIRONMENT</span>
          </div>

          <div className="header-right">
            <div className="status-indicator-badge">
              <span className="ping-dot" />
              <span className="status-badge-text">SYSTEM OPERATIONAL</span>
            </div>

            <MagneticButton onClick={() => setCommandOpen(true)}>
              <Command className="icon-sm text-electric" />
              <span>COMMAND</span>
              <span className="keyboard-kbd">⌘K</span>
            </MagneticButton>

            <MagneticButton
              onClick={() => setAnalysisModalOpen(true)}
              active={true}
              style={{ backgroundColor: 'rgba(63, 169, 255, 0.1)', color: '#66C4FF' }}
            >
              <Play className="icon-sm" style={{ fill: 'currentColor' }} />
              <span>RUN ANALYSIS</span>
            </MagneticButton>
          </div>
        </header>

        {/* Content Layout */}
        <div className="app-content-grid">
          {/* Navigation Sidebar */}
          <nav className="app-sidebar">
            <div className="nav-buttons-stack">
              {[
                { id: 'overview', label: 'OVERVIEW', icon: Activity },
                { id: 'models', label: 'MODELS', icon: Cpu },
                { id: 'intelligence', label: 'INTELLIGENCE', icon: Eye },
                { id: 'analytics', label: 'ANALYTICS', icon: BarChart2 },
                { id: 'dataflow', label: 'DATA FLOW', icon: Layers },
                { id: 'activity', label: 'ACTIVITY', icon: Radio },
                { id: 'system', label: 'SYSTEM', icon: Server }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                  >
                    <Icon className={`nav-icon ${isActive ? 'nav-icon-active' : 'nav-icon-inactive'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="sidebar-health-card">
              <div className="sidebar-health-title">CLUSTER HEALTH</div>
              <div className="sidebar-health-status">100% NOMINAL</div>
              <div className="sidebar-health-nodes">NODES ONLINE: 128/128</div>
            </div>
          </nav>

          {/* Main Intelligence Workspace */}
          <main className="app-workspace">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="workspace-title-row">
                  <h1 className="workspace-title">
                    <Sparkles className="icon-lg text-electric" /> AI INTELLIGENCE COMMAND CENTER
                  </h1>
                  <p className="workspace-subtitle">Observed live state metrics & cross-node neural topology</p>
                </div>

                <div className="metrics-grid">
                  <InteractivePanel title="ACTIVE MODELS">
                    <div className="metric-val">12</div>
                    <div className="metric-sub-green">+2 synced</div>
                  </InteractivePanel>

                  <InteractivePanel title="INFERENCE VOLUME">
                    <div className="metric-val">{liveMetrics.volume}</div>
                    <div className="metric-sub-blue">events/24h</div>
                  </InteractivePanel>

                  <InteractivePanel title="SYSTEM CONFIDENCE">
                    <div className="metric-val metric-val-blue">{liveMetrics.confidence}%</div>
                    <div className="metric-sub-muted">Nominal vector</div>
                  </InteractivePanel>

                  <InteractivePanel title="LATENCY">
                    <div className="metric-val">{liveMetrics.latency}ms</div>
                    <div className="metric-sub-green">Optimal queue</div>
                  </InteractivePanel>
                </div>

                <InteractivePanel title="LIVE AI TOPOLOGY ENGINE" badge="INTERACTIVE MATRIX">
                  <TopologyMap onSelectNode={(node) => setSelectedNode(node)} selectedNodeId={selectedNode?.id} />
                  {selectedNode && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="selected-node-bar">
                      <div>
                        <span style={{ color: 'var(--blue-electric)', fontWeight: 700, textTransform: 'uppercase' }}>NODE INSPECTED: </span>
                        <span style={{ color: 'var(--text-bright)', marginLeft: '8px' }}>{selectedNode.label}</span>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '12px' }}>({selectedNode.type})</span>
                      </div>
                      <button onClick={() => setSelectedNode(null)} className="node-clear-btn">CLEAR SELECTION</button>
                    </motion.div>
                  )}
                </InteractivePanel>

                <div className="quick-monitor-grid">
                  {INITIAL_MODELS.slice(0, 2).map((model) => (
                    <InteractivePanel key={model.id} title={model.name} badge={model.status}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>CONFIDENCE</div>
                          <div style={{ fontSize: '18px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--blue-bright)' }}>{model.confidence}%</div>
                        </div>
                        <MiniSparkline data={model.sparkline} color="#3FA9FF" />
                      </div>
                      <p className="text-muted line-clamp-1" style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{model.description}</p>
                    </InteractivePanel>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'models' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h2 className="workspace-title">CORE MODEL COGNITION MATRIX</h2>
                  <p className="workspace-subtitle">Deep inspection of individual neural sub-engines</p>
                </div>

                <div className="models-full-stack">
                  {INITIAL_MODELS.map((model) => (
                    <InteractivePanel key={model.id} title={model.name} badge={model.category} onClick={() => setSelectedModel(model)}>
                      <div className="model-card-metrics">
                        <div>
                          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>CONFIDENCE</div>
                          <div style={{ fontSize: '20px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--blue-bright)' }}>{model.confidence}%</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>LATENCY</div>
                          <div style={{ fontSize: '20px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-bright)' }}>{model.latency}ms</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>THROUGHPUT</div>
                          <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-silver)', marginTop: '4px' }}>{model.throughput}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <MiniSparkline data={model.sparkline} color="#3FA9FF" />
                        </div>
                      </div>
                      <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '12px' }}>{model.description}</p>
                    </InteractivePanel>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'intelligence' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h2 className="workspace-title">SYSTEM INTELLIGENCE SIGNALS</h2>
                  <p className="workspace-subtitle">Surfaced real-time anomalies, patterns, and insights</p>
                </div>

                <div className="signals-stack">
                  {INTELLIGENCE_SIGNALS.map((sig) => (
                    <InteractivePanel key={sig.id} title={sig.title} badge={sig.impact}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--blue-electric)', fontWeight: 600 }}>{sig.category}</span>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{sig.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-silver)', lineHeight: '1.5', marginBottom: '12px' }}>{sig.description}</p>
                      <div className="signal-meta-row">
                        <span>SOURCE: {sig.source}</span>
                        <span>CONFIDENCE: {sig.confidence}%</span>
                      </div>
                    </InteractivePanel>
                  ))}
                </div>
              </motion.div>
            )}

            {['analytics', 'dataflow', 'activity', 'system'].includes(activeTab) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InteractivePanel title={`${activeTab.toUpperCase()} ENVIRONMENT`}>
                  <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                    <BarChart2 className="icon-lg text-electric" style={{ margin: '0 auto 12px auto', display: 'block', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ fontSize: '14px', color: 'var(--text-bright)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                      {activeTab.toUpperCase()} SUBSYSTEM ENGAGED
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Stream processing & telemetry recording actively synchronized with NEXUS kernel.
                    </p>
                  </div>
                </InteractivePanel>
              </motion.div>
            )}
          </main>

          {/* Right Activity Sidebar */}
          <aside className="app-aside">
            <InteractivePanel title="LIVE ACTIVITY STREAM" badge="REAL-TIME">
              <div className="activity-feed-list">
                {ACTIVITY_LOGS.map((log) => (
                  <div key={log.id} className="activity-feed-item">
                    <div className="activity-feed-header">
                      <span className="text-electric" style={{ textTransform: 'uppercase' }}>{log.source}</span>
                      <span>{log.time}</span>
                    </div>
                    <p style={{ color: 'var(--text-silver)' }}>{log.text}</p>
                  </div>
                ))}
              </div>
            </InteractivePanel>

            <InteractivePanel title="KERNEL TELEMETRY">
              <div className="telemetry-stack">
                <div className="telemetry-row">
                  <span className="text-muted">SYSTEM LOAD</span>
                  <span style={{ color: 'var(--text-bright)', fontWeight: 700 }}>{liveMetrics.load}%</span>
                </div>
                <div className="telemetry-progress-bg">
                  <div className="telemetry-progress-fill" style={{ width: `${liveMetrics.load}%` }} />
                </div>

                <div className="telemetry-row" style={{ paddingTop: '8px' }}>
                  <span className="text-muted">MEMORY BUFFER</span>
                  <span style={{ color: 'var(--text-bright)', fontWeight: 700 }}>14.2 / 32 GB</span>
                </div>

                <div className="telemetry-row" style={{ paddingTop: '8px' }}>
                  <span className="text-muted">UPTIME</span>
                  <span className="text-operational" style={{ fontWeight: 700 }}>99.98%</span>
                </div>
              </div>
            </InteractivePanel>
          </aside>
        </div>

        <InferencePipelineModal
          isOpen={analysisModalOpen}
          onClose={() => setAnalysisModalOpen(false)}
        />

        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
          onSelectTab={(tab) => setActiveTab(tab)}
          onRunAnalysis={() => {
            setCommandOpen(false);
            setAnalysisModalOpen(true);
          }}
        />
      </div>
    </div>
  );
}