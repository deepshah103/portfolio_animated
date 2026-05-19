interface ZoneVisit {
  zoneId: string;
  timestamp: number;
  duration: number;
}

class PortfolioAnalytics {
  private visits: ZoneVisit[] = [];
  private currentZone: string | null = null;
  private enterTime: number = 0;
  private sessionStart: number = Date.now();

  enterZone(zoneId: string) {
    if (this.currentZone === zoneId) return;
    this.leaveZone();
    this.currentZone = zoneId;
    this.enterTime = Date.now();
  }

  leaveZone() {
    if (this.currentZone && this.enterTime) {
      this.visits.push({
        zoneId: this.currentZone,
        timestamp: this.enterTime,
        duration: Date.now() - this.enterTime,
      });
    }
    this.currentZone = null;
    this.enterTime = 0;
  }

  getStats() {
    const zoneStats: Record<string, { visitCount: number; totalDuration: number }> = {};

    for (const visit of this.visits) {
      if (!zoneStats[visit.zoneId]) {
        zoneStats[visit.zoneId] = { visitCount: 0, totalDuration: 0 };
      }
      zoneStats[visit.zoneId].visitCount++;
      zoneStats[visit.zoneId].totalDuration += visit.duration;
    }

    return {
      totalVisits: this.visits.length,
      sessionDuration: Date.now() - this.sessionStart,
      zoneStats,
      mostVisited: Object.entries(zoneStats)
        .sort((a, b) => b[1].visitCount - a[1].visitCount)
        .map(([id]) => id),
    };
  }

  // Send to external analytics if configured
  flush() {
    const stats = this.getStats();
    // Log to console in dev
    if (process.env.NODE_ENV === 'development') {
      console.log('[Portfolio Analytics]', stats);
    }
    // In production, send to your analytics endpoint:
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(stats) });
  }
}

export const analytics = new PortfolioAnalytics();

// Flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => analytics.flush());
}
