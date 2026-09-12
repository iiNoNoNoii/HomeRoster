import { describe, expect, it } from "vitest";
import { assignLanes } from "../src/utils/lanes";

interface Item {
  id: string;
  start: number;
  end: number;
}

const item = (id: string, start: number, end: number): Item => ({ id, start, end });

describe("assignLanes", () => {
  it("returns an empty array for no items", () => {
    expect(assignLanes([])).toEqual([]);
  });

  it("puts a single event in lane 0 with laneCount 1", () => {
    const result = assignLanes([item("a", 0, 60)]);
    expect(result).toEqual([{ item: item("a", 0, 60), lane: 0, laneCount: 1 }]);
  });

  it("keeps non-overlapping sequential events in the same lane", () => {
    const result = assignLanes([item("a", 0, 60), item("b", 60, 120)]);
    expect(result.find((r) => r.item.id === "a")?.lane).toBe(0);
    expect(result.find((r) => r.item.id === "b")?.lane).toBe(0);
    expect(result.every((r) => r.laneCount === 1)).toBe(true);
  });

  it("splits two fully overlapping events into two lanes", () => {
    const result = assignLanes([item("a", 0, 60), item("b", 0, 60)]);
    const lanes = result.map((r) => r.lane).sort();
    expect(lanes).toEqual([0, 1]);
    expect(result.every((r) => r.laneCount === 2)).toBe(true);
  });

  it("does not hide any event - no two overlapping events share a lane", () => {
    const items = [item("a", 0, 100), item("b", 10, 50), item("c", 20, 40), item("d", 90, 150)];
    const result = assignLanes(items);
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const a = result[i];
        const b = result[j];
        const overlap = a.item.start < b.item.end && b.item.start < a.item.end;
        if (overlap) {
          expect(a.lane).not.toBe(b.lane);
        }
      }
    }
  });

  it("computes laneCount per independent overlap cluster, not globally", () => {
    // Cluster 1: three-way overlap (needs 3 lanes). Cluster 2: a single,
    // isolated event later in the day must NOT be squeezed to width 1/3.
    const items = [
      item("a", 0, 30),
      item("b", 0, 30),
      item("c", 0, 30),
      item("isolated", 1000, 1030),
    ];
    const result = assignLanes(items);
    const clusterLanes = result.filter((r) => r.item.id !== "isolated").map((r) => r.laneCount);
    expect(clusterLanes.every((c) => c === 3)).toBe(true);
    const isolated = result.find((r) => r.item.id === "isolated")!;
    expect(isolated.lane).toBe(0);
    expect(isolated.laneCount).toBe(1);
  });

  it("reuses a freed lane once an earlier event has ended", () => {
    const items = [item("a", 0, 10), item("b", 0, 10), item("c", 10, 20)];
    const result = assignLanes(items);
    const c = result.find((r) => r.item.id === "c")!;
    expect(c.lane).toBe(0);
  });

  it("handles the same person double-booked at overlapping times without merging them", () => {
    const items = [item("a", 0, 60), item("b", 30, 90)];
    const result = assignLanes(items);
    expect(result).toHaveLength(2);
    expect(result[0].lane).not.toBe(result[1].lane);
  });
});
