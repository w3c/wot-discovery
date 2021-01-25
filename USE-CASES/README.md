## WoT Discovery General Topics and Use Cases

NOTE: Future use-cases should use the template at
https://github.com/w3c/wot-usecases/tree/master/USE-CASES
and should be submitted to the wot-usecases repo.

### Scope
* Limit to metadata discovery (as opposed to data discovery).
** Search of historical data is useful
   but is a separate problem with additional privacy implications and goes beyond our charter.

## General Discovery Topics

The following contains some historical brainstorming. Needs to be revisited to ensure that it is all included in the official use cases document.

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


##  Discovery in a Smart Campus



**Title:** Cross-Domain Discovery in a Smart Campus



**Description:** A campus has a wide range of IoT devices distributed across their grounds. These IoT devices belong to very different domains in a smart city, such as, energy, buildings, environment, water, wearable, etc. The IoT devices are distributed across the campus and belong to different infrastructures or even to individuals. A sample topology of this scenario could be the following:



![Topology](https://drive.upm.es/index.php/s/ryXZAChj7VGbCCi/download)



In this scenario, energy-related IoT devices monitor the energy use and income in the campus, among other things. From these measurements, an Energy Management System may predict a negative peak of incoming energy that would entail the failure of the whole system. In this case, a Service or a User needs to discover all those IoT devices that are not critical for the normal functioning of the campus (such as indoor or outdoor illumination, HVAC systems, or water heaters) and interact with them in order to save energy, by switching them off or reducing their consumption. Besides, the same Service or User will look for those IoT devices that are critical for the well-functioning of the campus (such as magnetic locks, water distribution system, or fire/smoke sensors) and ensure that they are up and running. Additionally, the Service or the User, will discover relevant people's wearable to warn them about the situation.



**Actors:** Services or Users



**Status:** v0.1



**Includes:** Semantic discovery



**Rationale / trigger:** A (SPARQL) query is sent in order to discover suitable IoT devices.



**Preconditions:**



- i) Query is expressed with specific-domain terms (not only with terms from the Thing Description vocabulary).



- ii) IoT devices are registered into middle-nodes that store their Thing Descriptions, as presented in the sample topology.



- iii) Middle-Nodes are registered into others conforming different topology shapes, e.g., a tree-like topology. The Middle-Nodes *know* others thanks to this registration.



- iv) Middle-nodes must only know a sub-set of the Middle-nodes in the network, i.e., the topology is not a set of hyper connected Middle-Nodes instead Middle-Nodes should tend to have a low connectivity.



- v) Query could be answered either completely, or partially with those IoT devices registered in middle-nodes.



- vi) Middle-Nodes are able to act, or interact, only with those IoT devices connected directly to them. Therefore, discovery must rely on the cooperation of Middle-Nodes, first to find suitable IoT devices for a given searching criteria. Then, if a query to actuate must be issued, such query must be forwarded to the proper Middle-Node that can perform actions over the suitable IoT devices.



Notice that this scenario can not be solved using regular query federation. On the one hand, query federation would only broadcast the query from one Middle-Node to the others known by the former, this prevents Middle-Nodes such as the Middle-Node B to find Energy IoT devices due to the distance in the network. On the other hand, broadcasting all the queries in the network could potentially flood the network, instead this scenario requires a more guided discovery rather than broadcasting.



**Invariants:** -



**Postcondition:** Query results are provided to the request and results are correct in terms of syntax and grammar. Query results can be provided either synchronously or asynchronously.



**Normal flow:** A service, or a user, sends a (SPARQL) query to the discovery endpoint of a known Middle-Node (which can be wrapped by a GUI). The Middle-Node will try to answer the query first checking the Thing Descriptions of the IoT devices registered in such Middle-Node. Then, if the query requires further discovery, or it was not successfully answered the Middle-Node will forward the query to its *known* Middle-Nodes. Recursively, the Middle-Nodes will try to answer the query and/or forward the query to their known Middle-Nodes. When one Middle-Node is able to answer the query it will forward back to the former Middle-Node the partial query answer. Finally, when the discovery task finishes, the former Middle-Node will join all the partial query answers producing an unified view (which could be synchronous or asynchronous).



*For instance, assuming Middle-Node F receives a query that asks about all the discoverable Building IoT devices in the campus. First, the Middle-Node F will try to answer the query with the Thing Descriptions of the IoT registered within. Since Middle-Node F contains some Building IoT devices a partial query answer is achieved. However, since they query asked about all the discoverable Building IoT devices Middle-Node F should forward the query to its other known Middle-Nodes, i.e., Middle-Node G. This process will be repeated by the Middle-Nodes until the query reaches the Middle-Nodes H and B which are the ones that have registered Thing Descriptions about IoT buildings. Therefore, the query will travel through the topology as follows:*



![Sample](https://drive.upm.es/index.php/s/cVPExnRNIFXJA0j/download)



*Finally, when Middle Nodes B and H compute two partial query answers, those answers will be forwarded back to Middle-Node F which will join them with its former partial query answer obtained from its registered Thing Descriptions. Finally, a global query answer will be provided.*



**Alternative flow:** -



**Remarks:** This scenario requires that discovery does not only happen locally when a Middle-Node receives the query and checks if some Thing Description registered is suitable to answer the query. Instead, the scenario requires also that the Middle-Node forwards the query through the network (topology conformed by the middle-nodes) in order to find those Middle-Nodes that actually contain relevant Thing Descriptions. Notice from the previous example that the query is not broadcasted in the network to prevent flooding, instead the Middle-Nodes follow some discovery heuristic to know where the query should be forwarded. Also, notice that in this scenario not all the Middle-Nodes have IoT registered within, they are Middle-Nodes collectors, such as Middle-Node C, I, G, and D.



**Use case history:** 17/03/2020, v0.1, Andrea Cimmino & Raúl García Castro (Universidad Politécnica de Madrid)
