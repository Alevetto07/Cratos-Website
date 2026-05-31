"""Generate 07_magnetometer.html from LOG-Telemetry.csv."""
import pandas as pd
import plotly.graph_objects as go
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "LOG-Telemetry.csv")
df["t_s"] = (df["t_ms"] - df["t_ms"].min()) / 1000.0
b = (df["mag_x_uT"] ** 2 + df["mag_y_uT"] ** 2 + df["mag_z_uT"] ** 2) ** 0.5

fig = go.Figure()
fig.add_trace(
    go.Scatter(
        x=df["t_s"],
        y=df["mag_x_uT"],
        mode="lines",
        name="B_x",
        line=dict(color="#f87171", width=2),
    )
)
fig.add_trace(
    go.Scatter(
        x=df["t_s"],
        y=df["mag_y_uT"],
        mode="lines",
        name="B_y",
        line=dict(color="#4ade80", width=2),
    )
)
fig.add_trace(
    go.Scatter(
        x=df["t_s"],
        y=df["mag_z_uT"],
        mode="lines",
        name="B_z",
        line=dict(color="#60a5fa", width=2),
    )
)
fig.add_trace(
    go.Scatter(
        x=df["t_s"],
        y=b,
        mode="lines",
        name="|B|",
        line=dict(color="#94a3b8", width=2, dash="dash"),
    )
)
fig.update_layout(
    template="plotly_dark",
    title="Magnetometer — LOG-Telemetry.csv",
    xaxis_title="Flight time (s)",
    yaxis_title="Magnetic field (µT)",
    height=460,
    paper_bgcolor="rgb(10,10,10)",
    plot_bgcolor="rgb(10,10,10)",
    legend=dict(orientation="h", yanchor="bottom", y=1.02, x=0),
)

out = ROOT / "assets" / "flight" / "07_magnetometer.html"
fig.write_html(out, include_plotlyjs="cdn", full_html=True, config={"responsive": True})

text = out.read_text(encoding="utf-8")
text = text.replace("rgb(17,17,17)", "rgb(10,10,10)")
text = text.replace("#506784", "#2e2e2e").replace("#283442", "#1a1a1a").replace("#2a3f5f", "#1a1a1a")
if "html,body{background:#0a0a0a" not in text:
    text = text.replace(
        '<head><meta charset="utf-8" /></head>',
        '<head><meta charset="utf-8" /><style>html,body{background:#0a0a0a;margin:0;}</style></head>',
    )
out.write_text(text, encoding="utf-8")
print(f"Wrote {out} ({len(df)} samples)")
