/**
 * Creative Gradient Theme - Monitoring and Maintenance Utilities
 *
 * This module provides comprehensive monitoring, debugging, and maintenance
 * tools for the Creative Gradient theme implementation.
 */

// Theme Monitor Class
export class ThemeMonitor {
  constructor() {
    this.alerts = []
    this.metrics = {
      fps: 0,
      memory: 0,
      lcp: 0,
      fid: 0,
      cls: 0,
    }
    this.thresholds = {
      fps: 30,
      memory: 50 * 1024 * 1024, // 50MB
      lcp: 2500, // 2.5s
      fid: 100, // 100ms
      cls: 0.1,
    }
    this.isMonitoring = false
    this.observers = []
  }

  // Start comprehensive monitoring
  startMonitoring() {
    if (this.isMonitoring) return

    this.isMonitoring = true
    console.log('🔍 Starting Creative Gradient theme monitoring...')

    this.monitorPerformance()
    this.monitorAccessibility()
    this.monitorErrors()
    this.monitorMemory()
    this.createDebugPanel()

    console.log('✅ Theme monitoring active')
  }

  // Stop monitoring
  stopMonitoring() {
    this.isMonitoring = false
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    console.log('🛑 Theme monitoring stopped')
  }

  // Monitor performance metrics
  monitorPerformance() {
    // FPS Monitoring
    let frameCount = 0
    let lastTime = performance.now()

    const checkFPS = () => {
      if (!this.isMonitoring) return

      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        this.metrics.fps = fps

        if (fps < this.thresholds.fps) {
          this.alert('Low FPS detected', { fps, threshold: this.thresholds.fps })
        }

        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(checkFPS)
    }

    requestAnimationFrame(checkFPS)

    // Core Web Vitals Monitoring
    this.monitorCoreWebVitals()
  }

