# WoT Discovery
## Design (Preliminary)
This file is to document design decisions and their rationale.

### Two-Phase Architecture
The discovery process should have two main phases: an introduction phase and an exploration phase.
The introduction phase can use existing discovery mechanisms and its main output should be a pointer to 
an exploration service, but it should not provide detailed metadata for actual devices.
Instead, the exploration service should provide detailed per-device metadata after authentication.

Resolution: https://www.w3.org/2020/05/11-wot-discovery-minutes.html#resolution01

#### Notes:
1. in specialized use cases, if the exploration service is otherwise protected, authentication can be omitted.

### Standardized Directory Service

#### HTTP

#### Pagination Support
