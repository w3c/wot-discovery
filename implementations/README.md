# WoT Discovery
## Implementations
The following are meant to be implementations of directories in the current spec and will be used for validation of the directory service specification.

* [Fraunhofer - LinkSmart](https://github.com/linksmart/thing-directory): Open-source implementation of the directory with Registration, Search (JSONPath, XPath), and Notification APIs.
* [UPM - WoTHive](upmoeg_tdd.md): Detail TDB.  JSON Path, XPath, and SPARQL.
* [Siemens - TDB](siemens_tdd.md): Detail TDB.  JSON Path, SPARQL.

A detailed table of supported features for each implementation will be listed in Implementation Report.  Link TBD.
An implementation may support features not in the standard, but these will not be covered in the 
Implementation Report; please see the documentation of individual implementations for additional features.

Self-description also needs to be tested:
* List TDs supporting 

In addition, the following introduction mechanisms have been implemented and tested:
* Direct URL
* [Hitachi - DNS-SD/mDNS](implementations/hitachi_intro.md)
* DID
* others...
