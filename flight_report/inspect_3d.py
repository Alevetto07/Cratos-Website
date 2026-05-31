import re
from pathlib import Path

t = Path("../assets/flight/01_3d_trajectory.html").read_text(encoding="utf-8")
out = Path("inspect_out.txt")
parts = []
for pat in ["updatemenus", "fromcurrent", "Plotly.animate", "frame_names", '"name":"']:
    parts.append(f"{pat}: {t.count(pat)}\n")
i = t.find("updatemenus")
parts.append("\n--- updatemenus (ascii-safe) ---\n")
parts.append(t[i : i + 2000].encode("ascii", "backslashreplace").decode() if i >= 0 else "none\n")
for m in re.finditer(r"Plotly\.animate\([^)]+\)", t):
    parts.append("\n" + m.group().encode("ascii", "backslashreplace").decode()[:300])
out.write_text("".join(parts), encoding="utf-8")