  // Monitor Core Web Vitals
  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        this.metrics.lcp = entry.startTime
        if (entry.startTime > this.thresholds.lcp) {
          this.alert('LCP exceeds target', {
            lcp: entry.startTime,
            threshold: this.thresholds.lcp,
          })
        }
      }
    })

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    this.observers.push(lcpObserver)

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime
        this.metrics.fid = fid
        if (fid > this.thresholds.fid) {
          this.alert('FID exceeds target', {
            fid,
            threshold: this.thresholds.fid,
          })
        }
      }
    })

    fidObserver.observe({ entryTypes: ['first-input'] })
    this.observers.push(fidObserver)

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      this.metrics.cls = clsValue
      if (clsValue > this.thresholds.cls) {
        this.alert('CLS exceeds target', {
          cls: clsValue,
          threshold: this.thresholds.cls,
        })
      }
    })

    clsObserver.observe({ entryTypes: ['layout-shift'] })
    this.observers.push(clsObserver)
  }

  // Monitor memory usage
  monitorMemory() {
    const checkMemory = () => {
      if (!this.isMonitoring) return

      if ('memory' in performance) {
        const memory = performance.memory
        this.metrics.memory = memory.usedJSHeapSize

        if (memory.usedJSHeapSize > this.thresholds.memory) {
          this.alert('High memory usage detected', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            threshold: Math.round(this.thresholds.memory / 1048576) + ' MB',
          })
        }

        // Check for potential memory leaks
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
          this.alert('Potential memory leak detected', {
            usage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100) + '%',
          })
          document.documentElement.classList.add('memory-leak-detected')
        }
      }

      setTimeout(checkMemory, 5000) // Check every 5 seconds
    }

    checkMemory()
  }

  // Monitor accessibility issues
  monitorAccessibility() {
    const checkA11y = () => {
      if (!this.isMonitoring) return

      // Check for missing focus indicators
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      focusableElements.forEach(element => {
        const styles = getComputedStyle(element)
        const hasVisibleFocus =
          styles.outline !== 'none' ||
          styles.boxShadow !== 'none' ||
          element.classList.contains('glass-focusable')

        if (!hasVisibleFocus) {
          this.alert('Missing focus indicator', {
            element: element.tagName,
            className: element.className,
          })
        }
      })

      // Check for proper ARIA attributes
      const glassCards = document.querySelectorAll('.glass-card')
      glassCards.forEach(card => {
        if (!card.hasAttribute('role') && !card.hasAttribute('aria-label')) {
          this.alert('Missing ARIA attributes', {
            element: 'glass-card',
            suggestion: 'Add role or aria-label',
          })
        }
      })

      setTimeout(checkA11y, 30000) // Check every 30 seconds
    }

    checkA11y()
  }

  // Monitor for theme-related errors
  monitorErrors() {
    window.addEventListener('error', event => {
      if (
        event.error &&
        (event.error.message.includes('theme') ||
          event.error.message.includes('glass') ||
          event.error.message.includes('creative-gradient'))
      ) {
        this.alert('Theme-related error', {
          message: event.error.message,
          filename: event.filename,
          lineno: event.lineno,
          stack: event.error.stack,
        })
      }
    })

    // Monitor for CSS loading errors
    window.addEventListener(
      'error',
      event => {
        if (
          event.target &&
          event.target.tagName === 'LINK' &&
          event.target.href.includes('creative-gradient')
        ) {
          this.alert('Theme CSS failed to load', {
            href: event.target.href,
          })
        }
      },
      true
    )
  }

  // Create alert
  alert(message, data = {}) {
    const alert = {
      timestamp: new Date().toISOString(),
      message,
      data,
      severity: this.getSeverity(message),
    }

    this.alerts.push(alert)
    console.warn('🚨 Theme Alert:', alert)

    // Update UI indicators
    this.updateHealthStatus(alert.severity)

    // Send to monitoring service if available
    this.sendAlert(alert)

    return alert
  }

  // Determine alert severity
  getSeverity(message) {
    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes('error') ||
      lowerMessage.includes('critical') ||
      lowerMessage.includes('failed')
    ) {
      return 'high'
    } else if (
      lowerMessage.includes('performance') ||
      lowerMessage.includes('memory') ||
      lowerMessage.includes('accessibility')
    ) {
      return 'medium'
    }
    return 'low'
  }

  // Update health status indicator
  updateHealthStatus(severity) {
    const statusElement = document.querySelector('.theme-health-status')
    if (!statusElement) return

    document.documentElement.classList.remove('theme-health-warning', 'theme-health-error')

    if (severity === 'high') {
      document.documentElement.classList.add('theme-health-error')
      statusElement.textContent = '!'
    } else if (severity === 'medium') {
      document.documentElement.classList.add('theme-health-warning')
      statusElement.textContent = '⚠'
    } else {
      statusElement.textContent = '✓'
    }
  }

  // Send alert to monitoring service
  sendAlert(alert) {
    if (typeof fetch !== 'undefined') {
      fetch('/api/theme-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      }).catch(error => {
        console.error('Failed to send alert to monitoring service:', error)
      })
    }
  }

  // Create debug panel
  createDebugPanel() {
    if (document.querySelector('.debug-panel')) return

    const panel = document.createElement('div')
    panel.className = 'debug-panel'
    panel.innerHTML = `
      <h4>Theme Debug Panel</h4>
      <div>Theme: <span id="current-theme">--</span></div>
      <div>Glass Support: <span id="glass-support">--</span></div>
      <div>Performance Mode: <span id="performance-mode">--</span></div>
      <div>Animation Settings: <span id="animation-settings">--</span></div>
      <div>
        <button onclick="themeDebugger.toggleDebugMode()">Debug Mode</button>
        <button onclick="themeDebugger.togglePerformanceMode()">Performance</button>
        <button onclick="themeDebugger.toggleA11yMode()">A11Y Audit</button>
      </div>
      <div>
        <button onclick="themeDebugger.runDiagnostics()">Diagnostics</button>
        <button onclick="themeDebugger.exportLogs()">Export Logs</button>
        <button onclick="themeDebugger.clearAlerts()">Clear Alerts</button>
      </div>
    `

    document.body.appendChild(panel)

    // Create performance metrics panel
    const metricsPanel = document.createElement('div')
    metricsPanel.className = 'performance-metrics'
    metricsPanel.innerHTML = `
      <h4>Performance Metrics</h4>
      <div><span class="metric-label">FPS:</span> <span id="fps-counter" class="metric-value">--</span></div>
      <div><span class="metric-label">LCP:</span> <span id="lcp-value" class="metric-value">--</span>ms</div>
      <div><span class="metric-label">FID:</span> <span id="fid-value" class="metric-value">--</span>ms</div>
      <div><span class="metric-label">CLS:</span> <span id="cls-value" class="metric-value">--</span></div>
      <div><span class="metric-label">Memory:</span> <span id="memory-usage" class="metric-value">--</span>MB</div>
    `

    document.body.appendChild(metricsPanel)

    // Create health status indicator
    const healthStatus = document.createElement('div')
    healthStatus.className = 'theme-health-status'
    healthStatus.textContent = '✓'
    healthStatus.title = 'Theme Health Status'
    document.body.appendChild(healthStatus)

    // Update panels regularly
    this.updateDebugPanels()
  }

  // Update debug panels
  updateDebugPanels() {
    const updatePanels = () => {
      if (!this.isMonitoring) return

      // Update debug panel
      const currentTheme = document.getElementById('current-theme')
      const glassSupport = document.getElementById('glass-support')
      const performanceMode = document.getElementById('performance-mode')
      const animationSettings = document.getElementById('animation-settings')

      if (currentTheme) {
        currentTheme.textContent = document.documentElement.getAttribute('data-theme') || 'none'
      }

      if (glassSupport) {
        glassSupport.textContent = CSS.supports('backdrop-filter', 'blur(10px)') ? 'Yes' : 'No'
      }

      if (performanceMode) {
        performanceMode.textContent = document.documentElement.classList.contains(
          'performance-mode'
        )
          ? 'On'
          : 'Off'
      }

      if (animationSettings) {
        animationSettings.textContent =
          document.documentElement.getAttribute('data-animations') || 'enabled'
      }

      // Update performance metrics
      const fpsCounter = document.getElementById('fps-counter')
      const lcpValue = document.getElementById('lcp-value')
      const fidValue = document.getElementById('fid-value')
      const clsValue = document.getElementById('cls-value')
      const memoryUsage = document.getElementById('memory-usage')

      if (fpsCounter) {
        fpsCounter.textContent = this.metrics.fps
        fpsCounter.className =
          this.metrics.fps < this.thresholds.fps ? 'metric-value metric-warning' : 'metric-value'
      }

      if (lcpValue) {
        lcpValue.textContent = Math.round(this.metrics.lcp)
        lcpValue.className =
          this.metrics.lcp > this.thresholds.lcp ? 'metric-value metric-warning' : 'metric-value'
      }

      if (fidValue) {
        fidValue.textContent = Math.round(this.metrics.fid)
        fidValue.className =
          this.metrics.fid > this.thresholds.fid ? 'metric-value metric-warning' : 'metric-value'
      }

      if (clsValue) {
        clsValue.textContent = this.metrics.cls.toFixed(3)
        clsValue.className =
          this.metrics.cls > this.thresholds.cls ? 'metric-value metric-warning' : 'metric-value'
      }

      if (memoryUsage) {
        const memoryMB = Math.round(this.metrics.memory / 1048576)
        memoryUsage.textContent = memoryMB
        memoryUsage.className =
          this.metrics.memory > this.thresholds.memory
            ? 'metric-value metric-warning'
            : 'metric-value'
      }

      setTimeout(updatePanels, 1000)
    }

    updatePanels()
  }

  // Get monitoring report
  getReport() {
    return {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      thresholds: this.thresholds,
      alerts: this.alerts,
      themeInfo: {
        active: document.documentElement.getAttribute('data-theme'),
        glassSupport: CSS.supports('backdrop-filter', 'blur(10px)'),
        gridSupport: CSS.supports('display', 'grid'),
        performanceMode: document.documentElement.classList.contains('performance-mode'),
        debugMode: document.documentElement.classList.contains('debug-mode'),
      },
    }
  }
}

