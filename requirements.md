# WoT Discovery (Preliminary)

## Requirements

The WoT discovery process should have the following capabilities:

### System
* Support discovery via third-party services (e.g. a directory service) in order to support sleeping devices
* Support WoT Scripting Discovery API

### Localization, Search, and Filtering
* Support peer-to-peer (self-identifying), local (network segment), and global (internet-wide) discovery
* Support various forms of query, including keyword, template, and semantic queries

### Data Management
* Support both Dynamic and Static TDs
* Automatically clean up TDs for devices that are no longer accessible

### Security
* Support best known methods for authentication
* Support authorization and role management

### Privacy
* Support authentication and authorization mechanisms that do not reveal user identities
* Support device and information lifecycle, trust management, access controls
* Distribute TDs only to authenticated and authorized users
* Don’t leak metadata or queries to unauthorized entities

### Alignment with Existing Standards
* Align with IETF CoRE Resource Directories, CoRE Link Format, and DID.
* Be accessible via a variety of existing discovery mechanisms,
  including DNS-SD, DNS-SRV, DHCP, QR codes, and Bluetooth beacons.

