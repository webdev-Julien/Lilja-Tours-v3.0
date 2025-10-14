# Responsive Video Files for Private Day Tours Index Page

This folder should contain responsive video files that load based on screen size to optimize performance and user experience.

## Required Video Files

### 1. Desktop HD Video (1024px and above)
**Filenames:**
- `tours-bg-hd.mp4`
- `tours-bg-hd.webm`

**Recommended Specifications:**
- **Resolution:** 1920x1080 (Full HD) or higher
- **Aspect Ratio:** 16:9 (landscape)
- **Bitrate:** 5-8 Mbps
- **Quality:** High quality for large screens
- **Format:** MP4 (H.264) and WebM (VP9)

### 2. Tablet Medium Video (768px to 1023px)
**Filenames:**
- `tours-bg-medium.mp4`
- `tours-bg-medium.webm`

**Recommended Specifications:**
- **Resolution:** 1280x720 (HD) or 1366x768
- **Aspect Ratio:** 16:9 (landscape)
- **Bitrate:** 3-5 Mbps
- **Quality:** Medium quality for tablets
- **Format:** MP4 (H.264) and WebM (VP9)

### 3. Mobile Vertical Video (0px to 767px)
**Filenames:**
- `tours-bg-mobile.mp4`
- `tours-bg-mobile.webm`

**Recommended Specifications:**
- **Resolution:** 720x1280 or 1080x1920 (vertical)
- **Aspect Ratio:** 9:16 (portrait/vertical)
- **Bitrate:** 2-3 Mbps
- **Quality:** Lower quality, optimized for mobile data
- **Format:** MP4 (H.264) and WebM (VP9)

## How It Works

The page uses CSS media queries with Tailwind classes to show/hide videos:

- **Desktop (lg:block):** Shows only on screens ≥1024px
- **Tablet (md:block lg:hidden):** Shows only on screens 768px-1023px
- **Mobile (block md:hidden):** Shows only on screens <768px

## Video Encoding Tips

### Using FFmpeg for Encoding:

#### Desktop HD (MP4):
```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -b:v 6M -c:a aac -b:a 128k -movflags +faststart tours-bg-hd.mp4
```

#### Desktop HD (WebM):
```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libvpx-vp9 -b:v 6M -c:a libopus -b:a 128k tours-bg-hd.webm
```

#### Tablet Medium (MP4):
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -b:v 4M -c:a aac -b:a 96k -movflags +faststart tours-bg-medium.mp4
```

#### Tablet Medium (WebM):
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libvpx-vp9 -b:v 4M -c:a libopus -b:a 96k tours-bg-medium.webm
```

#### Mobile Vertical (MP4):
```bash
ffmpeg -i input-vertical.mp4 -vf scale=1080:1920 -c:v libx264 -b:v 2.5M -c:a aac -b:a 64k -movflags +faststart tours-bg-mobile.mp4
```

#### Mobile Vertical (WebM):
```bash
ffmpeg -i input-vertical.mp4 -vf scale=1080:1920 -c:v libvpx-vp9 -b:v 2.5M -c:a libopus -b:a 64k tours-bg-mobile.webm
```

## Important Notes

1. **Fallback:** Each video element has both MP4 and WebM sources for maximum browser compatibility
2. **Vertical Video:** Mobile video should be filmed/cropped to vertical (9:16) orientation
3. **File Size:** Keep mobile videos as small as possible (aim for <10MB)
4. **Autoplay:** All videos are set to autoplay, muted, and loop
5. **Performance:** Only one video loads at a time based on screen size

## Testing

Test on different devices:
- **Desktop:** Check HD video loads (1920x1080 landscape)
- **Tablet:** Check medium video loads (1280x720 landscape)
- **Mobile:** Check vertical video loads (1080x1920 portrait)

Use browser DevTools responsive mode to test breakpoints:
- 375px width (mobile)
- 768px width (tablet)
- 1024px width (desktop)
- 1920px width (large desktop)

## Browser Compatibility

- **MP4:** Supported by all modern browsers (Chrome, Firefox, Safari, Edge)
- **WebM:** Better compression, supported by Chrome, Firefox, Edge (Safari uses MP4 fallback)

The browser will automatically choose the first supported format from each video element.
