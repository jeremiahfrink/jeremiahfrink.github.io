# Territory Coverage Planner (T / J / TnJ)

Static, mobile-friendly, interactive U.S. **geographic** state map and education opportunity dashboard. Ready for GitHub Pages.

## Publish on GitHub Pages

1. Create a GitHub repository (for example, `territory-coverage-planner`).
2. Upload **all** files in this directory to the root of the `main` branch: `index.html`, `styles.css`, `app.js`, `education-data.json`, and `education-data.csv`. Keep the filenames unchanged.
3. In GitHub, select **Settings → Pages**, choose **Deploy from a branch**, `main`, and `/ (root)`; save.
4. Open the Pages URL shown in Settings after deployment.

The website has no server-side code and does not require a build process. The geographic map uses D3, TopoJSON, and U.S. Atlas state boundary data from jsDelivr CDN, so internet connectivity is needed to draw the map. It uses a real state-boundary SVG map, with Alaska/Hawaii moved into traditional insets.

## Coverage categories

- **T**: exclusive coverage for T, shown blue.
- **J**: exclusive coverage for J, shown orange.
- **TnJ**: fully shared coverage, shown purple. Counted once in the national total and in its own category; appears in *both* working portfolios (do not add those portfolio totals together).
- **Split**: percentage allocation to T and J, shown with alternating-color stripes. Percentages apply evenly to state-level enrollment and spending as a planning approximation.
- **Review**: unassigned, shown gray. Included in the national overall totals.

Changing the assignment and clicking **Save state changes** updates map colors, comparisons, tables, and KPIs. The data is saved to the browser's local storage. Different devices and browsers do not sync. Use **Export plan** and **Import plan** to move changes between sessions. Exporting the plan also includes current education data.

## Metrics and counting rules

- **States covered** counts distinct states in the selected view. D.C. is excluded from the state count, but its students and spending are included.
- **Public school students** use NCES fall 2023 enrollment.
- **Total education spending** uses Census FY2024 total public school expenditures.
- **Current spending per student** uses **sum(current expenditures) / sum(finance-survey enrollment)** for the selected view, *not* an average of the statewide per-student rates.
- T and J exclusive views include their allocated portions of split states but exclude TnJ, which has its own category.
- T and J working portfolio views include the shared states at full value and therefore overlap.
- A split state's **state count** counts the state in each affected view, but its students and dollars are allocated. State counts across categories should not be added together.

## Data refresh

Upload a replacement CSV through **Replace education data (CSV)** using the existing columns: `code,name,type,students,totalSpending,perStudent,financeEnrollment,currentSpending`. Per-student calculations are recomputed from `currentSpending/financeEnrollment`. The interface also offers a data CSV download and restoration to the packaged baseline. Refreshes are **manual**, not automatic: newer government datasets can be incorporated in a later version or with GitHub Actions.

References:
- [NCES Digest, Table 203.20](https://nces.ed.gov/programs/digest/d25/tables/dt25_203.20.asp)
- [U.S. Census Bureau, FY2024 Public Education Finance](https://www.census.gov/data/tables/2024/econ/school-finances/secondary-education-finance.html)

## Limitations

Starting T/J territory assignments are an **approximate** interpretation of the original supplied image, not verified ownership boundaries. NY and PA are initially configured as 50/50 split *planning placeholders*, and can be reclassified as shared. Percent splits use statewide proportional estimates; detailed local school district mapping would need a different geographic and data model. Data are a historical snapshot. Map geometry and JavaScript visualization libraries require internet connectivity; the rest of the application is static.
