# Change history for ui-agreements

## 6.1.0 In progress

##  6.0.0 2021-03-18
* Purchase Order Line details not retrieved from /orders/order-lines for Entitlement. ERM-1606
* Update displayName for ui-agreements.platforms.X permissions. ERM-1592
* License and business terms accordion should only display when there is a Controlling license. ERM-1578
* When displaying Interfaces for organisations in an Agreement full details are only retrieved for 10. ERM-1559
* Update stripes-cli to v2. ERM-1550
* Support order-lines 2.0 interface. ERM-1549
* Add tag search to eresources search and sort. ERM-1544
* Added conditional rendering of accordions in Agreement view. ERM-1537
* Tweaked display to highlight current/next/previous period ERM-1534
* Agreement start and end dates should be the earliest period start and latest period end date respectively ERM-1533
* Refactored AgreementFilters to functional component, added date filter. ERM-1532
* Changed Other Periods accordion to All Periods ERM-1531
* Update on screen text on Agreements settings page ERM-1527
* Actions on the Agreement pane cause the fixed panel to become transparent ERM-1464
* New shortcut key | Duplicate a record. ERM-1458
* Error on viewing a URL Customiser. ERM-1456
* Add Discovery Settings accordion for "Suppress from discovery" information to Title Instance, PCI and Agreement Line display. ERM-1250
* Incorrect message on PCI screen. ERM-1236
* Add POL/Inventory Instance details to Agreement Line display. ERM-1228
* Platform: Action button should not show if user would see no options in Action dropdown. ERM-1225
* Removing content of "Local platform code" and saving should result in empty platform code. ERM-1224
* Agreement lines from previous agreement show when switching to view another agreement. ERM-1223
* Agreements > Platforms: "search" keyboard shortcut does not work. ERM-1219
* Incorrect error message is displayed when the user deletes a supplementary property which is in use on an agreement. ERM-1218
* Setup RTL test infrastructure. ERM-1216
* Dropdowns do not display values when editing Agreements. ERM-1206
* Agreement lines do not display correctly in Agreement edit view. ERM-1205
* Add UI settings to control the number of items displayed in Agreements MCLs. ERM-1190
* Add FOLIO keyboard shortcuts to Agreements-Platforms. ERM-1186 
* Add "Edit" screen for title instance resources. ERM-1184
* Support user access to platform records. ERM-1156
* Add FOLIO keyboard shortcuts to Agreements. ERM-1151
* E-resources covered by this agreement: Link to PCI instead of TI. ERM-1148
* Apply a four column layout to the Agreement preview pane. ERM-1137
* Support for e-resource proxies and url customisers ERM-1102
  * UI for managing proxy server configurations. ERM-1109
  * UIs for managing proxy url and customiser url configurations from the Platform context. ERM-1194
* Added optionalOkapiInterfaces to package.json. ERM-940
* Removed edit button in agreements detail view. ERM-693
* UI tests replacement with RTL/Jest FAT-81
  * AgreementsRoute ERM-1473
  * MCLPaginationFields ERM-1460
  * NoPermissions ERM-1281
  * IfEResourcesEnabled ERM-1277
  * FolioLink ERM-1276
  * EntitlementsAgreementsList ERM-1275
  * EResourceSections ERM-1274
    * PackageInfo.js ERM-1395
    * PackageContents.js ERM-1394
    * PCIInfo.js ERM-1393
    * PCIFormInfo.js ERM-1392
    * PCIFormCoverage.js ERM-1391
    * PCICoverage.js ERM-1390
    * Agreements.js ERM-1389
    * AcquisitionOptions.js ERM-1388
  * EResourceProvider ERM-1273
  * EResourceLink ERM-1272
  * EResourceKB ERM-1271
  * EResourceIdentifier ERM-1270
  * EResourceCount ERM-1268
  * DuplicateAgreementModal ERM-1267
  * CustomCoverageIcon ERM-1266
  * CoverageFieldArray ERM-1265
  * Coverage ERM-1264
    * CoverageFieldArray.js ERM-1387
    * CoverageField.js ERM-1386
    * MonographCoverage.js ERM-1385
    * Coverage.js ERM-1384
  * BasketSelector ERM-1263
  * BasketList ERM-1262
  * AddToBasketButton ERM-1256
* Upgrade to Stripes 6.0
* Modify keyboard shortcuts, use handlers from stripes-components, stripes-erm-components
* Rename instance-bulk to inventory-record-bulk. UIIN-1368
##  5.0.1 2020-11-05
* Added permission check when displaying the add agreement line button. ERM-1197
* Fixes bug where incorrect Dates are saved when tenant timezone is ahead of UTC. ERM-1202
* Added permission check to fetch associated internal contacts data on editing an agreement. ERM-1200
* Bumped the limit to fetch 100 results for user definable pick lists. ERM-1192

