# OASIS Discovery Mechanisms (DRAFT)
Discovery mechanisms standardized by OASIS, under discussion within OASIS,
or related to protocols standardized by OASIS.

## MQTT
MQTT itself is standardized by OASIS. 
- There is no standard mechanism for discovering MQTT broker.
- [MQTT-SN (MQTT for sensor Networks)](https://www.oasis-open.org/committees/document.php?document_id=66091&wg_abbrev=mqtt)
  - UDP-based
  - Advertise a broker presence by ADVERTISE message.
    - no information other than the gateway's ID can be advertised.
- [MQTT Discovery in Home Assistant](https://www.home-assistant.io/integrations/mqtt/#mqtt-discovery)
  - Note: Not an OASIS standard, but based on MQTT
  - They have predefined topic for Discovery:
    - `<discovery_prefix>/<component>/[<node_id>/]<object_id>/config` where:
        - `discovery_prefix`: default to `homeassistant`
        - `component`: `binary_sensor` etc.
        - `node_id`: ID of the node
        - `object_id`: ID of the device
    - payload is serialized JSON object.

## Other
- [WS-Discovery](https://docs.oasis-open.org/ws-dd/discovery/1.1/wsdd-discovery-1.1-spec.html)
