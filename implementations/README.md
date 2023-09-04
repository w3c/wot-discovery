# WoT Discovery
## Implementations
The following are the implementations of directories in the current spec and will be used for validation of the directory service specification.

| Organization | Name | License | Language | APIs |
|---|---|---|---|---|
| Fraunhofer | [LinkSmart Thing Directory][1] | Apache 2 | Go | Registration, Notification, Search (JSONPath, XPath) |
| UPM | [WoT Hive][2] | Apache 2 | Java | Registration, Notification, Search (JSONPath, SPARQL) |
| Siemens | Logilab TDD | Proprietary | Python | Registration, Search (SPARQL) |


A detailed table of supported features for each implementation will be listed in Implementation Report.  Link TBD.
An implementation may support features not in the standard, but these will not be covered in the 
Implementation Report; please see the documentation of individual implementations for additional features.

Self-description also needs to be tested:
* Intel - Camera
* Intel - Speech
* List additional TDs supporting here

In addition, the following introduction mechanisms have been implemented and tested:
* Direct URL
* DNS-SD/mDNS
    * [Hitachi - DNS-SD/mDNS](implementations/hitachi_intro.md)
    * wot-rust [wot-discovery][3]
* DID
* others...


[1]: https://github.com/linksmart/thing-directory
[2]: https://github.com/oeg-upm/wot-hive
[3]: https://github.com/wot-rust/wot-discovery
