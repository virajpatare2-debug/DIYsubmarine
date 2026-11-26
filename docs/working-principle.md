# Working principle

## Buoyancy

By Archimedes' principle, the upward force on a submerged body equals the weight of the water it displaces:

$$F_b = \rho \, g \, V$$

For a closed cylindrical hull of outer diameter $D$ and length $L$:

$$V = \frac{\pi D^2 L}{4}$$

- $F_b > m g$ when fully submerged → the vehicle floats (tank test 01).
- $F_b \approx m g$ → neutral buoyancy: thrusters only need small forces to dive or surface.
- Ballast needed for neutral: $m_{ballast} = \rho V - m$.

Example (illustrative values, not measurements): $D = 90$ mm, $L = 1000$ mm gives $V \approx 6.36$ L, so a hull of total mass 2.5 kg in fresh water needs about 3.9 kg of ballast to reach neutral buoyancy. The website's *Buoyancy lab* does this calculation for your own numbers.

## Stability and trim

Ballast placed low and centred lowers the centre of gravity below the centre of buoyancy, which keeps the hull upright and level. Moving ballast towards one end trims the nose up or down.

## Propulsion

Small DC motors drive propellers. Reversing supply polarity reverses rotation and thrust. Power and switching stay on the surface and reach the motors through the tether.

## Sealing

The fixed end cap is permanently sealed. The access end uses a threaded adapter and screw-in plug so the hull can be opened and closed. Cable entries are sealed with sealant. Every joint is a potential leak path and must be checked under water.
