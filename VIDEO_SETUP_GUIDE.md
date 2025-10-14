# Responsive Video Setup Guide

## Overview

The Private Day Tours index page (`/private-day-tours-iceland/`) now supports **responsive video loading** with different quality and orientation videos based on screen size.

## Visual Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│                    SCREEN SIZE RANGES                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📱 MOBILE (0-767px)     │  📲 TABLET (768-1023px)  │ 💻 DESKTOP (1024px+) │
│  ─────────────────       │  ──────────────────      │ ──────────────────   │
│  Vertical Video          │  Horizontal Video        │ Horizontal Video     │
│  Portrait 9:16           │  Landscape 16:9          │ Landscape 16:9       │
│  720x1280 or             │  1280x720                │ 1920x1080            │
│  1080x1920               │                          │                      │
│  Low Quality (2-3 Mbps)  │  Medium (3-5 Mbps)       │ High Quality (6-8)   │
│                          │                          │                      │
└─────────────────────────────────────────────────────────────┘
```

## Required Files

Place these files in `/public/videos/`:

### Desktop HD (1024px and above)
```
✓ tours-bg-hd.mp4       (1920x1080, 16:9, 6-8 Mbps)
✓ tours-bg-hd.webm      (1920x1080, 16:9, 6-8 Mbps)
```

### Tablet Medium (768px to 1023px)
```
✓ tours-bg-medium.mp4   (1280x720, 16:9, 3-5 Mbps)
✓ tours-bg-medium.webm  (1280x720, 16:9, 3-5 Mbps)
```

### Mobile Vertical (0px to 767px)
```
✓ tours-bg-mobile.mp4   (1080x1920, 9:16 VERTICAL, 2-3 Mbps)
✓ tours-bg-mobile.webm  (1080x1920, 9:16 VERTICAL, 2-3 Mbps)
```

## Key Differences

| Device  | Orientation | Resolution  | Aspect | Quality | File Size Target |
|---------|-------------|-------------|--------|---------|------------------|
| Desktop | Landscape   | 1920x1080   | 16:9   | High    | 20-40 MB         |
| Tablet  | Landscape   | 1280x720    | 16:9   | Medium  | 15-25 MB         |
| Mobile  | **VERTICAL**| 1080x1920   | **9:16**| Low    | 8-15 MB          |

## Important: Mobile Video is VERTICAL! 📱

The mobile video should be:
- **Portrait orientation** (vertical)
- **9:16 aspect ratio** (opposite of desktop's 16:9)
- Shot or cropped specifically for mobile screens
- Smaller file size for mobile data

## How to Create Videos

### Option 1: Using Online Tools
- **Clideo** (https://clideo.com)
- **Kapwing** (https://kapwing.com)
- Upload your video and export in the correct resolutions

### Option 2: Using FFmpeg (Command Line)

See `/public/videos/README.md` for detailed FFmpeg commands.

**Quick example for mobile vertical video:**
```bash
ffmpeg -i input.mp4 -vf "scale=1080:1920,crop=1080:1920" -c:v libx264 -b:v 2.5M tours-bg-mobile.mp4
```

### Option 3: Using Video Editing Software
- **Adobe Premiere Pro**
- **Final Cut Pro**
- **DaVinci Resolve** (free)

Export settings:
- Desktop: 1920x1080, H.264, 6 Mbps
- Tablet: 1280x720, H.264, 4 Mbps
- Mobile: 1080x1920 (VERTICAL), H.264, 2.5 Mbps

## Current File Structure

```
public/
└── videos/
    ├── tours-bg-hd.mp4        ← Desktop MP4 (create this)
    ├── tours-bg-hd.webm       ← Desktop WebM (create this)
    ├── tours-bg-medium.mp4    ← Tablet MP4 (create this)
    ├── tours-bg-medium.webm   ← Tablet WebM (create this)
    ├── tours-bg-mobile.mp4    ← Mobile MP4 VERTICAL (create this)
    ├── tours-bg-mobile.webm   ← Mobile WebM VERTICAL (create this)
    └── README.md              ← Technical documentation
```

## Testing Checklist

After adding the video files:

- [ ] Build the site: `npm run build`
- [ ] Test locally: `npm run preview`
- [ ] Open in browser: `http://localhost:4321/private-day-tours-iceland/`
- [ ] Test Desktop view (resize window >1024px) - should show HD landscape video
- [ ] Test Tablet view (resize to 768-1023px) - should show medium landscape video
- [ ] Test Mobile view (resize to <768px) - should show **vertical** video
- [ ] Open DevTools (F12) → Network tab → verify only ONE video loads
- [ ] Test on actual devices (phone, tablet, desktop)

## Performance Benefits

✅ **Faster load times** - Each device only downloads the appropriate video
✅ **Better mobile experience** - Vertical video fills mobile screens naturally
✅ **Reduced data usage** - Mobile users get smaller file sizes
✅ **SEO friendly** - Faster page loads improve rankings
✅ **Better UX** - Right video for each device type

## Troubleshooting

### Video not showing?
- Check file names match exactly (case-sensitive)
- Verify files are in `/public/videos/` folder
- Check browser console (F12) for errors
- Ensure videos are in MP4 and WebM formats

### Wrong video loading?
- Clear browser cache (Ctrl+Shift+R)
- Check DevTools responsive mode breakpoints
- Verify Tailwind classes: `hidden lg:block`, `hidden md:block lg:hidden`, `block md:hidden`

### Video file too large?
- Re-encode with lower bitrate
- Reduce resolution slightly
- Try WebM format (better compression than MP4)
- Use video compression tools

## Need Help?

Check the detailed technical documentation in `/public/videos/README.md` for FFmpeg commands and encoding settings.
