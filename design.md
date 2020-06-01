# WoT Discovery
## Design (Preliminary)
This file is to document design decisions and their rationale.

### Two-Phase Architecture
The discovery process should have two main phases: an introduction phase and an exploration phase.
The introduction phase can use existing discovery mechanisms and its main output should be a pointer to 
an exploration service, but it should not provide detailed metadata for actual devices.
Instead, the exploration service should provide detailed per-device metadata after authentication.

Resolution: https://www.w3.org/2020/05/11-wot-discovery-minutes.html#resolution01

#### Notes:
1. In specialized use cases, 
   if the exploration service is otherwise protected,
   for instance by being on a protected private network,
   authentication MAY be omitted.

### Introduction 
The introduction phase of discovery allows a variety of mechanisms to provide
"first-contact" functionality.  Their one and only purpose is to identify one or
more exploration services.

Introductions should be as open as possible, in particular they will not
generally require authentication.  However, this leads to some constraints:
1. They should be as lightweight as possible.  In particular, servers implementing them
   should not require excessive compute resources.
2. They should not lead to additional network activity greater than the original request.
3. They should not distribute information that could lead to a breach of privacy.
The purpose of 1 and 2 is to mitigate denial-of-service attacks.  Since introductions
are open in nature, anyone can send requests to them.  They should be designed in such
a way that they do not provide a means to amplify an attacker's efforts, so should be
limited in computational complexity and not be recursive.   If support is needed that 
does require significant compute or additional network traffic, this should be handled 
as an exploration service.
Constraint 3 generally means that metadata should not be distributed directly.  Even if
device metadata does not directly contain personally identifiable information (PII), 
it may be possible to infer PII from such metadata using other information known to the 
attacker.
Metadata such as TDs or information derived from TDs,
such as device types or locations, should not be distributed via an introduction mechanism.

In some cases the same mechanism might be used as both an introducion and as an 
exploration service.  In this case, however, the functionality of the mechanism should
be appropriately limited when use as an unauthenticated introduction service.

#### Identification of Exploration
The purpose of the introduction phase is to identify one or more exploration services.
In general an exploration service will be identified by a URL.  This URL will provide
both the protocol to be used and the location.  

Resolution: TO DO

##### Notes
1. The provision of the URL of an exploration service does not mean that the requester will
   be able to access it.  
   Before an exploration service may be used generally require additional 
   authentication and authorization steps will be required.
2. The URL of an exploration service should not included metadata.  For example, in the case
   of self-describing devices, the TD may be provided by the device itself, i.e. a device
   might provide its own exploration service.  In this case the URL MUST be anonymous
   (for instance, an IP address, or a random character string) and MUST NOT include, 
   for example, information about the type of device ("https://myinsulinmonitor.local" would 
   be a poor choice).
3. Exploration services should be identified conceptually by URLs.  For schemes that do
   not currently have URLs they will have to be defined.

##### Discuss
1. An introduction service may have to include additional information to distinguish among
   different forms of exploration services.  For example, a device may be self-describing,
   returning a TD from the resource referenced by a URL; or an introduction may point at 
   a directory service instead.  If these are both referenced using HTTP URLs some other
   mechansim is needed to distinguish them.
   In introduction services that return a set of typed linked different types can be used to 
   refer to different exploration service types.  In other cases different URL formats can
   be used to distinguish them (for instance, use of a standard suffix in self-describing
   Things).
 
#### DHCP
TO DO: Consider whether DHCP records can directly identify exploration services.

#### DNS-SD
DNS-SD records can refer to exploration services.
TO DO: Define standardized service labels.
TO DO: Describe how mDNS may be used for discovery.

#### Decentralized Identifier (DID) Documents
DID Documents can refer to resources that can include exploration services.
TO DO: Define standardized type labels.

#### QR Codes
QR Codes can be used to encode the URL of an exploration service.  A simple example
would be a manufacturer's directory for devices that register with a cloud service.
Use of printed QR codes is somewhat limited by the fact they must be static.
A QR code may or may not be specific to a particular device.
In some cases it might be possible to use static URLs specific in combination with DNS.
For example, for self-describing devices,
a random URL in the "local" domain might be generated by a manufacturer and the user might
be able to use mDNS to find its dynamic IP address on the local network.

It is possible to provide dynamic information with QR codes shown on a display.
This allows for additional use cases.
For example a device might display a QR code encoding a URL based directly 
on its dynamic IP address,
or that of a local exploration service.
Encoding the IP in the URL avoids the need to use DNS.