##  5.0.0 2020-10-15
* Enhance eHoldings display in Agreement Line view. ERM-948
* Added ability to set and view notes on organizations. ERM-966
* Retrieve upto 100 results from users endpoint. ERM-980
* Upgrade to Stripes v5.0.
* Refactor `miragejs` from `bigtest/mirage`.
* Added support for the new publication type property. ERM-943
* Added support for searching by publication type property. ERM-944
* Separate organization and role filter. ERM-1043
* Added option to not display "Suppress from discovery" checkbox. ERM-1004
* Added new workflow for adding agreement lines to agreements. ERM-1000
* Improvements to agreement edit pane and added empty accordion messages. ERM-862
* Fixed coverage date format on submit. ERM-1091, ERM-1092
* Added Description to Agreement Line display in Edit Agreement view. ERM-1099
* Display eholdings icon on external resource cards. ERM-1106
* Retrieve upto 100 entitlement options. ERM-1158
* Added load more functionality to covered eresources MCL. ERM-1128

##  4.0.2 2020-07-06
* Fixed issue with only 10 results being retrieved for internal contacts. ERM-980

##  4.0.0 2020-06-11
* Added permission set and ability to delete agreements. ERM-777
* Show/hide pick list actions based on refdata category type. ERM-735
* Added ability to set and view agreement line notes. ERM-779
* Display Embargo information in "E-resources in package" and "Agreement line" display. ERM-805
* Added support for "Alternative names" for agreements. ERM-827
* Added coverage details to "options for acquiring E-resources" view. ERM-845
* Added ability to view and edit PCI information. ERM-847
* Added ability to view and edit Agreement line information. ERM-870 871 844 872 885
* Added ability to search/filter agreements based on custom properties. ERM-876
* Added new agreement-agreement relationships. ERM-889
* Added external links to titles on platforms. ERM-859
* Display information from siblingInstances in the agreements resources results. ERM-774 776
* Added Tags UI to eresources and agreement line display. ERM-919 ERM-920
* Added ability to view/edit "Suppress from discovery" for agreement lines. ERM-923 924
* Added ability to view/edit "Suppress from discovery" for PCIs. ERM-933
* Display Embargo details when viewing/editing an agreement line. ERM-938 939
* Display number of titles selected for agreement lines from eholdings. ERM-451
* Bumped the required node version to 10.

##  3.4.1 2020-03-12
* Set coverage columns to be fixed-width.

##  3.4.0 2020-03-11
* Switched to using `<FormattedUTCDate>` from Stripes. ERM-635
* Switched to using `<Spinner>` from Stripes. ERM-635
* Keyboard navigation and focus improvements. ERM-416 613 620 624
* Hid "Delete Agreement" permission set. ERM-617
* Added support for monograph fields. ERM-481 482 485 486 678
* Display callouts and confirmation modals. ERM-726
* Upgrade to Stripes 3.0

## 3.3.0 2019-12-04
* Update stripes to v2.10.1 to support PaneFooter.
* Move the Save & close button and add a Cancel button to Pane Footer. ERM-411.
* Apply the new large headline design to Agreements. ERM-260.
* Display coverage for Agreement lines on Create Agreement pane. ERM-168.
* Added ability to manage amendments for linked licenses. ERM-428 ERM-429
* Added agreement line active from/to dates. ERM-456
* Added ability to manage and view agreement periods. ERM-466 467 468
* Improve the header for the display of e-resources in agreements. ERM-472
* Added support for interface `erm` version `2.0`.
* Added support for interface `licenses` version `2.0`.
* Updated permission sets. ERM-477
* Updated forms to use React Final Form instead of Redux Form
* Added filter buttons to view future, dropped or all content of a package. ERM-394 ERM-396
* Added ability to search E-resources by identifier. ERM-519
* Added ability to manage and view linked agreements. ERM-460
* Updated linked Agreements, Contacts, Licenses, Organizations, PO Lines, and UDPs with new "link" and "replace" verbiage. ERM-451 452 453
* Added ability to duplicate an agreement. ERM-459
* Added ability to link multiple PO lines to a single agreement line. ERM-508

## 3.2.4 2019-09-10
* Added support for interface `invoice` version `2.0`.

## 3.2.3 2019-09-10
* Added agreement filtering by internal contact role. ERM-422

## 3.2.2 2019-09-09
* Fixed package version mismatch.

## 3.2.1 2019-09-09
* Re-added erroneously-deleted translation string.

## 3.2.0 2019-09-09
* Show/hide interface credentials. Fixes ERM-263
* Fixed package content lists being truncated at 1000 entries. ERM-409
* Fixed bug where not all the agreement lines were being fetched.
* Fixed bug where resetting query term wouldn't execute a search. ERM-426
* Added ability to filter e-resources by source KB. ERM-299
* Added agreement filtering by internal contact. ERM-421
* Display coverage in e-resources/e-resources in package. ERM-372
* Fixed links to titles from basket contents. ERM-438
* Tweaked license status widths. ERM-439

## 3.1.1 2019-08-21
* Use locally-defined saveAndClose translation key.

## 3.1.0 2019-08-20
* Allow only one Vendor organization to be selected.
* Render Internal Contacts as cards. ERM-309
* Added support for `mod-organizations-storage` 2.0

