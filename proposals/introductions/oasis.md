# OASIS Discovery Mechanisms (DRAFT)

## MQTT
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

## Other
- [WS-Discovery](https://docs.oasis-open.org/ws-dd/discovery/1.1/wsdd-discovery-1.1-spec.html)