#### EddyStone Bluetooth Beacons
Like QR codes, EddyStone Beacons can broadcast URLs.  However, since the payloads can
be dynamic more use cases can be supported than printed QR codes.  The use cases of 
EddyStone beacons are therefore similar to those of QR codes on displays.
In addition beacons provide proximity information and therefore the rough location of
the requestor.

### Exploration 
The purpose of an exploration service is to provide detailed metadata about one or more
devices.  In most cases, to protect privacy, requestors need to be authenticated and
authorized.  In addition, metadata should be provided over a secure channel that preserves
confidentiality.

### Well-Known Locations 
TO DO: Define well-known URL resource suffix for URLs pointing at TDs on self-describing
devices, such as "/.well-known/wot-td".   A GET to this location should return the TD of that
device.

### Standardized Directory Service

#### TCP/HTTP
To avoid issues with TDs being broken across fixed-size packets, we will limit discussion
to directory services based on TCP.   Furthermore, we will focus on HTTP-based protocols.
In order to support the privacy protection goals of exploration, in general TLS will be 
required (that is, HTTPS).

Notes:
1. In the long run, supporting other protocols such as CoAP may be useful.  However, to do
   so, certain complications arising from the unbounded length of TDs would have to be 
   addressed.   
2. Establishing authentication using TLS in general requires a server with a globally visible
   and fixed URL.  In the IoT context this is sometimes inconvenient, so alternative means to 
   authenticate TLS connections may be necessary.

#### JSON
The content type returned will be JSON.  It will not in general be JSON-LD but it may be
possible to extract sub-components that can be treated as JSON-LD.

Notes:
1. In the long run, supporting other content types such as XML or CBOR might be useful.
   This will have to wait for a normativ3 serialization of TDs using these encodings,
   however.
2. The reason the return data may not technically be JSON-LD is that there may not be
   a global context, and TDs (which are JSON-LD) may be returned as components of a larger
   payload, and only parts of them may be returned in some cases.

#### Pagination Support
Pagination at result granularity (up to full TD).
This would be a mandatory feature to support low-power devices.
This in the worst case might require buffering query results inside
the directory, but in cases of directories supporting queries we would
expect these to be running on relatively larger device.

#### JSONPath Query Support

#### XPath Query Support

#### SPARQL Query Support

#### Multiple Results
Directories that support queries may return more than one result.
This requires a "wrapper" structure (eg a JSON array) and possibly pagination (see above).
There may also be metadata to be associated with each result, and we will have to 
specify that the order may be non-deterministic.

#### Partial Results
Some query mechanisms, eg. JSONPath, naturally support returns of partial results, eg "part-of-TD" TD fragments.
This should be allowed as it is useful in many cases, in particular searching for the IDs and titles
of TDs matching some description, then fetching full TDs only for TDs that seem relevant in the results.
Note that other requirements e.g. for JSON LD 1.1 (if we require it) may mean that some elements, such as the `@context`,
would be mandatory in any return fragment.

#### Authentication/Authorization
The following security schemes may be supported to control access to directories:
* Basic authentication (`basic` scheme) 
* Digest authentication (`digest` scheme) 
* JWT Tokens (`bearer` scheme) 
* OAuth2 (similar to JWT tokens, but provides information about where to get the tokens)
    - TODO: which flow?  Client?  Device?
    
In general, `none` should be disallowed except in development environments.

#### Directory Network API will be Described in a TD
General Directory API design will be given in a TD Template,
with instances having a concrete TDs.
We will intercept "TD next" to allow for new features.

This raises the possibility of directories indexing other directories.
We need to consider how to index semantic information.
We need some way to "summarize" information to enable scalability (TODO: review RDF summary approaches).
Directories should also support self-description, using the "well-known-location" approach.

## Under Discussion
* Use of JSON-LD 1.1 to encode results from directory services
** Note that this would require adding `@context` elements to TD fragments.
** Also metadata in "wrapper" JSON elements mean a global context would also be needed.
** This would not add any extra requirements to devices that return a single TD (their own), since TDs are already JSON-LD.
* Allow use of WebID (certificate rather a token; would need "cert" scheme) for directory service authentication
* Use of out-of-band information model
** avoid modification of TDs in case of signed TDs for timestamps, etc.
* Query support (and format? Perhaps can just start with desired capabilities)
* Name/type registrations: DID link types, DHCP records, DNS-SD types, etc. for both devices and directories
* Kinds of directory services: fixed (.well-known), basic (keyword query, eg JSONPath/XPath), advanced (SPARQL).
