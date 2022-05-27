## v0.3.4 (2022-05-26) Latest

### Features
- Added Pagination Component to fix previous pagination bugs and improve stability
- Added external control functions to avoid inner re-rendering and state update, this is to allow controlled updating of table rows

### Dependencies
- REMOVED [Decimal JS](https://mikemcl.github.io/decimal.js/)

### Bugs
* Fixed card pointing direction
* Changed container width calculation to automatic

## v0.3.2 (2022-05-24)
---
**[0bd8be9](https://github.com/MarilesBeard5/semantic-table/commit/0bd8be94da4545d1200e899780159ef33f49bde7)**

### Features
* Added decimal operations to allow better table width handling

### Dependencies
- [Decimal JS](https://mikemcl.github.io/decimal.js/)
### Bugs
* Fixed boolean cell rendering on edition

## v0.2.8 (2022-05-16)
---
**[a1396e8](https://github.com/MarilesBeard5/semantic-table/commit/a1396e8fc26af599ce86efcfb273305028f28e0b)**

**[153a720](https://github.com/MarilesBeard5/semantic-table/commit/153a720a68e461cc65e15b51824a064425d99c2c)**

**[0185567](https://github.com/MarilesBeard5/semantic-table/commit/01855676e234500906de33fea8996c7cf4c10362)**
### Features
* Added additional header action buttons
* Added records per page label
* Added prop to allow saving on external manipulation

### Dependencies

### Bugs
* Fixed rows to identify edition on additional action save
* Fixed logical rendering of filter card options through checked property to allow external controlling

## v0.2.6 (2022-04-28)
---
**[b194e31](https://github.com/MarilesBeard5/semantic-table/commit/b194e310b8c8e5c9a3c7c1fa35bfe979dafee8cc)**

### Features
* Added better support for date filtering
* Added hideRemoveFilterButton prop and showTotalRecords prop
* Added better uuid identifier to avoid collisions

### Dependencies

### Bugs
* Fixed onBlur bug where rows where being replaced
* Fixed unpaginated table filtering issue
* Fixed boolean edition
* Fixed filtering card positioning

## v0.2.4 (2022-04-20)
---
**[288c287](https://github.com/MarilesBeard5/semantic-table/commit/288c287e711553cb9984cfe499fc64e69ac51a92)**

**[20dad95](https://github.com/MarilesBeard5/semantic-table/commit/20dad95531fd60072bb231c00ce5b84cb4964caf)**

**[f60f042](https://github.com/MarilesBeard5/semantic-table/commit/f60f04220516a733cce76012317661439546161e)**

### Features
* Added faker JS to be available for cloned repos
* Removed automatic sorting, now sort will be applied on pressing the "Aplicar" button
* Added custom props for spanish text labels
* Added more data to onEditCell and onDelete functions
* Added support for static date formatting to allow better filtering
* Added total rows label

### Dependencies

### Bugs

## v0.2.1 (2022-04-19)
---
**[7daf5aa](https://github.com/MarilesBeard5/semantic-table/commit/7daf5aaa5f1e6040005f3795627b59475e1b03c9)**

**[2b87a5d](https://github.com/MarilesBeard5/semantic-table/commit/2b87a5d166bc0409df842c29c1766ec1c0a1b7b7)**

### Features
* Added custom height prop for table
* Added tab indexing for each editable column
* Added better processing functions on utils file
* Added faker for basic local tests
* Increased max height of table
* Added unshift functionality for new rows instead of pushing to the end
* Added different cursor to assert where a user can edit
* Added better documentation
* Added color change on focus a row and pagination items

### Dependencies
* Faker JS

### Bugs
* Fixed _select_ type column filtering
* Fixed onCancel function bug
* Fixed key generation for additional columns
* Fixed repeated re-rendering for checking if table can be saved or not
* Fixed specific column focusing to change overflowing on specific cells and not all same-type cells.

## v0.1.8 (2022-04-12)
---
**[9609911](https://github.com/MarilesBeard5/semantic-table/commit/960991176c5f3c18d047d0eb1b6448fb5fdce706)**

**[96e4f1f](https://github.com/MarilesBeard5/semantic-table/commit/96e4f1f486953b51489b871ee2bc2660fa42d49b)**

**[14e2645](https://github.com/MarilesBeard5/semantic-table/commit/14e264569a1cc7ba2076e3a5c7a1721759816b64)**

**[04336c8](https://github.com/MarilesBeard5/semantic-table/commit/04336c8a82f73c4fc8852c47d8a0ee561f7e07c7)**

**[cda125a](https://github.com/MarilesBeard5/semantic-table/commit/cda125a21a326ab3f1ff9ed3a73b6e1b06b0e0b6)**

### Features
* Added _add new row_ functionality
* Added paginated boolean option to hide pagination item

### Dependencies

### Bugs
* Fixed focus functionality on rows of the same column
* Fixed overflow assertion for select component
* Fixed add new row problem on empty table

## v0.1.0 (2022-04-08)
**[c2f1804](https://github.com/MarilesBeard5/semantic-table/commit/c2f1804bf64ac38b3f0e73a165a8e77b53a6d144)**

### Features
* Initial Setup and Component Exporting

### Dependencies
* Cleave JS
* React CSV
* Moment
* Semantic UI

### Bugs
* Fixed export problem and props identification
