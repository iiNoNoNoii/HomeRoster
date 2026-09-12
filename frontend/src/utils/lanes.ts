// Assigns lane indices to overlapping timed items so that overlapping
// events render side-by-side instead of hiding each other (day/week views).
// Pure, framework-free and unit-testable in isolation.

export interface LaneInput {
  start: number; // epoch ms
  end: number; // epoch ms
}

export interface LaneAssignment<T> {
  item: T;
  lane: number;
  laneCount: number;
}

/**
 * Greedy interval-graph-coloring lane assignment. Items are grouped into
 * independent overlap "clusters"; laneCount is computed per cluster so an
 * isolated event is never squeezed by an unrelated busy cluster elsewhere
 * in the same day.
 */
export function assignLanes<T extends LaneInput>(items: readonly T[]): LaneAssignment<T>[] {
  if (items.length === 0) {
    return [];
  }

  const sorted = [...items].sort((a, b) => (a.start !== b.start ? a.start - b.start : a.end - b.end));

  const results: LaneAssignment<T>[] = [];
  let cluster: { item: T; lane: number }[] = [];
  let clusterEnd = -Infinity;
  const laneEnds: number[] = [];

  const flushCluster = () => {
    if (cluster.length === 0) {
      return;
    }
    const laneCount = Math.max(...cluster.map((c) => c.lane)) + 1;
    for (const c of cluster) {
      results.push({ item: c.item, lane: c.lane, laneCount });
    }
    cluster = [];
    laneEnds.length = 0;
  };

  for (const item of sorted) {
    if (item.start >= clusterEnd) {
      flushCluster();
      clusterEnd = -Infinity;
    }

    let lane = laneEnds.findIndex((end) => end <= item.start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.end);
    } else {
      laneEnds[lane] = item.end;
    }

    cluster.push({ item, lane });
    clusterEnd = Math.max(clusterEnd, item.end);
  }
  flushCluster();

  return results;
}