// Theme Debugger Utilities
export class ThemeDebugger {
  constructor() {
    this.diagnostics = []
  }

  // Toggle debug mode
  toggleDebugMode() {
    document.documentElement.classList.toggle('debug-mode')
    console.log(
      '🔧 Debug mode:',
      document.documentElement.classList.contains('debug-mode') ? 'ON' : 'OFF'
    )
  }

  // Toggle performance testing mode
  togglePerformanceMode() {
    document.documentElement.classList.toggle('performance-testing-mode')
    console.log(
      '⚡ Performance testing mode:',
      document.documentElement.classList.contains('performance-testing-mode') ? 'ON' : 'OFF'
    )
  }

  // Toggle accessibility audit mode
  toggleA11yMode() {
    document.documentElement.classList.toggle('accessibility-audit-mode')
    console.log(
      '♿ Accessibility audit mode:',
      document.documentElement.classList.contains('accessibility-audit-mode') ? 'ON' : 'OFF'
    )
  }

  // Toggle visual testing mode
  toggleVisualTestingMode() {
    document.documentElement.classList.toggle('visual-testing-mode')
    console.log(
      '👁️ Visual testing mode:',
      document.documentElement.classList.contains('visual-testing-mode') ? 'ON' : 'OFF'
    )
  }

  // Run comprehensive diagnostics
  runDiagnostics() {
    console.log('🔍 Running theme diagnostics...')

    this.diagnostics = []

    this.diagnoseGlassEffects()
    this.diagnosePerformance()
    this.diagnoseTextContrast()
    this.diagnoseAccessibility()
    this.diagnoseBrowserCompatibility()

    console.log('✅ Diagnostics complete')
    console.table(this.diagnostics)

    return this.diagnostics
  }

