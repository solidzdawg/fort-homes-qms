# CC21TE — Extraction Summary

Source PDF: `c:\Users\Zacha\Downloads\Shop Drawings for CC21TE (SHOP FINAL DONT CONFUSE W OTHER).pdf`

Summary:
- This document contains shop drawings for CC21TE module.
- Key parameters to extract: joist spacing, subfloor type, rim board, blocking, MEP routing/clearances, hold point definitions, fastener schedules.

Next steps for agent:
1. Run PDF text extraction (pdftotext or node/pdf-parse) to produce `cc21te-text.txt`.
2. Confirm numeric values and material specs in `data/cc21te/cc21te-tasks.json`.
3. Populate `data/cc21te/traceability.md` with page/figure references.

Notes:
- If PDF contains multiple variant tables, prioritize "SHOP FINAL" drawings.
- Any discrepancy between drawing callouts and WI policy should be flagged for stakeholder review.
