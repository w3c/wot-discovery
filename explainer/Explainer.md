# Web of Things (WoT) Discovery Explainer
The purpose of 
[WoT Discovery](https://w3c.github.io/wot-discovery/) 
is to define a mechanism to distribute WoT Thing Descriptions
in a manner that is accessible but also satisfies security and privacy objectives.
It is an optional feature of the WoT Architecture in that WoT TDs can also be 
managed and obtained by other means, for example by using a normal database.  However, 
WoT Discovery is meant to address use cases where IoT devices from different
vendors need to be integrated, or where a large number of IoT services need to be 
searched in a consistent way.

## Introduction
WoT Discovery builds upon existing network service and IoT discovery mechanisms
but also provides secure web service APIs for searching WoT Thing Description metadata.
Discovery has to simultaneously satisfy many objectives which are in partial conflict:
it needs to make data easily available, but preserve privacy; it needs to work for small
devices and installations but also for large systems; it needs to work on small LANs and
on the internet; it needs to enable semantic search without burdening implementations; and it 
needs to support new, self-describing devices but also work with brownfield devices that
cannot be modified and so can only be described externally.

The WoT Discovery specification attempts to meet these challenges by defining
a multistage discovery process with authorization checkpoints to meet privacy and
security goals; by using scalable network API designs; by supporting a variety of
first-contact mechanisms suitable for different scales; and by providing optional
semantic search and self-description capabilities.

There are still a number of limitation in the current specification, which
primarily focuses on HTTP and CoAP, and had to defer some important goals, such as
geolocation queries.  However, the specification attempts to address the above
core issues and is intended to serve as a foundation for future work while
enabling, in its current form, use cases supporting IoT integration
and access to public IoT services.

## Relationship to Other WoT Deliverables
For a general introduction to the Web of Things (WoT) Architecture, including a description
of all normative and informative deliverables, please see the 
[WoT Architecture explainer](https://github.com/w3c/wot-architecture/blob/main/explainer/explainer11.md)
and the [WoT Architecture document](https://www.w3.org/TR/wot-architecture11/).

Since the purpose of the 
[WoT Discovery deliverable](https://w3c.github.io/wot-discovery/) is to normatively
define a mechanism to distribute WoT Thing Descriptions,
the [WoT Thing Description 1.1 document](https://www.w3.org/TR/wot-thing-description11/) is
especially relevant.
The WoT Discovery specification also includes a Thing Model,
which normatively defines many aspects of the Thing Description Directory service specified
as part of the discovery process.
Thing Models, as defined in the Thing Description 1.1 document,
are a format for describing classes of Things.
We model Thing Description Directories as a special kind of Thing.

## Use Cases and Requirements
In general, WoT Use Cases and Requirements have been collected from a large number 
of participants and are collected in the 
[WoT Use Cases and Requirements document](https://www.w3.org/wot-usecases/).
In the following we discuss use cases and 
extract a few of the most critical requirements
driving the design of WoT Discovery.

### Use Case: Integration
It is often the case in IoT systems that devices provided by different manufacturers
need to be integrated.  For example, consider a Retail use case
where a door sensor, a temperature sensor, and an RGB light need to be integrated
with an automation to indicate when a freezer door has been left open or the 
temperature is out of range.  As another example, a user might want to integrate an
accessibility control, such as a blow switch, with an IoT device that operates a 
light or calls an elevator.  In these cases, it is not enough to have a common
interface description format, which the WoT TD provides.  We also need a standard
way to find and fetch the TDs for specific devices so that they can be integrated.

Integration can take place during development time where a developer may
use Thing Models to understand the behavior of classes of devices and
build automation rules that will combine instances of these classes to create
new IoT services.  However, at installation time, to apply such automation
rules, it is necessary to search for actual instances of Thing Descriptions 
(representing installed Thing instances) satisfying the requirements of the automations.

Discovery currently targets the second half of this problem, finding Thing
instances satisfying a set of constraints.  Managing Thing Models during
development time is currently out of scope.

### Use Case: Public IoT Services
In a Smart City, we may want to provide access to IoT devices as a public service,
for example to report local air quality conditions.  In Retail, we may want to
make available semi-public services (perhaps requiring pre-registration) to access
accessiblity devices, such as chair lifts.  In this case, a user wants to discover
services, probably selected from a large number, that meet some criteria, such
as location or type.

### Requirements
WoT Discovery has been designed with the following goals in mind:
- security and privacy;
- ease of use;
- integration with existing ecosystems;
- both local and global access;
- scalability to large numbers of Things, including distributing searches over multiple directory services; and
- support for both self-description and external descriptions (to support brownfield scenarios).

Some of these are in conflict.  For example, while we want to integrate with
existing ecosystems, we don't want to expose users to known or potential 
security hazards in those ecosystems.
Making discovery simple enough to be used on small devices for self-description
while also secure and
scalable to a large number of IoT devices is also a significant challenge.

#### Key Requirement: Privacy and Security
While the purpose of the WoT Discovery process is to distribute Thing Description metadata,
it must also satisfy security and privacy constraints.
In general, TDs should only be distributed to entities after their identities have been
confirmed (authentication) and it has been established that they have the rights to view that data
(authorization).  In addition, data needs to be protected from interception and modification,
and it is also necessary to guard against other risks such as tracking or inferencing of
private data.  

The WoT Discovery architecture has been defined with safeguarding security and privacy 
as a primary goal.

The WoT Architecture and WoT Thing Description documents have additional security and
privacy considerations that are relevant to WoT Discovery.  In particular, 
the WoT Architecture document discusses when and where secure transport such as TLS
should be used, and when various access control mechanisms should be used.
The problem is complicated by the fact that we often want to access IoT devices
on a LAN where the Certificate Authority (CA) system available on the rest of the internet is not easy
to apply.  In general, we require strong controls on the distribution of data from
WoT Things and WoT Discovery results when access is public, and 
best-effort controls on private networks such as LANs.

#### Key Requirement: Scalability
WoT Discovery should be usable on small devices with only a few MB of RAM to 
large cloud services providing the ability to search thousands of IoT services
potentially available in a city. 

We did this by separating out first-contact and detailed search mechanisms,
as described in the next section.
The first-contact mechanisms can be chosen based on the scenario (i.e.
broadcast mDNS-SD might be suitable on a LAN, a search engine would be suitable
for a Smart City), while the detailed search mechanisms are web services
simple enough to implement on individual IoT devices but with good potential for scalability on
large cloud-based systems.

## Architecture
In general, WoT Discovery is about distribution of TDs, while
privacy and security are about restricting distribution of information
only to verified authorized parties.  Taken together, WoT Discovery should enable
the distribution of TDs only to verified and authorized parties.

The WoT Discovery architecture is designed to address these challenges.
We use a two-phase approach.  In the first "first-contact" phase, which we call "Introduction",
we support any number of open discovery mechanisms whose results, however,
are constrained to simple URLs.  These URLs should not contain any metadata themselves.
Instead, they have to be resolved into "Exploration" services which can be used
to retreive metadata. Exploration services, however, are tasked with 
authenticating and checking the authorizations of requests, and protecting
queries and the transmission of results, and can use best
practices from web services to do so, including (for example) OAuth and TLS.
One exploration service provides a directory supporting a scalable web API
allowing for detailed search of metadata.  Another exploration service allows
individual TDs to be distributed as web resources using standard web servers 
or to allow devices to self-describe.

### Introduction Mechanisms
Introduction mechanisms allow for ecosystem integration and using different "first contact"
mechanisms in different circumstances.  For example, in a Smart City, we might
want to use a normal web search to find suitable WoT Discovery exploration
services for that city.  In a Smart Home, we might use other mechanisms 
restricted to a single LAN, such as mDNS in combination with DNS-SD.  If we simply
want to tell someone where to go, we can just use written URLs or QR codes.

The overall security and privacy of WoT Discovery does not depend on Introduction
mechanisms being secure.  
Other than some optional and very generic information about exploration service type,
introductions must *only* distribute URLs, and those URLs should
not have metadata embedded in them.  Additional authentication and authorization
is still needed before detailed metadata is provided.

### Exploration Mechanisms
Exploration mechanisms come in two different forms: TD directories and TD servers.
Both of these can be implemented as web services using HTTP, including supporting existing mechanisms
for authentication, authorization, and secure transport.
In addition a TD server, which is intended to distribute a single TD, can also
use CoAP and can be used for self-describing Things as well as systems describing
other Things.

A WoT Thing Description Directory (TDD) is an HTTP-based Thing itself.
As a class they are described with a Thing Model and any particular
instance also has a fetchable Thing Description.
A TDD supports
a queryable interface to a searchable database of Thing Descriptions.
These Thing Descriptions can describe IoT devices or other directories,
either directly or by reference (Thing Links).
This supports
use cases like a Smart City where there
might be thousands of Things to select from.
However, it can also be used in a Smart Home with only a few dozen Things.

A TD Server is another exploration mechanism that allows a single
TD to be distributed via either an HTTP or CoAP endpoint.

Self-description is a special case of a TD Server that
enables a Thing to host and provide a TD directly.  
There is a complementary Introduction mechanism that allows
the URL for self-description on a Thing to be guessed using a well-known
URL convention based only on the base IP address of the Thing.  
In self-description, however, the Thing itself is responsible for managing
authentication and authorization, so it is only suitable for a small number
of users and for managing a small number of devices.  
Self-description only applies to "greenfield"
devices built from the outset to support the Web of Things.  For "brownfield"
devices the TD describing how to access a devices must be obtained elsewhere,
such as a TD server based on a regular web server or a TDD.

## Non-Goals
The following non-goals are out of scope of the current WoT Discovery
specification.

### Onboarding
WoT Discovery and WoT in general only define the behavior of devices
after they have been provisioned (provided with identities and associated keys and
certificates) and access controls for users have been allocated.  In other words,
WoT Discovery is designed to validate existing credentials, not to establish them.

### Distribution of Security Data
WoT Discovery, and WoT Thing Descriptions,
are not designed for the distribution of security information, including public
keys.  The latter are technically public but additional controls are needed to ensure
their integrity, and there are existing mechanisms to do so (e.g. certificates)
that should be used.  WoT Discovery and WoT TDs, however, do contain security *metadata*
about how a Thing can be accessed, *if* the requestor has access to the associated
private security data (tokens, passwords, etc).

### Definition of New Security Mechanisms
WoT Discovery uses existing security
mechanisms to provide the necessary protection.  It does not define new ones.

### Discovering Thing Models
WoT Discovery currently supports the distribution
of Thing Descriptions, which describe actual instances of Things. Thing Models
are a recent addition to the WoT architecture which permit the description of 
parameterized classes of Things. 

Technically, WoT Discovery could be extended to also support searching
for Thing Models (which are also JSON-LD) but we have deferred this 
possible support to future work
until we better understand the use cases.

### Historical Data
WoT Discovery focuses on searching metadata (Thing Descriptions),
not searching actual data or historical data returned from IoT devices.

## Design Decisions and Limitations

### No Required Query Language
We considered three different query languages: JSONPath, XPath, and SPARQL.
Unfortunately XPath, while it was recently extended to support JSON, does
not yet have enough suitable implementations of version 3.1 supporting this extension.
SPARQL is suitable for semantic search but too heavy a requirement for small IoT hubs to
make mandatory.
We would have liked to make JSONPath mandatory as it is good mix of functionality
and lightness but it is not yet standardized.  An RFC is under discussion within
IETF but the current draft JSONPath draft proposal is missing some key features we need.

In the long run (in a future specification cycle) we would like to add a standardized
version of JSONPath as a required query language so for now we have only specified an optional 
interface for SPARQL 1.1.  Interfaces for XPath 3.1 and JSONPath
queries are provided but they are informational only.

There are also use cases for small directories with static content (e.g. on
IoT devices co-hosting a small, fixed set of Things) where a query language would
be difficult to justify.

### IDs
The Thing Description specification includes optional IDs which are mapped onto
the RDF `@id`.  However, to support SPARQL queries, an `@id` is necessary in the 
information model.  Therefore
when an "anonymous" TD without an ID is registered with a Thing Description Directory,
a temporary ID is created that is local to the directory.

### Everything is a Thing
Directories maintain lists of Thing Descriptions but are also Things 
with their own Thing Description.

The reason for this is the two-phase introduction/exploration process.
There are introduction mechanisms that can only return a URL but cannot
associate a "type" with that URL. A client would then not know whether the URL is pointing
at a Thing Description or a Thing Description Directory.  We resolved this by deciding that
URLs returned by introduction mechanisms always point at Thing Descriptions,
but Thing Descriptions for Thing Description Directories have a special `@type` value.

### Static Directories
The only required affordance in a Thing Description Directory is "things",
which lists all the contents of the directory (with support for pagination and incremental transfer, however,
to deal with long responses).  The ability to register, update, and delete
Thing Descriptions in a directory is optional.

The reason for this is to support the case
of a small device that hosts multiple Things. For example, there exist
"multisensors" that host multiple independent sensors for temperature, humidity,
illumination, vibration, etc.  It is convenient for automation rules if
each of these is modelled as a separate Thing. However, for self-description,
the introduction URL needs to point at a single Thing Description.  We considered
adding a Thing Descriptions with links representing items in a collection, 
but settled on allowing small Thing Description Directories with static contents
for this use case. 

### Thing Links
We wanted to support "federated" directory services where a query can be
distributed over a set of directories.  SPARQL supports this feature but
requires the set of federated directories to be given explictly in a query.
For information modelling reasons, we wanted directories to also hold only
a set of Thing Descriptions.  In order for directories to refer to other 
directories for the purposes of federation, we support a special type of 
Thing Description, a Thing Link, whose purpose is to refer to another
Thing Description at another location.  This includes Thing Descriptions of
directories, which are a kind of Thing.  Then federated searches can be set
up by following these Thing Links.  We did not, however, make recursive searches
automatic on the server side to avoid accidental or malicious exponential
resource consumption.  Instead the client needs to explictly request searches
from linked directories, and also has to have access rights to such linked
directories.

### No Standardized Geolocation Data or Geolocation Search
Supporting geolocation was originally in our charter but unfortunately we had to defer
it.  We do have a draft proposal but need to do more work to align with existing
geolocation standards and consider privacy and security implications.  In addition,
introduction mechanisms and standardized query languages 
supporting geolocation search are currently lacking.

However, supporting this functionality is still a long-term goal for future work,
as geolocation is important in many of the WoT use cases we have collected.
IEEE P2874 is developing standardized spatial queries and the
Open Geospatial Consortium is developing RDF information models for geolocation
data; both of these may be relevant to future work.

## Implementations
Implementations are described in more detail in the WoT Discovery Implementation Report,
but in summary the following implementations of the WoT Discovery TDD service
has been performed:
- LogiLabs TDD - An implementation supporting SPARQL queries, sponsored by Siemens.
- WoT Hive TDD - An implementation supporting SPARQL queries, sponsored by Universidad Politécnica de Madrid.
- LinkSmart TDD - An early implementation done by Fraunhofer.
- TinyIoT TDD - An implementation supporting JSONPath queries, forked from an 
  the early implementation done by Fraunhofer.
- Minimal TDD - An implementation that intentionally includes only the core
  features designed to support static implementations, such as devices statically
  hosting multiple separate sensors.  Done by Intel.
Except for the last implementation, all of these WoT TDD implementations also
support registration and management of a dynamic database of TDs.

There are other aspects of WoT Discovery that also need to be considered.
We define a "Discoverer" as an entity that uses the WoT Discovery process to retrieve
a TD.  We have a number of implementations of Discoverers, including 
two integrations into Node-RED, a popular open-source IoT automation system.
In addition to directories, Discoverers also exercise various Introduction
mechanisms and may also fetch TDs directly from Things themselves.

Finally, implementations of self-description WoT Discovery Exploration
mechanisms have been incorporated into many Thing implementations.

## Related Work
Discovery in IoT has been extensively studied and there are a number of 
existing standards (please see the WoT Discovery document for links).  
As with WoT Thing Description, our goal was to build on
these, not replace them.  However, many of the existing standards are
specialized to particular constrained use cases, such as discovery on a LAN,
or to IoT-specific protocols. Also, some of the existing standards have
known security problems, e.g. UPnP.

Our solution was to incorporate the existing
standards into ours as "first contact" (introduction) mechanisms, but
to mimimize the information distributed via them to mitigate current and 
future security exposure.  Introduction mechanisms
are open (anything that returns a URL is acceptable) but the
WoT Discovery specification calls out IETF standards such as the CoRE-RD service,
DID and in particular DID document resolution, DNS-SD and mDNS, and 
QR codes.  The "exploration services" in WoT Discovery are essentially
normal web services and so can follow standards for such web services,
including secure access controls that can be updated over time.

To support semantic search (which has also been studied in the context
of IoT) we wanted to support SPARQL and use the fact that Thing Descriptions
are serialized in JSON-LD.  The WoT WG does not include defining domain-specific
vocabulary within its scope, instead we wanted to enable projects like 
OneDM/ASDF and iotschema.org that are defining common vocabularies.
