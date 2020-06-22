# Thing Description for Thing Directory

## Authors
* Ben Francis, Krellian, ben@krellian.com
* Michael Stegeman, Mozilla, mstegeman@mozilla.com

## Abstract
This is a high level proposal for describing a Thing Directory in a WoT Thing Description such that a gateway or directory service could itself be described as a web thing.

This idea came out of the WebThings Gateway project which currently uses a different approach to expose a list of Thing Descriptions, but the approach described here was thought to be a potential better approach.

## Background
Mozilla's [WebThings Gateway](https://iot.mozilla.org/gateway/) is an open source smart home hub which acts as a Web of Things gateway and currently exposes a directory of things via a [`Things`](https://iot.mozilla.org/wot/#things-resource) endpoint of its REST API, which resolves to a list of Thing Descriptions of the devices the gateway manages.

Over time the team [realised](https://github.com/mozilla-iot/schemas/issues/35) that a potential better solution would be to define a [capability schema](https://iot.mozilla.org/schemas/) for WoT gateways such that a gateway could have its own Thing Description. This Thing Decription could then describe properties, actions and events for the gateway device itself, and provide a list of links to Thing Descriptions for the devices it manages.

## Proposal
### Example

Example Thing Description for a gateway:
```json
{
  "title": "WebThings Gateway",
  "@context": "https://iot.mozilla.org/schemas/",
  "@type": "Directory",
  "actions": {
    "addThing": {
      "title": "Add Device",
      "@type": "AddThingAction",
      "input": {
        "type": "string"
      }
    },
    "removeThing": {
      "title": "Remove Device",
      "@type": "RemoveThingAction",
      "input": {
        "type": "string"
      }
    }
  },
  "events": {
    "thingAdded": {
      "title": "Device Added",
      "@type": "ThingAddedEvent",
      "data": {
        "type": "string"    
      }
    },
    "thingRemoved": {
      "title": "Device Removed",
      "@type": "ThingRemovedEvent",
      "data": {
        "type": "string"    
      }
    },
    "thingUpdated": {
      "title": "Device Updated",
      "@type": "ThingUpdatedEvent",
      "data": {
        "type": "string"    
      }
    }
  },
  "security": { ... },
  "links": [
    {
      "rel": "item",
      "href": "/things/thing1",
      "type": "application/td+json"
    },
    {
      "rel": "item",
      "href": "/things/thing2",
      "type": "application/td+json"
    },
    {
      "rel": "item",
      "href": "/things/thing3",
      "type": "application/td+json"
    }
  ]
}
```

### Features
* The Thing Description has a `@type` of `Directory` (defined here using a reference to Mozilla's own schema repository, but this could be defined elsewhere)
* The Thing Description has an `AddThingAction` and `RemoveThingAction` to add and remove web things respectively. In the case of gateways such as WebThings Gateway, a `StartPairingAction` is also available to initiate a pairing process to discover local devices using wireless protocols like Zigbee and Z-Wave as well as discovering devices on the local network via DNS-SD broadcasts.
* The Thing Description has a `ThingAddedEvent`, `ThingRemovedEvent` and `ThingUpdatedEvent` to notify clients when devices are added and removed from the gateway or their Thing Descriptions are updated
* The Thing Description includes links to Thing Descriptions of the devices it manages, each with a link relation of type `item` (this seemed like the most obvious existing link relation type, but a new type could be defined)

### Usage
1. In the [introduction phase](https://github.com/w3c/wot-discovery/blob/master/proposals/directory.md#introduction-phase-first-contact-mechanism) the top level Thing Description of the gateway/directory can be discovered by a client using an external mechanism like mDNS/DNS-SD broadcasts, Bluetooth beacon, etc.
2. In the [exploration phase](https://github.com/w3c/wot-discovery/blob/master/proposals/directory.md#exploration-phase-directory) a client can get the Thing Description for the gateway, which includes a list of links to Thing Descriptions of the devices it manages, actions to add and remove devices and events to notify the client when devices are added and removed or their Thing Descriptions are updated
3. The Thing Descriptions of individual devices can be fetched with an HTTP `GET` request on their individual Thing Description URLs

## Open issues
1. How should a client initially authenticate with a gateway in order to be authorised to get its list of Thing Descriptions? The Thing Description for the gateway can provide security metadata, but a client can only access this metadata if it is already authorised to fetch the Thing Description, rendering it useless. Could the gateway/directory initially serve a stripped-down Thing Description which only contains security metadata?
2. How should a client search the gateway for a list of devices meeting certain criteria (e.g. get a list of devices for a given device type)? The interaction affordances of the Thing Description could be extended to support such use cases.
3. Due to the complexity of different smart home protocols and pairing mechanisms the WebThings Gateway has a separate concept of pairing/unpairing devices with the gateway at the protocol level and adding/removing devices from the gateway's database. In practice it may be necessary to represent these actions separately in the Thing Description.
    * An example is the aforementioned `StartPairingAction`.
