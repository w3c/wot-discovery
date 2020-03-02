# WoT Discovery

## Possible Use Cases - Brainstorming

Those with names next to them have been priortized and will be written up using the full template.

### Onboarding 

#### Discovery of Directory (McCool)
When onboarding a device, the device may need to discover the directory service to register with.

#### Discovery of Devices by Onboarding Tool
In OCF, "unowned" devices in a special "onboarding" state can be discovered by an onboarding tool and provisioned with keys.

### Peer-to-Peer (McCool)
Have an existing IoT installation.  While physically present or near the device, or on the same local network, 
want to find out what I can do with it using a browser or another tool.

### Plant Automation
Have a set of devices in an installation, and want to survey what devices exist and what can be done with them,
what capilities they support, with the goal of automating activities.
I may also be interested in services that use these devices, so may want to do a kind of "reverse lookup".

### Cloud Services
I want to know what devices and services are accessible from a certain cloud provider or service.

### Smart City Services (McCool)

#### As a Visitor
As a visitor to a city, I want to know what services are available in a certain location, using my mobile device.

#### As a Citizen
As a citizen of a city, I want to know what services are available generally, using my mobile device or some other client.

#### Remote Query
From a remote location, I would like to access data provided by a city for planning purposes (e.g. planning a trip,
ecological studies, etc.).  Relates to support of open data portal.

### Database of Devices and Digital Twins
Find databases and digital twins associated with a device or service.

### Discovery of historical data from a device
I may want to access historical records of data associated with a device.
Note: is this a discovery use case?

### Smart Home

#### Handoff
Buy a home, want to hand off all devices to a new user.

#### Access Control
Who gets access to what?
Owner, children, visitors, meter reader, third-party manager, user-defined roles, emergency services, etc.
See also: Stakeholders defined in Arch and Security

### Proxies
I want to make a local device (or a subset of its functionality) discoverable through a proxy to an external entity or network.

### Bridges
I want to discover devices supported in a particular ecosystem a I would like to discover devices available via a bridge.

### Permission Management
?

## Semantic Discovery

### Filtering and Adaptation (Koster)
Use semantic categories such as those defined by iotschema or ODM to select interactions by type rather than name,
as part of the discovery, e.g. filter parameters in a directory query.
Within an interaction, select data fields by type rather than structure.
Specific example: find an RGB light and extract data fields for each color channel
independent of the name of the property name and structure of the payload (e.g. map vs array).
Extension: additionally perform adaptation on units and scale, for instance lumens vs. percentages.
Colored lights also raise issues of color space conversion, possible nonlinear mappings, clipping, lossy conversions, etc.
A simpler motivating example would be a binary switch that adaptation still raises many questions on in the representation
of the switch state (boolean, integer, enums, etc).

