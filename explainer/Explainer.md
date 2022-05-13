# Web of Things (WoT) Discovery Explainer
The purpose of WoT Discovery is to define a mechanism to distribute WoT Thing Descriptions
in a manner that is accessible but also satisfies security and privacy objectives.
It is an optional feature of the WoT Architecture in that WoT TDs can also be 
obtained by other means, for example by using a normal database.  However, 
WoT Discovery is meant to address use cases where IoT devices from different
vendors need to be integrated, or where a large number of IoT services need to be 
searched in a consistent way.

## Introduction

## Relationship to Other WoT Deliverables
For a general introduction to the Web of Things (WoT) Architecture, including a description
of all normative and informative deliverable, please see the 
[WoT Architecture explainer](https://github.com/w3c/wot-architecture/blob/main/explainer/explainer11.md)
and the [WoT Architecture document](https://w3c.github.io/wot-architecture/).

Since the purpose of the WoT Discovery deliverable is to normatively
define a mechanism to distribute WoT Thing Descriptions,
the [WoT Thing Description 1.1 document](https://w3c.github.io/wot-thing-description/) is
especially relevant.  The WoT Discovery specification also includes a Thing Model,
defined in this deliverable,
which normatively defines many aspects of the Thing Description Directory service specified
as part of the discovery process.  

## Use Cases and Requirements
In general, WoT Use Case and Requirements have been collected from a large number 
of participants and are collected in the 
[WoT Use Cases and Requirements document](https://w3c.github.io/wot-usecases/).
In the following we extract a few of the most critical requirements and motivating
use cases driving the design of WoT Discovery.

### Integration
It is often the case in IoT systems that devices provided by different manufacturers
need to be integrated together.  For example, consider a Retail use case
where a door sensor, a temperature sensor, and an RGB light need to be integrated
with an automation to indicate when a freezer door has been left open or the 
temperature is out of range.  As another example, we might want to integrate an
accessibility control, such as a blow switch, with an IoT device that operates a 
light or calls an elevator.  In these cases, it is not enough to have a common
interface description format, which the WoT TD provides.  We also need a standard
way to find and fetch the TDs for specific devices so that they can be integrated.

### Public IoT Services
In a Smart City, we may want to provide access to IoT devices as a public service,
for example to report local air quality conditions.  In Retail, we may want to
make available semi-public services (perhaps requiring pre-registration) to access
accessiblity devices, such as chair lifts.  In this case, a user wants to discover
services, probably selected from a large number, that meet some criteria, such
as location or type.

### Privacy and Security
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
on a LAN where the CA system available on the rest of the internet is not easy
to apply.  In general we require strong controls on the distribution of data from
WoT Things in general and WoT Discovery results in particular when access is public, and 
best-effort controls on private networks such as LANs.

## Architecture
The architecture has been designed with the following goals in mind:
- Security and privacy.
- Ease of use.
- Integration with existing ecosystems.
- Both local and global access.
- Scability to large numbers of Things.
- Support for both self-description and external descriptions.
Some of these are in conflict.  For example, while we want to integrate with
existing ecosystems, we don't want to expose users to known or potential 
security hazards in those ecosystems.  

In general, WoT Discovery is about distribution of TDs, while
privacy and security are about restricting distribution of information
only to verified authorized parties.  Taken together, WoT Discovery should enable
the distribution of TDs only to verified and authorized parties.

The WoT Discovery architecture is designed to address these challenges.
We use a two-phase approach.  In the first phase, which we call "Introductions",
we support any number of open discovery mechanisms whose results, however,
are constrained to simple URLs.  These URLs should not contain any metadata themselves.
Instead, they have to be resolved into "Exploration" services which can be used
to retreive metadata. Exploration services, however, are tasked with 
authenticating and checking the authorizations of requests, and protecting
queries and the transmission of results, and can use best
practices from web services to do so, including (for example) OAuth and TLS.

### Introduction Mechanisms
Introduction mechanisms allow for ecosystem integration and using different "first contact"
mechanisms in different circumstances.  For example, in a Smart City, we might
want to use a normal web search to find suitable WoT Discovery exploration
services for that city.  In a Smart Home, we might use other mechanisms 
restricted to a single LAN, such as mDNS in combination with DNS-SD.  If simply
want to tell someone where to go, we can just use written URLs or QR codes.

The security and privacy of WoT Discovery does not depends on Introduction
mechanisms being secure.  They must ONLY distribute URLs, and those URLs should
not have metadata embedded in them.

### Exploration Mechanisms
Exploration mechanisms come in two different forms: directories and self-description.
Both of these are HTTP-based web services and support existing mechanisms
for authentication, authorization, and secure transport.

A WoT Thing Description Directory (TDD) is an HTTP-based Thing itself, described
with a Thing model.
A TDD supports
a queryable interface to a database of Thing Descriptions.  This supports
use cases like a Smart City, Factory, or even a Smart Home where there
might be hundreds or thousands of Things to select from.

Self-description is supported by the ability of an HTTP-based Thing to
return a TD directly.  There is also an Introduction mechanism that allows
the URL for self-description on a Thing to be guessed using a well-known
URL convention based only on the base IP address of the Thing.  In this
exploration mechanism, however, the Thing itself is responsible for managing
authentication and authorization, so it is only suitable for a small number
of users and for managing a small number of devices.  This is also an optional
feature.  It is also worth noting that it only applies to "greenfield"
devices built from the outset to support the Web of Things.  For "brownfield"
devices the TD describing how to access a devices must be obtained elsewhere.
In this case a TDD is a better solution also.

## Non-Goals
- Onboarding: WoT Discovery and WoT in general only define the behavior of devices
after they have been provisioned (provided with identities and associated keys and
certificates) and access controls for users have been allocated.  In other words,
WoT Discovery is designed to validate existing credentials, not to establish them.
- Distribution of Security Data: WoT Discovery, and WoT Thing Descriptions,
are not designed for the distribution of security information, including public
keys.  The latter are technically public but additional controls are needed to ensure
their integrity, and there are existing mechanisms to do so (e.g. certificates)
that should be used.  WoT Discovery and WoT TDs, however, do contain security *metadata*
about how a Thing can be accessed, *if* the requestor has access to the associated
private security data (tokens, passwords, etc).
- Definition of New Security Mechanisms: WoT Discovery uses existing security
mechanisms to provide the necessary protection.  It does not define new ones.

## Implementations
Implementations are described in more detail in the WoT Discovery Implementation Report,
but in summary the following four implementations of the WoT Discovery TDD service
has been performed:
- LogiLabs TDD - An implementation supporting SPARQL queries, sponsored by Siemens.
- WoT Hive TDD - An implementation supporting SPARQL queries, sponsored by Universidad Politécnica de Madrid.
- TinyIoT TDD - An implementation supporting JSONPath queries, forked from an 
  initial implmentation done by Fraunhofer as part of the LinkSmart project.
- Minimal TDD - An implementation that intentionally includes only the core
  features designed to support static implementations, such as devices statically
  hosting multiple separate sensors.  Done by Intel.
Except for the last implementation, all of these WoT TDD implementations also
support registration and management of a dynamic database of TDs.

There are other aspects of WoT Discovery that also need to be considered.
We define a "Discoverer" as an entity that uses the WoT Discovery process to retrieve
a TD.  We have a number of implementations of Discoverers, including integration into the 
Eclipse node-wot project (an implementation of the informative 
[WoT Scripting API](https://github.com/w3c/wot-scripting-api/) and
two integrations into Node-RED, a popular open-source IoT automation system.
In addition to directories, Discoverers also exercise various Introduction
mechanisms and may also fetch TDs directly from Things themselves.

Finally, implementations of self-description WoT Discovery Exploration
mechanisms have been incorporated into many Thing implementations.

## Related Work
