## WoT Discovery General Topics and Use Cases

NOTE: Future use-cases should use the template at
https://github.com/w3c/wot-architecture/tree/master/USE-CASES
and should be submitted to the wot-architecture repo.

### Scope
* Limit to metadata discovery (as opposed to data discovery).
** Search of historical data is useful
   but is a separate problem with additional privacy implications and goes beyond our charter.

### Template

Please select to which category your use case belongs and describe your use case with the help of this template:

**Title:**<br>
**Description:**<br>
**Actors:**<br>
**Status:**<br>
**Includes (other use case):**<br>
**Rationale / trigger:**<br>
**Precondition:**<br>
**Invariants:**<br>
**Postcondition:**<br>
**Normal flow:**<br>
**Alternative flow:**<br>
**Remarks:**<br>
**Use case history:**<br>

## General Discovery Topics

### Onboarding 

#### Discovery of Directory (McCool)
When onboarding a device, the device may need to discover the directory service to register with.

#### Discovery of Devices by Onboarding Tool
In OCF, "unowned" devices in a special "onboarding" state can be discovered by an onboarding tool and provisioned with keys.

### Peer-to-Peer (McCool)
Have an existing IoT installation.  While physically present or near the device, or on the same local network, 
want to find out what I can do with it using a browser or another tool.

### Semantic Discovery

#### Filtering and Adaptation (Koster)
Use semantic categories such as those defined by iotschema or ODM to select interactions by type rather than name,
as part of the discovery, e.g. filter parameters in a directory query.
Within an interaction, select data fields by type rather than structure.
Specific example: find an RGB light and extract data fields for each color channel
independent of the name of the property name and structure of the payload (e.g. map vs array).
Extension: additionally perform adaptation on units and scale, for instance lumens vs. percentages.
Colored lights also raise issues of color space conversion, possible nonlinear mappings, clipping, lossy conversions, etc.
A simpler motivating example would be a binary switch that adaptation still raises many questions on in the representation
of the switch state (boolean, integer, enums, etc).

### Recipes
**Title:** Recipes for easing application development<br>
**Description:** Often, IoT applications do one and the same job but must be instantiated in a different manner. An example which might serve here is a light-switch connected to a light-bulb and the light-bulb connected to a motion detection such that light on/off is triggered by manual switch, motion detection, or timer. Instead of programming the logic again and again, prepare a template that comes to life be adding the concrete instances available in the environment.<br>
**Actors:** Programmers being responsible for application development<br>
**Status:** v0.1<br>
**Includes:** Semantic discovery<br>
**Rationale / trigger:** Speed up application development by using well defined and well tested templates.<br>
**Precondition:** Standardized WoT Scripting API; Thing Descriptions for the devices in the concrete environment, semantically annotated.<br>
**Invariants:**<br>
**Postcondition:**<br>
**Normal flow:** Start a graphical user interface (see e.g. https://github.com/danicic/iotschema-node-red), load an application template, do a semantic search on the set of TDs available, instantiate the template, and run the application.<br>
**Alternative flow:**<br>
**Remarks:**<br>
**Use case history:** 3/11/2020, v0.1, @wiresio<br>

## Discovery in Plant Automation
### Understand an existing installation
**Title:** Discover features of installed devices and interaction between devices<br>
**Description:** Have a set of devices in an installation, and want to survey what devices exist and what can be done with them, what capabilities they support, with the goal of automating activities. May also be interested in services that use these devices.<br>
**Actors:** Technicians responsible for maintaining the plant operation, engineers being responsible for designing the plant<br>
**Status:** v0.1<br>
**Includes:** Semantic discovery, eventually Recipes<br>
**Rationale / trigger:** Understanding an existing installation by reading manuals or doing reverse engineering can be a cumbersome job. Discovery mechanisms might support or even replace these tasks.<br>
**Precondition:** Use protocol inherent discovery mechanisms like browsing of data points, use network discovery. Thing Descriptions for all devices, semantically annotated. Relations between things described as links in the TDs. Thing Directory storing all TDs and being located in the plant network.<br>
**Invariants:**<br>
**Postcondition:**<br>
**Normal flow:** Given a defined access point to the plant, the Thing Directory is queried in an appropriate manner. The way in which it can be queried can be manifold: It can be a precise SPARQL query send from a program, it can be a "Google like" freetext search narrowing down results in multiple stages and being carried out by a human, or something mixed eventually underpinned by ML or heuristics.<br>
**Alternative flow:**<br>
**Remarks:**<br>
**Use case history:** 3/11/2020, v0.1, @wiresio<br>

## Discovery in the Backend

### Cloud Services
I want to know what devices and services are accessible from a certain cloud provider or service.

### Database of Devices and Digital Twins
Find databases and digital twins associated with a device or service.

### Discovery of historical data from a device
I may want to access historical records of data associated with a device.
Note: is this a discovery use case?

## Discovery in Smart City Environments

### Smart City Services (McCool)

#### As a Visitor
As a visitor to a city, I want to know what services are available in a certain location, using my mobile device.

#### As a Citizen
As a citizen of a city, I want to know what services are available generally, using my mobile device or some other client.

#### Remote Query
From a remote location, I would like to access data provided by a city for planning purposes (e.g. planning a trip,
ecological studies, etc.).  Relates to support of open data portal.

## Discovery in the Smart Home

### Handoff
Buy a home, want to hand off all devices to a new user.

### Access Control
Who gets access to what?
Owner, children, visitors, meter reader, third-party manager, user-defined roles, emergency services, etc.
See also: Stakeholders defined in Arch and Security

### Proxies
I want to make a local device (or a subset of its functionality) discoverable through a proxy to an external entity or network.

### Bridges
I want to discover devices supported in a particular ecosystem a I would like to discover devices available via a bridge.

### Permission Management
?
