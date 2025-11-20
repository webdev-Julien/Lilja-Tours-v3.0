// Progressive Enhancement Video Player for optimal FCP/LCP
(function() {
  let videoPlayer;
  let userHasInteracted = false;
  let videosLoaded = false;

  class LiljaToursVideoPlayer {
    constructor() {
      this.videos = [];
      this.currentVideoIndex = 0;
      this.isInitialized = false;
      this.progressFill = null;
      this.loadingText = null;
      this.fallbackImage = null;
      this.heroImage = null;
      this.qualityIndicator = null;
      this.currentQuality = 'auto';
      this.intersectionObserver = null;

      // Start with immediate setup for better FCP
      this.initImmediate();
    }

    initImmediate() {
      // Get hero image immediately for FCP
      this.heroImage = document.querySelector('.hero-image');

      // Set up intersection observer for lazy loading
      this.setupIntersectionObserver();

      // Defer video initialization until after page load
      if (document.readyState === 'complete') {
        setTimeout(() => this.initVideos(), 100);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => this.initVideos(), 100);
        });
      }

      // Set up user interaction detection
      this.setupUserInteractionDetection();
    }

    setupIntersectionObserver() {
      // Only start loading videos when header is in view
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !videosLoaded) {
            console.log('Header in view, preparing videos...');
            this.preloadVideosLazy();
          }
        });
      }, { threshold: 0.1 });

      const heroHeader = document.querySelector('header');
      if (heroHeader) {
        this.intersectionObserver.observe(heroHeader);
      }
    }

    setupUserInteractionDetection() {
      const events = ['click', 'scroll', 'keydown', 'touchstart', 'mousemove'];
      const handleFirstInteraction = () => {
        if (userHasInteracted) return;

        userHasInteracted = true;
        console.log('User interaction detected, enabling video enhancement');

        if (this.loadingText) {
          this.loadingText.style.display = 'none';
        }

        if (videosLoaded && !this.isInitialized) {
          this.enhanceWithVideos();
        }

        events.forEach(event => {
          document.removeEventListener(event, handleFirstInteraction);
        });
      };

      events.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, { passive: true });
      });

      const heroHeader = document.querySelector('header');
      if (heroHeader) {
        heroHeader.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
      }
    }

    async initVideos() {
      console.log('Initializing video system (progressive enhancement)...');

      this.videos = Array.from(document.querySelectorAll('video[data-video-index]'));
      this.progressFill = document.getElementById('progressFill');
      this.loadingText = document.getElementById('loadingText');
      this.fallbackImage = document.querySelector('img[alt="Iceland landscape"]');
      this.qualityIndicator = document.getElementById('qualityIndicator');

      console.log('Found', this.videos.length, 'video elements');

      if (this.videos.length === 0) {
        console.log('No video elements found, staying with image');
        return;
      }

      this.detectVideoQuality();
    }

    async preloadVideosLazy() {
      if (videosLoaded) return;

      console.log('Starting lazy video preload...');
      videosLoaded = true;

      this.videos.forEach((video, index) => {
        this.addVideoSources(video);

        if (index === 0) {
          video.preload = 'metadata';
          video.load();
        }
      });

      if (userHasInteracted) {
        setTimeout(() => this.enhanceWithVideos(), 500);
      } else {
        setTimeout(() => this.tryAutoStart(), 1000);
      }
    }

    async tryAutoStart() {
      if (this.isInitialized || userHasInteracted) return;

      console.log('Attempting autostart without user interaction...');

      try {
        const firstVideo = this.videos[0];
        if (firstVideo) {
          firstVideo.muted = true;
          await firstVideo.play();
          console.log('Autostart successful, enhancing with videos');
          this.enhanceWithVideos();
        }
      } catch (error) {
        console.log('Autostart failed, waiting for user interaction:', error);
        if (this.loadingText) {
          this.loadingText.textContent = 'Click to start videos';
          this.loadingText.style.opacity = '0.6';
        }
      }
    }

    addVideoSources(video) {
      if (video.children.length > 0) {
        video.load();
        return;
      }
      console.warn('No video sources found in HTML, video may not play properly');
    }

    async enhanceWithVideos() {
      if (this.isInitialized) return;

      console.log('Enhancing with video playback...');

      if (this.loadingText) {
        this.loadingText.style.display = 'block';
        this.loadingText.textContent = 'Starting videos...';
        this.loadingText.style.opacity = '0.8';
      }

      try {
        const firstVideo = this.videos[0];
        if (firstVideo) {
          firstVideo.muted = true;
          firstVideo.loop = false;

          await this.waitForVideoReady(firstVideo);
          await firstVideo.play();
          console.log('Video enhancement successful');

          this.transitionToVideo();
          this.setupEventListeners();
          this.preloadOtherVideos();

          this.isInitialized = true;

          if (this.loadingText) {
            this.loadingText.style.transition = 'opacity 0.5s ease-out';
            this.loadingText.style.opacity = '0';
            setTimeout(() => {
              this.loadingText.style.display = 'none';
            }, 500);
          }

          if (this.progressFill) {
            this.progressFill.parentElement.style.display = 'block';
          }
          if (this.qualityIndicator) {
            this.qualityIndicator.style.display = 'block';
          }
        }
      } catch (error) {
        console.warn('Video enhancement failed, staying with image:', error);
        if (this.loadingText) {
          this.loadingText.textContent = 'Click to start videos';
          this.loadingText.style.opacity = '0.6';
        }
      }
    }

    waitForVideoReady(video) {
      return new Promise((resolve, reject) => {
        if (video.readyState >= 3) {
          resolve();
        } else {
          const onReady = () => {
            video.removeEventListener('canplay', onReady);
            video.removeEventListener('error', onError);
            resolve();
          };

          const onError = (e) => {
            video.removeEventListener('canplay', onReady);
            video.removeEventListener('error', onError);
            reject(e);
          };

          video.addEventListener('canplay', onReady);
          video.addEventListener('error', onError);

          setTimeout(() => {
            video.removeEventListener('canplay', onReady);
            video.removeEventListener('error', onError);
            reject(new Error('Video load timeout'));
          }, 5000);
        }
      });
    }

    transitionToVideo() {
      if (this.heroImage) {
        this.heroImage.style.transition = 'opacity 0.5s ease-out';
        this.heroImage.style.opacity = '0';

        setTimeout(() => {
          this.heroImage.style.display = 'none';
        }, 500);
      }
    }

    detectVideoQuality() {
      const screenWidth = window.innerWidth;
      let expectedQuality = 'medium';

      if (screenWidth >= 1920) {
        expectedQuality = 'hd';
      } else if (screenWidth >= 768) {
        expectedQuality = 'medium';
      } else {
        expectedQuality = 'mobile';
      }

      this.currentQuality = expectedQuality;
      this.updateQualityIndicator();

      console.log(`Screen width: ${screenWidth}px, Expected quality: ${expectedQuality}`);
    }

    updateQualityIndicator() {
      if (this.qualityIndicator) {
        const qualityDisplay = document.getElementById('currentQuality');
        if (qualityDisplay) {
          qualityDisplay.textContent = this.currentQuality.toUpperCase();
        }
      }
    }

    preloadOtherVideos() {
      const preloadNext = (index) => {
        if (index >= this.videos.length) return;

        const video = this.videos[index];
        if (video) {
          video.muted = true;
          video.preload = 'auto';
          video.load();

          const waitForReady = () => {
            if (video.readyState >= 2) {
              console.log(`Video ${index + 1} preloaded successfully`);
              if (window.requestIdleCallback) {
                requestIdleCallback(() => preloadNext(index + 1));
              } else {
                setTimeout(() => preloadNext(index + 1), 200);
              }
            } else {
              setTimeout(waitForReady, 100);
            }
          };

          video.addEventListener('canplay', () => {
            console.log(`Video ${index + 1} can play`);
            waitForReady();
          }, { once: true });

          video.addEventListener('error', (e) => {
            console.warn(`Video ${index + 1} failed to load:`, e);
            setTimeout(() => preloadNext(index + 1), 100);
          }, { once: true });

          setTimeout(waitForReady, 500);
        }
      };

      preloadNext(1);
    }

    setupEventListeners() {
      this.videos.forEach((video, index) => {
        video.addEventListener('ended', () => {
          console.log('Video', index + 1, 'ended, playing next');
          this.playNextVideo();
        });

        video.addEventListener('timeupdate', () => {
          if (video.classList.contains('opacity-100')) {
            this.updateProgressBar(video);
          }
        });

        video.addEventListener('error', (e) => {
          console.warn('Video error:', e);
          if (video.classList.contains('opacity-100')) {
            this.playNextVideo();
          }
        });

        video.addEventListener('loadstart', () => {
          const currentSrc = video.currentSrc;
          const quality = this.getQualityFromSrc(currentSrc);
          console.log(`Video ${index + 1} loading: ${quality} quality`);
        });
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pause();
        } else if (this.isInitialized) {
          this.resume();
        }
      });
    }

    getQualityFromSrc(src) {
      if (src.includes('/HD/')) return 'HD';
      if (src.includes('/MD/')) return 'Medium';
      if (src.includes('/SD/')) return 'Mobile';
      return 'Unknown';
    }

    playNextVideo() {
      this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
      this.playCurrentVideo();
    }

    playCurrentVideo() {
      const currentVideo = this.videos[this.currentVideoIndex];

      if (!currentVideo) return;

      console.log('Playing video', this.currentVideoIndex + 1, 'of', this.videos.length);

      this.videos.forEach(video => {
        video.classList.remove('opacity-100');
        video.classList.add('opacity-0');
        if (!video.paused) {
          video.pause();
        }
      });

      currentVideo.classList.remove('opacity-0');
      currentVideo.classList.add('opacity-100');
      currentVideo.currentTime = 0;

      if (this.loadingText) {
        this.loadingText.style.display = 'block';
        this.loadingText.textContent = `Loading video ${this.currentVideoIndex + 1}...`;
        this.loadingText.style.opacity = '0.8';
      }

      const attemptPlay = async () => {
        try {
          currentVideo.muted = true;

          if (currentVideo.readyState < 2) {
            console.log(`Video ${this.currentVideoIndex + 1} not ready, forcing load...`);
            currentVideo.preload = 'auto';
            currentVideo.load();

            await new Promise((resolve, reject) => {
              let timeoutId;

              const onCanPlay = () => {
                clearTimeout(timeoutId);
                currentVideo.removeEventListener('canplay', onCanPlay);
                currentVideo.removeEventListener('error', onError);
                resolve();
              };

              const onError = (e) => {
                clearTimeout(timeoutId);
                currentVideo.removeEventListener('canplay', onCanPlay);
                currentVideo.removeEventListener('error', onError);
                reject(e);
              };

              currentVideo.addEventListener('canplay', onCanPlay);
              currentVideo.addEventListener('error', onError);

              timeoutId = setTimeout(() => {
                currentVideo.removeEventListener('canplay', onCanPlay);
                currentVideo.removeEventListener('error', onError);
                reject(new Error(`Video ${this.currentVideoIndex + 1} load timeout`));
              }, 8000);
            });
          }

          if (this.loadingText) {
            this.loadingText.style.transition = 'opacity 0.3s ease-out';
            this.loadingText.style.opacity = '0';
            setTimeout(() => {
              this.loadingText.style.display = 'none';
            }, 300);
          }

          await currentVideo.play();
          console.log(`Video ${this.currentVideoIndex + 1} playing successfully`);

        } catch (error) {
          console.warn(`Failed to play video ${this.currentVideoIndex + 1}:`, error);

          if (this.loadingText) {
            this.loadingText.style.display = 'none';
          }

          setTimeout(() => {
            console.log(`Skipping to next video due to error`);
            this.playNextVideo();
          }, 1000);
        }
      };

      attemptPlay();
    }

    updateProgressBar(video) {
      if (video.duration > 0 && this.progressFill) {
        const progress = (video.currentTime / video.duration) * 100;
        const totalProgress = ((this.currentVideoIndex * 100) + progress) / this.videos.length;
        this.progressFill.style.width = totalProgress + '%';
      }
    }

    pause() {
      if (this.isInitialized && this.videos[this.currentVideoIndex] && !this.videos[this.currentVideoIndex].paused) {
        this.videos[this.currentVideoIndex].pause();
      }
    }

    resume() {
      if (this.isInitialized && this.videos[this.currentVideoIndex] && this.videos[this.currentVideoIndex].paused) {
        this.videos[this.currentVideoIndex].play().catch(error => {
          console.warn('Resume play failed:', error);
        });
      }
    }

    getCurrentVideoInfo() {
      if (!this.isInitialized) {
        return { status: 'Image mode - videos not yet enhanced' };
      }

      const video = this.videos[this.currentVideoIndex];
      if (video) {
        return {
          mode: 'Video enhanced',
          index: this.currentVideoIndex + 1,
          total: this.videos.length,
          quality: this.getQualityFromSrc(video.currentSrc),
          userInteracted: userHasInteracted,
          videosLoaded: videosLoaded
        };
      }
      return null;
    }
  }

  // Initialize immediately for progressive enhancement
  videoPlayer = new LiljaToursVideoPlayer();

  // Make accessible globally for debugging
  window.liljaVideoPlayer = videoPlayer;

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!videoPlayer || !videoPlayer.isInitialized) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.key) {
      case ' ':
        e.preventDefault();
        if (videoPlayer.videos[videoPlayer.currentVideoIndex]?.paused) {
          videoPlayer.resume();
        } else {
          videoPlayer.pause();
        }
        break;
      case 'i':
      case 'I':
        console.log('Player info:', videoPlayer.getCurrentVideoInfo());
        break;
    }
  });

})();
