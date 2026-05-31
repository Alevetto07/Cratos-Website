"""Keep 3D trajectory animation on last frame after Play completes."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = (
    "}).then(function(){\n"
    "                            var plotId='0561a8ca-2f41-4385-8b0e-2bc379609971';"
    "Plotly.animate(plotId,['358'],{frame:{duration:0,redraw:true},transition:{duration:0},mode:'immediate'});\n"
    "                        })                };            </script>"
)
NEW = (
    "}).then(function(){\n"
    "                            var plotId='0561a8ca-2f41-4385-8b0e-2bc379609971';\n"
    "                            var gd=document.getElementById(plotId);\n"
    "                            function holdEnd(){\n"
    "                              Plotly.animate(plotId,['358'],{frame:{duration:0,redraw:true},transition:{duration:0},mode:'immediate'});\n"
    "                            }\n"
    "                            holdEnd();\n"
    "                            gd.on('plotly_animated',function(){setTimeout(holdEnd,0);});\n"
    "                        })                };            </script>"
)

for rel in ("assets/flight/01_3d_trajectory.html", "flight_report/01_3d_trajectory.html"):
    path = ROOT / rel
    if not path.exists():
        print(f"skip missing {rel}")
        continue
    text = path.read_text(encoding="utf-8")
    if OLD not in text:
        tail = text[-400:]
        print(f"OLD not found in {rel}; tail repr:\n{tail!r}")
        continue
    path.write_text(text.replace(OLD, NEW, 1), encoding="utf-8")
    print(f"patched {rel}")
