# COMPONENT RECOVERY GUIDE

## If Individual Components Are Missing

### 1. DollarBillIcon Component
```tsx
import React from 'react';

interface DollarBillIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const DollarBillIcon: React.FC<DollarBillIconProps> = ({ className, style }) => {
  return (
    <img 
      src="/dollar-bill.png" 
      alt="Dollar Bill" 
      className={className}
      style={style}
      draggable={false}
    />
  );
};
```

### 2. HealthIcon Component
```tsx
import React from 'react';

interface HealthIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const HealthIcon: React.FC<HealthIconProps> = ({ className, style }) => {
  return (
    <img 
      src="/standing.png" 
      alt="Health Icon" 
      className={className}
      style={style}
    />
  );
};
```

### 3. Security Utils Recovery
```tsx
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const generateSecureId = (): string => {
  if (crypto && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(sanitizedKey, serializedValue);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  getItem: (key: string): any => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const item = localStorage.getItem(sanitizedKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }
};

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(action: string, maxAttempts: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(action) || [];
    
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(action, validAttempts);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
```

## Quick Recovery Checklist

- [ ] App.tsx restored with all functionality
- [ ] index.css restored with all animations
- [ ] Security utils restored
- [ ] Component files restored
- [ ] All icons displaying correctly
- [ ] Bookmarks working
- [ ] Search functionality working
- [ ] Letter tracing effects working
- [ ] Burst animations working
- [ ] Touch/swipe gestures working
- [ ] Responsive design working

## Emergency Contact

If recovery fails, provide this exact message:
"CRITICAL: Goaly app recovery failed. Please regenerate the complete application from scratch with all features: letter tracing, bookmarks, search, animations, security, and responsive design."