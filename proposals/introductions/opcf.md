# OPC Foundation Discovery Mechanisms (DRAFT)

### OPC UA
- [Local Discovery Server]
  - use mDNS to advertise Discovery Server. Similar approach to WoT Discovery.
    - `_opcua-tcp._tcp.example.com. 86400 IN SRV 0 5 4840 uaserver.example.com.`
    - `   TXT path=/discoveryURL,  caps=LDS,...`
