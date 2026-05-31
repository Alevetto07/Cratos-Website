"""Generate 07_magnetometer.html from LOG-Telemetry.csv."""
import pandas as pd
import plotly.graph_objects as go
from pathlib import Path

MAG_ERR_UT = 0.014
AXIS_LINE = dict(width=1, color="rgba(148, 163, 184, 0.35)")
MAIN_LINE = dict(color="#e2e8f0", width=2.5)

ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "LOG-Telemetry.csv")
df["t_s"] = (df["t_ms"] - df["t_ms"].min()) / 1000.0
b = (df["mag_x_uT"] ** 2 + df["mag_y_uT"] ** 2 + df["mag_z_uT"] ** 2) ** 0.5
err_label = f"±{MAG_ERR_UT:g} µT"

fig = go.Figure()
for col, key, color in [
    ("mag_x_uT", "B_x", "rgba(248, 113, 113, 0.45)"),
    ("mag_y_uT", "B_y", "rgba(74, 222, 128, 0.45)"),
    ("mag_z_uT", "B_z", "rgba(96, 165, 250, 0.45)"),
]:
    y = df[col]
    fig.add_trace(
        go.Scatter(
            x=df["t_s"],
            y=y + MAG_ERR_UT,
            mode="lines",
            line=dict(width=0),
            showlegend=False,
            hoverinfo="skip",
        )
    )
    fig.add_trace(
        go.Scatter(
            x=df["t_s"],
            y=y - MAG_ERR_UT,
            mode="lines",
            line=dict(width=0),
            fill="tonexty",
            fillcolor=color.replace("0.45", "0.12"),
            showlegend=False,
            hoverinfo="skip",
        )
    )
    fig.add_trace(
        go.Scatter(
            x=df["t_s"],
            y=y,
            mode="lines",
            name=f"{key} ({err_label})",
            line=dict(width=AXIS_LINE["width"], color=color),
        )
    )

fig.add_trace(
    go.Scatter(
        x=df["t_s"],
        y=b,
        mode="lines",
        name="|B|",
        line=MAIN_LINE,
    )
)
fig.update_layout(
    template="plotly_dark",
    title="Magnetometer",
    xaxis_title="Flight time (s)",
    yaxis_title="Magnetic field (µT)",
    height=460,
    paper_bgcolor="rgb(10,10,10)",
    plot_bgcolor="rgb(10,10,10)",
    legend=dict(orientation="h", yanchor="bottom", y=1.02, x=0),
    annotations=[
        dict(
            text=f"Axis uncertainty: {err_label}",
            xref="paper",
            yref="paper",
            x=1,
            y=-0.12,
            xanchor="right",
            showarrow=False,
            font=dict(size=11, color="#94a3b8"),
        )
    ],
    margin=dict(b=56),
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