## 3.0.0 2019-07-23
* Support Orders interface 7.0. ERM-350
* Added ability to attach ERM Usage Data Providers to Agreements. ERM-273
* Added ability to attach PO Lines to Agreement Lines. ERM-239, 240, 242
* Support date strings instead of datetime strings. ERM-276
* Changed various accordion layouts,  IDs and tags. ERM-318, 340
* Changed navigation between Agreements and E-Resources. ERM-237
* Refactored to use `SearchAndSortQuery`. ERM-253

## 2.5.0 2019-06-11
* Added ability to manage Notes for Agreements. ERM-284

## 2.4.0 2019-05-21
 * ERM-238 Clearing the organization filter value not working as expected in Agreements
 * ERM-222 System error on saving an agreement with an empty organization field group
 * ERM-221 System error on saving an agreement with an empty Agreement Line
 * ERM-220 Support Organizations app as source of Organizations in Agreements
   * ERM-234 Front-end updates
 * ERM-216 "Preview" panel does not open after the "Search & filter" panel has been collapsed and uncollapsed.
 * ERM-212 Remove horizontal rules between filters in Agreements and License apps
 * ERM-186 Change the 'hide e-resource functionality' option in Agreements
 * ERM-180 Use generalised contacts component
 * ERM-75  Clearing the organization filter value not working as expected

## 2.3.0 2019-05-07

 * ERM-197 Change "ERM" to "Agreements" in UI
 * ERM-166 Remove unwanted extra license section
 * ERM-133 Configure Document Categories
 * ERM-143 Add License / Supplementaty License Information Panel UI
 * ERM-181 Fix data sync issue with GOKb (Resumption Token and Broken Coverage)
 * ERM-139 Convert from SearchAndSort to SearchAndSortQuery
 * ERM-79 Set supplementary informaiton for a license
 * ERM-173 Manage Tags on Agreements
 * ERM-174 Seach Agreements by Tag
 * ERM-194 BUGFIX: Opening edit/create license with only one page does not work

## 2.2.0 2019-04-08

 * ERM-115 Provide correct data for agreement line
 * ERM-111 Build Settings Page
 * ERM-112 Build Wrapper Component for supression
 * ERM-113 Use Wrapper Component in Agreements
 * ERM-114 Write tests
 * ERM-98 Rendering Controlling Terms License
 * ERM-127 Resources with no coverage set should not display
 * ERM-110 Agreement Detail record - View attached EBSCO eResource
 * ERM-109 Support the ability to create an agreement from eHoldings
 * ERM-108 Supress agreements app functions
 * ERM-64 Show Controlling License Terms

## 2.1.0 2019-03-22
 * ERM-130 Sort order of multiple coverage statements should be ascending by start date
 * ERM-129 Cannot edit custom coverage dates once they have been added
 * ERM-90 Display identifiers in e-resource preview pane
 * ERM-89 Display identifiers in e-resource search & sort
 * ERM-78 General license note (on agreement) should not display if not populated
 * ERM-65 Manage custom entitlement coverage for titles
   * ERM-91 Indicate the coverage for a title within an Agreement

## 2.0.3 2019-03-12
 * ERM-59 Manage licenses linked to agreements
 * ERM-46 Update note about a license for an agreement
 * ERM-41 Manage external licenses for an Agreement
   * ERM-44 Remove an external license from an Agreement
   * ERM-43 Edit external license details
   * ERM-42 Add external license for an Agreement
 * ERM-35 Filter Agreement Search Results by Organisation Role
 * ERM-7 Add an Organisation to a License
   * ERM-29 Create and use erm-stripes-components repo

## 2.0.1 2019-02-23

 * ERM-1 eResource Managers can manually create licenses
 * ERM-6 Set pre-defined Terms for a License
 * ERM-7 Add an Organisation to a License
 * ERM-8 Add an Organisation to an existing License
 * ERM-10 Remove an Organisation from a License
 * ERM-11 eResource Managers can edit basic license details
 * ERM-12 Filter License Search Results by License Status
 * ERM-13 Filter License Search Results by License Type
 * ERM-16 Set open-ended License Expiry
 * ERM-17 See basic License details in search results
 * ERM-35 Filter Agreement Search Results by Organisation RoleZ

## 2.0.0 2019-01-18

* Upgrade to Stripes 2.0
* Use @folio/stripes-erm-components for shared components.
* Added ability to set External Licenses for Agreements.

## 1.3.0 2019-01-18

* Added support to enable ui-plugin-find-agreement.
* Added Organizations filter to Agreements.

## 1.2.0 2019-01-04

* Work on controlled vocab settings
* Added ability to add internal contacts to Agreements.

## 1.1.0 2018-12-11

* Added Basket
* Removed Titles and KB views.
* Added ability to add entitlements to Agreements
* Added ability to add organizations to Agreements

## 1.0.0 2018-11-24

* New app created with stripes-cli
* Added Agreements, Titles, and KB list views.
* Added Agreement detail view.
* Added Agreement lines view.
* Added E-resources pane, list, and detail view.