  // Diagnose glass effects
  diagnoseGlassEffects() {
    const result = {
      test: 'Glass Effects',
      status: 'PASS',
      details: {},
    }

    // Check backdrop-filter support
    result.details.backdropFilterSupport = CSS.supports('backdrop-filter', 'blur(10px)')
    result.details.webkitBackdropFilterSupport = CSS.supports(
      '-webkit-backdrop-filter',
      'blur(10px)'
    )

    // Check theme activation
    result.details.themeActive =
      document.documentElement.getAttribute('data-theme') === 'creative-gradient'

    // Check CSS variables
    const styles = getComputedStyle(document.documentElement)
    result.details.glassMedium = styles.getPropertyValue('--glass-medium')
    result.details.glassBlur = styles.getPropertyValue('--glass-blur-medium')

    // Check glass elements
    const glassElements = document.querySelectorAll('.glass-card')
    result.details.glassElementsCount = glassElements.length

    if (!result.details.backdropFilterSupport && !result.details.webkitBackdropFilterSupport) {
      result.status = 'WARNING'
      result.message = 'Backdrop filter not supported - using fallback styles'
    }

    if (!result.details.themeActive) {
      result.status = 'FAIL'
      result.message = 'Creative Gradient theme not active'
    }

    this.diagnostics.push(result)
  }

  // Diagnose performance
  diagnosePerformance() {
    const result = {
      test: 'Performance',
      status: 'PASS',
      details: {},
    }

    // Check element counts
    result.details.glassElements = document.querySelectorAll('[class*="glass-"]').length
    result.details.animatedElements = document.querySelectorAll(
      '[class*="animated"], [class*="pulse"], [class*="floating"]'
    ).length

    // Check device capabilities
    result.details.devicePixelRatio = window.devicePixelRatio
    result.details.hardwareConcurrency = navigator.hardwareConcurrency
    result.details.connectionType = navigator.connection?.effectiveType

    // Check performance mode
    result.details.performanceMode = document.documentElement.classList.contains('performance-mode')

    // Memory check
    if ('memory' in performance) {
      const memory = performance.memory
      result.details.memoryUsage = Math.round(memory.usedJSHeapSize / 1048576) + ' MB'
      result.details.memoryLimit = Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'

      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
        result.status = 'WARNING'
        result.message = 'High memory usage detected'
      }
    }

