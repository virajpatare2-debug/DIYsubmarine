# CAD files

Put the SolidWorks files for the hull here:

- `cad/native-files/` — `.SLDPRT`, `.SLDASM`, `.SLDDRW`
- `cad/exports/` — `.STEP` and `.STL` exports and PDF drawings

Add clean screenshots (isometric, front, drawing sheet) to `media/cad-screenshots/` and list them in `assets/js/gallery-data.js`.

## Files in this folder

- `native-files/Submarine_Propeller_60mm_5mm.SLDPRT` — five-blade propeller, Ø 60 mm, printed on the Bambu Lab A1 mini.

## Exports for the Makerspace machines

- **Laser cutter:** export each flat part's sketch as `DXF` (1:1, mm) into `cad/exports/` — cradles, fins, ballast tray.
- **Bambu Lab A1 mini:** export shaped parts as `STL` (fine resolution) into `cad/exports/`, slice in Bambu Studio.
