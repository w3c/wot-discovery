<p align="center">
  <a href="https://w3.org/wot">
    <img alt="Web of Things Homepage" src="https://www.w3.org/WoT/IG/wiki/images/8/8f/WOT-hz.svg" width="300" />
  </a>
</p>

<p align="center">
  <a href="https://w3c.social/@wot">
    <img alt="Follow on Mastodon" src="https://img.shields.io/mastodon/follow/111609289932468076?domain=https%3A%2F%2Fw3c.social"></a>
  <a href="https://twitter.com/W3C_WoT">
    <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/W3C_WoT"></a>
  <a href="https://stackoverflow.com/questions/tagged/web-of-things">
    <img alt="Stack Exchange questions" src="https://img.shields.io/stackexchange/stackoverflow/t/web-of-things?style=plastic"></a>
</p>

<p align="center">
  <a href="https://www.w3.org/TR/wot-discovery/"> <!--  REC LINK -->
    <img alt="Latest REC" src="https://img.shields.io/badge/W3C_REC-Latest-005a9c"></a>
  <a href="https://w3c.github.io/wot-discovery/"> <!--  ED LINK -->
    <img alt="Latest Editor's Draft" src="https://img.shields.io/badge/Editor's_Draft-Latest-fe914a"></a>
</p>

# Web of Things (WoT) Discovery

General information about the Web of Things can be found at https://www.w3.org/WoT/.
  
---
This is the repository for WoT Discovery discussion and specification development.
In this context, "discovery" is the automated process by which WoT Thing Descriptions may be obtained.

* [Use cases](USE-CASES/README.md): List of use cases.
* [Requirements](requirements.md): List of requirements.
* [Background](background.md): Survey of existing standards and technologies.
* [References](references.md): Normative and informative references.
* [Proposals](proposals/README.md): Detailed feature proposals.
* [Implementations](implementations/README.md): Links to implementations.

## Logistics

- Call information: We use the W3C Calendar. You can find the next CALL NAME call at https://www.w3.org/groups/wg/wot/calendar.
- [Wiki](https://www.w3.org/WoT/IG/wiki/WG_WoT_Discovery_WebConf) (contains agenda)
- [Contribution rules](#contributing)

## Publications

- [Latest Editor's Draft](https://w3c.github.io/wot-discovery/) (syncs to this repository's main branch)
- Recommendations:
  - [Version 1.0](https://www.w3.org/TR/wot-scripting-api/) 
- Other deliverables:
  - [Implementation report](https://w3c.github.io/wot-discovery/testing/report.html)

## Contributing

To propose changes, create a PR following the procedures given in the [wot repo](https://github.com/w3c/wot).
Also please create issues to note problems in the current content for which a solution is needed (ideally
issues propose a suitable solution.  It should also be clear under what condition issues have been resolved
so they can be closed when those conditions are met).

Images should be checked in as both SVG and PNG.
Both should use transparent backgrounds if possible; 
if a transparent background is not possible, use a white background.
Ensure that fonts are embedded in SVG files;
use a web browser to check rendering.
[Inkscape](https://inkscape.org/)
is recommended for native SVG editing.
If another drawing tool is used, 
ensure that both SVG and PNG are exported and check them.
In particular, 
note that drawio's default SVG export often does poor font substitution
which results in truncated labels, so make sure to embed fonts.
For drawio a 
[desktop installation](https://github.com/jgraph/drawio-desktop) is also available.

## Known Implementations

The W3C WoT collects known implementations at <https://www.w3.org/WoT/developers/>. Implementations of Discovery are found under categories 
"TD Directory (TDD) Implementations", "Runtime Implementations for TD Consumers" and "Runtime Implementations for TD Exposers". Further information
can also be found in the [implementations](implementations/README.md) folder. 
