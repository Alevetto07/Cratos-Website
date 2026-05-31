# CanSat Cratos — Flight Analysis Report

**Data source:** Ground telemetry (`LOG-Telemetry.csv`)  
**Generated from:** `analysis/flight_report/`

---

## 1. Overview

This report analyses a CanSat flight where the payload was lifted by a quadcopter on a rope to ~60 m, then descended back near the launch point. Sensors logged at ~2 Hz (500 ms interval): barometric pressure, 3-axis accelerometer, 3-axis gyroscope, magnetometer, and derived attitude on the ground station.

### Flight summary (this log)

| Metric | Value |
|--------|-------|
| Samples | 359 |
| Duration | 215.0 s |
| Reference pressure (pad) | 951.34 hPa |
| Apogee (from pressure) | **59.04 m** at t = 131.0 s |
| Landing altitude | 0.35 m |
| Landing horizontal offset | 1.06 m |
| Max horizontal swing (DR) | 60.87 m |
| Velocity fusion RMSE | 1.346 m/s |

---

## 2. Processing pipeline

```
LOG-Telemetry.csv
    │
    ├─► Filter valid pressure (800–1100 hPa)
    ├─► Compute P_ref = median(pressure) over first 6 s on pad
    ├─► Altitude from pressure (barometric formula, zero at launch)
    ├─► IMU: remove gravity + bias → linear vertical acceleration
    ├─► Complementary filter: pressure defines altitude, IMU refines vertical velocity
    └─► 3D path: Z = pressure altitude; X/Y = filtered horizontal IMU (rope swing)
```

**Code modules** (each produces one chart):

| File | Output |
|------|--------|
| `flight_data.py` | Shared loading & maths |
| `plot_3d.py` | `01_3d_trajectory.html` |
| `plot_vertical_velocity.py` | `02_vertical_velocity.html` |
| `plot_vertical_acceleration.py` | `03_vertical_acceleration.html` |
| `plot_pressure.py` | `04_pressure.html` |
| `plot_imu_raw.py` | `05_imu_raw.html` |

Run individually, e.g. `python analysis/flight_report/plot_3d.py`

---

## 3. Mathematics

### 3.1 Barometric altitude

Same formula as the Arduino firmware (`nanoooooo_copy_20260530163218.ino`):

\[
h = 44330 \left(1 - \left(\frac{P}{P_{ref}}\right)^{0.190294957}\right)
\]

- \(P\) = instantaneous pressure (hPa)  
- \(P_{ref}\) = median pressure during the first 6 s on the launch pad  
- Reported altitude is **relative to launch**: \(h_{rel} = h - h_0\)

### 3.2 Numerical derivatives (baro)

Central finite differences on pressure-derived altitude \(h(t)\):

\[
v_{baro}(t_i) \approx \frac{h(t_{i+1}) - h(t_{i-1})}{\Delta t_i + \Delta t_{i+1}}
\]

\[
a_{baro}(t_i) \approx \frac{v(t_{i+1}) - v(t_{i-1})}{\Delta t_i + \Delta t_{i+1}}
\]

### 3.3 IMU linear vertical acceleration

1. Calibrate gravity vector \(\mathbf{g}_{ref}\) = mean(accel) over first 6 s (in g).  
2. Estimate pitch/roll from accelerometer (low dynamics on pad).  
3. Remove 1 g and bias:

\[
a_{lin} = \tfrac{1}{2}(a_{rot} + a_{vec}) - \bar{a}_{calib}
\]

where \(a_{rot}\) projects body acceleration to vertical using pitch/roll, and \(a_{vec}\) subtracts \(\mathbf{g}_{ref}\) and projects onto the up axis.

### 3.4 Complementary filter (vertical velocity)

Pressure is trusted for **altitude**. IMU refines **vertical velocity**:

\[
v_{imu} = v_{k-1} + a_{lin} \, \Delta t
\]

\[
\alpha = \frac{\Delta t}{\tau + \Delta t}, \quad \tau = 1\,\text{s}
\]

\[
v_k = v_{imu} + \alpha \, (v_{baro} - v_{imu})
\]

Altitude each step: \(h_k = h_{baro,k}\).

### 3.5 Horizontal dead reckoning (3D swing)

In a **launch-fixed** East/North frame:

1. Linear body acceleration: \((\mathbf{a}_{body} - \mathbf{g}_{ref}) \times g_0\)  
2. High-pass filter horizontal components (removes slow drift)  
3. Integrate → velocity (with decay + zeroing on ground) → position  
4. High-pass position, anchor start at (0, 0)  
5. **Z** always from pressure altitude

---

## 4. Charts in this folder

1. **[01_3d_trajectory.html](01_3d_trajectory.html)** — Animated cylinder; rope swing in X/Y; altitude from pressure.  
2. **[02_vertical_velocity.html](02_vertical_velocity.html)** — Baro derivative vs IMU-enhanced velocity.  
3. **[03_vertical_acceleration.html](03_vertical_acceleration.html)** — IMU linear vs baro \(d^2h/dt^2\).  
4. **[04_pressure.html](04_pressure.html)** — Raw `pressure_hPa` vs time.  
5. **[05_imu_raw.html](05_imu_raw.html)** — Raw accelerometer (g) and gyroscope (°/s).

Open **[index.html](index.html)** for a single page linking all charts.

---

## 5. Conclusions

1. **Altitude:** Recalculating from raw pressure gives apogee **~59.04 m**, matching the expected ~60 m quadcopter hoist. The onboard `altitude_m` field is consistent but pressure is the primary trusted source.

2. **Vertical motion:** Ascent and descent phases are clearly visible in pressure and in derived velocity. IMU complementary filtering smooths vertical velocity between baro samples (RMSE **1.346 m/s** vs baro derivative) without corrupting altitude.

3. **Horizontal motion:** The CanSat swung side-to-side on the rope; horizontal dead reckoning shows oscillating X/Y motion. Landing offset **~1.06 m** from the pad is acceptable without GPS; peak horizontal excursion in the DR model is ~60.87 m (IMU drift amplifies swing during tumbling).

4. **IMU raw data:** Accelerometer magnitude stays near 1 g when not under strong linear acceleration; gyro shows rapid rotation during tumble phases — explaining why pure IMU altitude integration fails without baro aiding.

5. **Telemetry vs SD:** This report uses ground telemetry only (~359 samples, ~215.0 s) as the most complete record for this flight.

---

## 6. Reproduce

```powershell
cd Telemetry
python analysis/flight_report/generate_report.py
```
