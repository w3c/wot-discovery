# Survey of Other Discovery Mechanisms (DRAFT)

## Current Introduction Mechanism

- Direct
- Well-known URIs
- DNS-based service discovery (DNS-SD + mDNS)
- CoRE Link Format and CoRE Resource Directory
- DID Docuemnts

## Other ecosystem's discovery mechanisms

### MQTT

- There is no standard mechanism for discovering MQTT broker.
- [MQTT-SN (MQTT for sensor Netoworks)](https://www.oasis-open.org/committees/document.php?document_id=66091&wg_abbrev=mqtt)
  - UDP-based
  - Advertise a broker presense by ADVERTISE message.
    - no information other than the gateway's ID can be sdvertised.
- [MQTT Discovery in Home Assistant](https://www.home-assistant.io/integrations/mqtt/#mqtt-discovery)
  - They have predefined topic for Discovery:
    - `<discovery_prefix>/<component>/[<node_id>/]<object_id>/config` where:
        - `discovery_prefix`: default to `homeassistant`
        - `component`: `binary_sensor` etc.
        - `node_id`: ID of the node
        - `object_id`: ID of the device
    - payload is serialized JSON object.

### OPC UA
- [Local Discovery Server]
  - use mDNS to advertise Discovery Server. Similar approach to WoT Discovery.
    - `_opcua-tcp._tcp.example.com. 86400 IN SRV 0 5 4840 uaserver.example.com.`
    - `   TXT path=/discoveryURL,  caps=LDS,...`

### Other protocol/platform/ecosystem
- DHCP Options ([RFC2132](https://datatracker.ietf.org/doc/html/rfc2132))
- SSDP ([draft-cai-ssdp-v1-03](https://datatracker.ietf.org/doc/html/draft-cai-ssdp-v1-03); expired in April 2000)
- [WS-Discovery](https://docs.oasis-open.org/ws-dd/discovery/1.1/wsdd-discovery-1.1-spec.html)


## How to incorporate new mechanism in WoT Discovery?
- It might be good to initially collect proposals *with implementation* in the form of markdown document.  After that, we can decide whether to incorporate it into the spec.
