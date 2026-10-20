#!/usr/bin/env python3
"""压缩展示 REA 已保存的事实；不把候选 endpoint 当成运行时 API。"""
from collections import Counter
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
results = {}
for run in sorted(ROOT.glob("*.run.json")):
    label = run.name.removesuffix(".run.json")
    source = ROOT / f"{label}.stdout.json"
    outer = json.loads(source.read_text())
    if not isinstance(outer, dict):
        results[label] = {"run": json.loads(run.read_text()), "syntax_summary": outer}
        continue
    evidence = outer.get("data", outer)
    if "normalized_result" not in evidence:
        results[label] = {"run": json.loads(run.read_text()), "error": outer}
        continue
    normalized = evidence["normalized_result"]
    graph = normalized["graph"]
    sem = normalized["semantic_graph"]
    summary = {
        "evidence_id": evidence["evidence_id"],
        "input_path": normalized["input_path"],
        "statistics": normalized["statistics"],
        "graph_coverage": graph["coverage"],
        "graph_node_kinds": dict(Counter(n["kind"] for n in graph["nodes"])),
        "graph_edge_kinds": dict(Counter(e.get("relation") for e in graph["edges"])),
        "semantic_node_count": len(sem["nodes"]),
        "semantic_relation_count": len(sem["relations"]),
        "semantic_unknown_count": len(sem["unknowns"]),
        "semantic_coverage": sem["coverage"],
        "limitations": evidence["limitations"],
        "module_observations": [],
        "storage_observations": [],
        "url_shaped_endpoint_candidates": [],
        "unknown_observations": [],
        "run": json.loads(run.read_text()),
    }
    for node in graph["nodes"]:
        kind = node["kind"]
        collection = {"javascript-module": "module_observations", "storage": "storage_observations", "unknown": "unknown_observations"}.get(kind)
        for observation in node["observations"]:
            props = observation.get("properties", {})
            value = props.get("value", "")
            if kind == "endpoint" and isinstance(value, str) and value.startswith(("/", "http:", "https:", "ws:", "wss:")):
                collection = "url_shaped_endpoint_candidates"
            if collection is not None:
                summary[collection].append({"node_id": node["node_id"], "label": observation.get("label"),
                    "properties": props, "location": observation.get("evidence", {}).get("location"),
                    "state": observation.get("evidence", {}).get("state"),
                    "confidence": observation.get("evidence", {}).get("confidence")})
    results[label] = summary
(ROOT / "results-summary.json").write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n")
for name, r in results.items():
    print(name, json.dumps({k: r[k] for k in ["evidence_id", "statistics", "graph_coverage", "graph_node_kinds", "limitations"] if k in r}, ensure_ascii=False))
