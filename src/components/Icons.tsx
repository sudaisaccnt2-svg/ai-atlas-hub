import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 18, className = '' }) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'compass':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" />
        </svg>
      );
    case 'cpu':
      return (
        <svg {...props}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      );
    case 'target':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case 'sliders':
      return (
        <svg {...props}>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <circle cx="9" cy="6" r="2" />
          <circle cx="15" cy="12" r="2" />
          <circle cx="10" cy="18" r="2" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'vector':
      return (
        <svg {...props}>
          <path d="M4 20V5M4 20h15" />
          <path d="M4 20L17 7" />
          <polyline points="12 7 17 7 17 12" />
        </svg>
      );
    case 'database':
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      );
    case 'network':
      return (
        <svg {...props}>
          <circle cx="5" cy="7" r="2" />
          <circle cx="5" cy="17" r="2" />
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="19" cy="7" r="2" />
          <circle cx="19" cy="17" r="2" />
          <path d="M6.8 8l3.4 2.8M6.8 16l3.4-2.8M13.8 10.8L17.2 8M13.8 13.2l3.4 2.8" />
        </svg>
      );
    case 'pulse':
      return (
        <svg {...props}>
          <polyline points="2 12 6 12 9 4 14 20 17 12 22 12" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...props}>
          <polygon points="12 3 2 8 12 13 22 8 12 3" />
          <polyline points="2 12.5 12 17.5 22 12.5" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      );
    case 'message':
      return (
        <svg {...props}>
          <path d="M21 14a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="8.5" x2="16" y2="8.5" />
          <line x1="8" y1="12" x2="13" y2="12" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.2" y2="16.2" />
        </svg>
      );
    case 'branch':
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="8" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M6 8.5v7M8.5 6h5a4.5 4.5 0 0 1 4.5 4.5" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 2.5l8 3.5v6c0 5-3.4 8.6-8 9.8-4.6-1.2-8-4.8-8-9.8V6l8-3.5z" />
          <polyline points="9 12 11 14 15.5 9.5" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...props}>
          <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case 'eye-off':
      return (
        <svg {...props}>
          <path d="M17.9 17.9A10.1 10.1 0 0 1 12 18.5C5.6 18.5 2 12 2 12a18 18 0 0 1 4.6-5.3" />
          <path d="M9.9 5.7A9.8 9.8 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a18.4 18.4 0 0 1-2.2 3.1" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      );
    case 'film':
      return (
        <svg {...props}>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <polygon points="10 9 15.5 12 10 15 10 9" />
        </svg>
      );
    case 'wave':
      return (
        <svg {...props}>
          <path d="M3 12v0M7 8v8M11 4v16M15 9v6M19 6v12M22 12v0" />
        </svg>
      );
    case 'cube':
      return (
        <svg {...props}>
          <path d="M12 2.5L20.5 7v10L12 21.5 3.5 17V7L12 2.5z" />
          <polyline points="3.5 7 12 11.5 20.5 7" />
          <line x1="12" y1="11.5" x2="12" y2="21.5" />
        </svg>
      );
    case 'bot':
      return (
        <svg {...props}>
          <rect x="4" y="7" width="16" height="12" rx="2.5" />
          <line x1="12" y1="3" x2="12" y2="7" />
          <circle cx="9" cy="12.5" r="1.2" />
          <circle cx="15" cy="12.5" r="1.2" />
          <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
      );
    case 'scale':
      return (
        <svg {...props}>
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="5" y1="7" x2="19" y2="7" />
          <path d="M5 7l-2.5 6h5L5 7zM19 7l-2.5 6h5L19 7z" />
          <line x1="8" y1="21" x2="16" y2="21" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v19H6.5A2.5 2.5 0 0 1 4 18.5v-14z" />
          <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="4.5" y="11" width="15" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case 'unlock':
      return (
        <svg {...props}>
          <rect x="4.5" y="11" width="15" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 7.6-1.7" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <polyline points="4.5 12.5 9.5 17.5 19.5 6.5" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...props}>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="11 18 5 12 11 6" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...props}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      );
    case 'external':
      return (
        <svg {...props}>
          <path d="M14 4h6v6" />
          <line x1="10" y1="14" x2="20" y2="4" />
          <path d="M18 13v6a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5h6" />
        </svg>
      );
    case 'volume-on':
      return (
        <svg {...props}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18.8 5.5a9 9 0 0 1 0 13" />
        </svg>
      );
    case 'volume-off':
      return (
        <svg {...props}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...props}>
          <path d="M17.5 19H7a4.5 4.5 0 0 1-.8-8.9A6 6 0 0 1 18 11a3.8 3.8 0 0 1-.5 8z" />
        </svg>
      );
    case 'cloud-off':
      return (
        <svg {...props}>
          <path d="M22 16.5A4 4 0 0 0 18 11h-.4A6 6 0 0 0 8.2 7.5" />
          <path d="M4.6 9.8A4.5 4.5 0 0 0 7 19h10" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...props}>
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
        </svg>
      );
    case 'play':
      return (
        <svg {...props}>
          <polygon points="6 4 20 12 6 20 6 4" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...props}>
          <polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2" />
        </svg>
      );
    case 'shuffle':
      return (
        <svg {...props}>
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...props}>
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.5 15a9 9 0 1 1-2.1-9.3L23 10" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
  }
};