    // Check for low-end device indicators
    const isLowEnd =
      navigator.hardwareConcurrency <= 2 ||
      navigator.connection?.effectiveType === '2g' ||
      window.innerWidth < 768

    if (isLowEnd && !result.details.performanceMode) {
      result.status = 'WARNING'
      result.message = 'Consider enabling performance mode for low-end device'
    }

    this.diagnostics.push(result)
  }

  // Diagnose text contrast
  diagnoseTextContrast() {
    const result = {
      test: 'Text Contrast',
      status: 'PASS',
      details: {},
    }

    const textElements = document.querySelectorAll(
      '.hero-name-centered, .hero-title-centered, .hero-description-centered'
    )

    textElements.forEach((element, index) => {
      const styles = getComputedStyle(element)
      result.details[`element_${index}`] = {
        className: element.className,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        textShadow: styles.textShadow,
      }
    })

    // Check high contrast mode
    result.details.highContrastMode =
      document.documentElement.classList.contains('high-contrast-mode')
    result.details.prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches

    this.diagnostics.push(result)
  }

  // Diagnose accessibility
  diagnoseAccessibility() {
    const result = {
      test: 'Accessibility',
      status: 'PASS',
      details: {},
    }

    // Check focusable elements
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    result.details.focusableElementsCount = focusableElements.length

    // Check for missing focus indicators
    let missingFocusIndicators = 0
    focusableElements.forEach(element => {
      const styles = getComputedStyle(element)
      const hasVisibleFocus =
        styles.outline !== 'none' ||
        styles.boxShadow !== 'none' ||
        element.classList.contains('glass-focusable')

      if (!hasVisibleFocus) {
        missingFocusIndicators++
      }
    })

    result.details.missingFocusIndicators = missingFocusIndicators

    // Check ARIA attributes
    const glassCards = document.querySelectorAll('.glass-card')
    let missingAriaAttributes = 0
    glassCards.forEach(card => {
      if (!card.hasAttribute('role') && !card.hasAttribute('aria-label')) {
        missingAriaAttributes++
      }
    })

    result.details.missingAriaAttributes = missingAriaAttributes

    // Check reduced motion preference
    result.details.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    result.details.reducedMotionMode = document.documentElement.classList.contains('reduced-motion')

    if (missingFocusIndicators > 0 || missingAriaAttributes > 0) {
      result.status = 'WARNING'
      result.message = `${missingFocusIndicators} missing focus indicators, ${missingAriaAttributes} missing ARIA attributes`
    }

    this.diagnostics.push(result)
  }

  // Diagnose browser compatibility
  diagnoseBrowserCompatibility() {
    const result = {
      test: 'Browser Compatibility',
      status: 'PASS',
      details: {},
    }

    // Feature detection
    result.details.backdropFilter = CSS.supports('backdrop-filter', 'blur(10px)')
    result.details.cssGrid = CSS.supports('display', 'grid')
    result.details.flexbox = CSS.supports('display', 'flex')
    result.details.customProperties = CSS.supports('color', 'var(--test)')

    // Browser detection
    const userAgent = navigator.userAgent
    result.details.userAgent = userAgent

    if (userAgent.includes('Firefox')) {
      result.details.browser = 'Firefox'
      if (!result.details.backdropFilter) {
        result.status = 'WARNING'
        result.message = 'Firefox fallback styles active'
      }
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      result.details.browser = 'Safari'
    } else if (userAgent.includes('Chrome')) {
      result.details.browser = 'Chrome'
    } else if (userAgent.includes('Edge')) {
      result.details.browser = 'Edge'
    }

    // Check for fallback mode activation
    result.details.fallbackMode =
      document.documentElement.classList.contains('browser-fallback-active')

    this.diagnostics.push(result)
  }

  // Export logs and diagnostics
  exportLogs() {
    const report = {
      timestamp: new Date().toISOString(),
      diagnostics: this.diagnostics,
      alerts: window.themeMonitor?.alerts || [],
      metrics: window.themeMonitor?.metrics || {},
      themeInfo: {
        version: getComputedStyle(document.documentElement).getPropertyValue('--theme-version'),
        buildDate: getComputedStyle(document.documentElement).getPropertyValue(
          '--theme-build-date'
        ),
        compatibility: getComputedStyle(document.documentElement).getPropertyValue(
          '--theme-compatibility'
        ),
      },
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `theme-diagnostics-${new Date().toISOString().slice(0, 19)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    console.log('📊 Diagnostics exported')
  }

  // Clear alerts
  clearAlerts() {
    if (window.themeMonitor) {
      window.themeMonitor.alerts = []
      console.log('🧹 Alerts cleared')
    }
  }
}

// Emergency Procedures
export class EmergencyProcedures {
  // Emergency theme rollback
  static emergencyRollback() {
    console.warn('🚨 Initiating emergency theme rollback')

    // Remove theme
    document.documentElement.removeAttribute('data-theme')

    // Remove theme CSS
    const themeLinks = document.querySelectorAll('link[href*="creative-gradient"]')
    themeLinks.forEach(link => link.remove())

    // Reset to safe defaults
    document.body.style.background = '#ffffff'
    document.body.style.color = '#000000'

    // Show notification
    this.showEmergencyNotification('Theme temporarily disabled due to technical issues')

    console.warn('🔄 Emergency rollback complete')
  }

  // Emergency performance mode
  static emergencyPerformanceMode() {
    console.warn('🚨 Activating emergency performance mode')

    // Disable all animations
    const style = document.createElement('style')
    style.id = 'emergency-performance-style'
    style.textContent = `
      * {
        animation: none !important;
        transition: none !important;
        transform: none !important;
      }
    `
    document.head.appendChild(style)

    // Remove glass effects
    document.documentElement.classList.add('emergency-mode')

    console.warn('⚡ Emergency performance mode active')
  }

  // Emergency accessibility mode
  static emergencyAccessibilityMode() {
    console.warn('🚨 Activating emergency accessibility mode')

    // High contrast mode
    document.documentElement.classList.add('emergency-high-contrast')

    // Remove problematic effects
    const style = document.createElement('style')
    style.id = 'emergency-accessibility-style'
    style.textContent = `
      .emergency-high-contrast * {
        background: white !important;
        color: black !important;
        border: 1px solid black !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
    `
    document.head.appendChild(style)

    console.warn('♿ Emergency accessibility mode active')
  }

  // Show emergency notification
  static showEmergencyNotification(message) {
    const notification = document.createElement('div')
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff0000;
      color: white;
      padding: 1rem 2rem;
      border-radius: 4px;
      z-index: 10000;
      font-family: monospace;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 10000)
  }
}

// Initialize global instances
let themeMonitor
let themeDebugger

// Auto-initialize in development
if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  themeMonitor = new ThemeMonitor()
  themeDebugger = new ThemeDebugger()

  // Make available globally for console access
  window.themeMonitor = themeMonitor
  window.themeDebugger = themeDebugger
  window.EmergencyProcedures = EmergencyProcedures

  // Auto-start monitoring
  themeMonitor.startMonitoring()

  console.log('🎨 Creative Gradient theme monitoring initialized')
  console.log('Available commands:')
  console.log('- themeMonitor.getReport()')
  console.log('- themeDebugger.runDiagnostics()')
  console.log('- themeDebugger.toggleDebugMode()')
  console.log('- EmergencyProcedures.emergencyRollback()')
}

// Export for manual initialization
export { themeMonitor, themeDebugger }
export default { ThemeMonitor, ThemeDebugger, EmergencyProcedures }
