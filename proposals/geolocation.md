# WoT Discovery
## Geolocation
Geolocation support for discovery includes two loosely-coupled
specifications: an information model for geolocation data itself,
which might be encoded in TDs or returned as data from properties,
and a query mechanism to filter such data by location and time
during discovery.

Filtering by time of last update potentially could be broken out
as a separate proposal since it is applicable to data other than
location.  However, location is special since the discovery mechanism needs to
track it to provide geolocation queries.  Queries over other kinds of
data would require additional requirements for discovery e.g. a 
time-series database for arbitrary structured data, 
and this is currently out of scope.

### Use Cases
The following use cases are relevant to geolocation.  Details 
are in the [WoT Use Cases and Requirements](https://w3c.github.io/wot-usecases/) document, we
only summarize here.
#### Smart City
Geolocation shows up in many [Smart City use cases](https://w3c.github.io/wot-usecases/).
For example, a [Smart City dashboard](https://w3c.github.io/wot-usecases/) 
colocates infrastructure data and (ideally live) data from sensors
on a map.  This alone has many applications:
* City planning 
* Emergency response
* Pollution monitoring
* Sensor placement and orientation during installation
* Building permits - "call before digging"
Some of these use cases, e.g. emergency response, may also involve
control of actuators through the dashboard.
Other Smart City use cases for geolocation are health monitoring and logistics tracking.
#### AR Guide
An [AR Guide](https://w3c.github.io/wot-usecases/) presents data on a display overlaid with the real word
and needs to associate data with its real-world location.  Note in
addition that it is the location of the feature of interest that matters,
not the location of the sensor.  For some "remote" sensor types (for example, an
IR camera measuring the temperature of water in a river) these are not the 
same thing.
* Situational awareness
* Tourism
* Maintenance and Repair
#### Accessibility
Location is often important for [accessiblity services](https://w3c.github.io/wot-usecases/) in particular if they
support mobility or if the user needs to navigate to them.
* Location of accessible services
* Navigational assistance
#### Agriculture
[Open-field agriculture](https://w3c.github.io/wot-usecases/) involves tracking many 
sensors (e.g. moisture sensors) and actuators (e.g. sprinklers) distributed over
an outdoor space.  In this case, the geolocation data is often relative to a local reference (for example the
most useful depth reference is the ground surface, not absolute elevation) and over a relatively small area.

### Usage Patterns
#### Static
Location and orientation are set during installation of device.
May support periodic but infrequent updates.

In this case, location and orientation can be embedded in the TD.

#### Dynamic
Location and orientation are changing over time.
Implies need for timestamps.
May want to support history.
May want to estimate or predict trajectories.
Accuracy becomes a cone of uncertainty projected into the future.

In this case, location and orientation can be embedded may be accessible as
a property, or a combination of low-accuracy information in the TD updated 
at a low rate combined with more accurate data available from the Thing 
directly.

### Information Model
This information model is designed only to be used on the surface of
the Earth.  Extraterrestrial applications will have to use a different
information model.

In general, each geolocation record will be an object with a set of
fields for different aspects of geolocation.  Each field has 
additional elements specifying properties of that aspect such as
accuracy and units.  Some elements have default values.  If an element
does not, then it is mandatory.  Some numerical elements have upper and lower
bounds.  An element may also have no bounds or only one of the two bounds.

Useful references:
* [OGC GeoPose Announcement](https://www.ogc.org/pressroom/pressreleases/3132)
* [OGC GeoPose Draft](https://github.com/opengeospatial/GeoPose)

Note: it is very likely that we will update the following to align with
the OGC GeoPose JSON encoding, which has goals aligned with this proposal.
Therefore this data model should be considered merely a provisional
strawman to gather requirements and to perform tests.
However, the OGC GeoPose draft currently only specifies position (based on
latitude, longitude, and height) and orientation (either Euler angles or
quaternion) and does not deal with other elements we have considered here,
such as velocity, heading, or accuracy.  Also, the OGC spec uses UNIX epoch for
timestamps as opposed to ISO times and dates as used in the rest of the 
WoT Thing Description.

#### Position
Object name: `position`

Description: Latitude and longitude (spherical Cartesian),
following [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System).
Values are given as signed numbers with north being positive for
latitude, and east being positive for longitude.  Units for latitude
and longitude are always degrees.  Accuracy is also given but as a distance,
so the area of uncertainty is a cylinder perpendicular to the Earth's surface.

Elements:

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `latitude`     | number |  -90 |   90 |         | Degrees north of the equator; negative numbers used for south of the equator |
| `longitude`    | number | -180 |  180 |         | Degrees east of the meridian; negative numbers used for west of the meridian |
| `accuracy`     | number |    0 |      |       0 | Distance from point tangent to Earth's surface; the true location has at least a 90% probability of being within this distance.  A value of 0 implies the accuracy is not actually known. |
| `accuracyUnit` | qudt:Length |     |      | qudt:m | The units of accuracy; must be a linear length. |

We will actually be using the term "Position" as shorthand for "2D Position".
In particular, in the data encoding the "position" element is just the 2D element of
geolocation.

These are consistent with the corresponding elements of the OGC GeoPose draft.

#### Altitude
*Object name:* `altitude`

*Description:* Altitude is given relative to the Earth's surface using WGS84.
It can be given either absolutely, relative to the mean sea level
at that point, or relative to the actual surface.  

* Height above mean sealevel (elevation, WGS84)
* Height above or below surface (depth)

Depth is easier to measure when a device is installed and allows the 
true elevation to be computed with a device with more geographical information.
Depth is also more convenient when trying to locate a device.
If depth is given at a location on land, it means above/below the ground surface.
If depth is given at a location over water, it means above/below the surface of the water.
Negative numbers indicate locations below the surface.
This should be relative to the "natural" surface before man-made excavations.
For example, a location in a basement should have a negative depth.
Elevations may also be negative, in which case the reference is to a point below
mean sea level.

If an elevation is also given, then the depth is relative to that elevation
instead of the surface.

Elements:

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `elevation`    | number |      |      | local surface altitude | Altitude above mean sea level as defined by WGS84                           |
| `elevationUnit`  | qudt:Length |     |      | qudt:m | The units of elevation; must be a linear length. |
| `elevationAccuracy`     | number |    0 |      |       0 | Radius of interval around given elevation value; the true elevation has at least a 90% probability of being within this radius.  A value of 0 implies the accuracy is not actually known. |
| `elevationAccuracyUnit` | qudt:Length |     |      | qudt:m | The units of elevation accuracy; must be a linear length. |


| `depth`        | number |      |      |       0 | Altitude above elevation |
| `depthAccuracy`     | number |    0 |      |       0 | Radius of interval around given depth value; the true depth has at least a 90% probability of being within this radius.  A value of 0 implies the accuracy is not actually known. |
| `depthUnit`  | qudt:Length |     |      | qudt:m | The units of depth; must be a linear length. |
| `depthAccuracyUnit` | qudt:Length |     |      | qudt:m | The units of depth accuracy; must be a linear length. |

*Note:* OGC GeoPose uses "height" but this is relative to a frame, and it's not clear
if that frame is at sealevel or at surface level.  In the future, if we can resolve
this, we may update one of "elevation" or "depth" to "height".

#### Orientation
Both 
* 2D Heading (azimuth) - angle from north
* Incline (elevation) - deviation from vertical
* Tilt (rotation around heading)
Issues:
* Singularies e.g. at the pole
* Interpolation
* Alignment with Web API
* Represention: Euler angles, Quaternions, Vector/Angle
* Default values

#### Velocity
While velocity can be estimated from two successive positions,
if known directly it can be reported.
This is a 3D vector value defined in the coordinate system
given by the orientation.

#### Speed
An alternative simple specification of velocity when the 
velocity vector is the same as the orientation.  In this case
only a scalar providing the length of the velocity vector is given.

#### Acceleration
While this can be estimated from two successive velocity vectors
or three locations, if it can be measured at a point it can be 
reported directly.  It is useful for projecting trajectories
into the future.  Reported accelerations should subtract a 
constant of 9.80665 m/s^2 from the reported values to account
for the effect of gravity, independent of the actual value of
gravity at the location.  For applications that need additional
precision, this known constant can be added back in and a
more accurate estimate of gravity at that location subtracted
instead.

#### Time
For dynamic data, a timestamp should be provided along with the 
data so that the time of last update is known.  In combination
with motion information (velocity, acceleration) this can be used
to project uncertainty into the future.

Useful references:
* [ISO 8601 Time and Date Format](https://en.wikipedia.org/wiki/ISO_8601)
* [OWL Time](https://www.w3.org/TR/owl-time/)

#### Feature of Interest
The location of a sensor and the location of the thing being
measured may not be the same.  If only one location is given they
are assumed to be coincident.  However, for all values
versions with "foi" prepended, e.g. "foiLocation" may be used
in which case this is considered to be the location of the point
being measured, and the corresponding "plain" value,
e.g. "location", is the location of the sensor.

Useful references:
* [SSN Ontology](https://www.w3.org/TR/vocab-ssn/)
* [SOSA Ontology](https://www.w3.org/2015/spatial/wiki/SOSA_Ontology)

#### Accuracy
Clear about radius vs. interval e.g. for lat/long.
Probability of inclusion in region.
Alternatives variance, prob distribution (eg. Gaussian).
Can apply accuracy to any of the above measurements.

Useful references:
* [SSN Ontology](https://www.w3.org/TR/vocab-ssn/)

#### Units
Need to be able to specify units but should also have clear defaults.

Useful references:
* [QUDT Ontology](http://www.qudt.org/)

#### Logical Regions and Relationships
Sometimes is it more convenient to refer to a labelled region or zone
than a measured location.  These "logical" locations can be used instead
of or in addition to numerical locations.
Example of logical locations include:
* Named rooms in a building
* Floor in building
* Plots in a city
* Roads
It may also be useful to represent
connections and adjacencies between the above, although this
information model is primarily concerned with using region labels defined 
by another system that manages this information.

Useful references:
* [Indoor GML](http://www.indoorgml.net/)
* [An approach based on the ifcOWL ontology to support indoor navigation](https://www.sciencedirect.com/science/article/pii/S1110866520301122)

### JSON-LD Examples in TD

#### Static Location
Static locations may not change or only be infrequently updated.
In this case they can be stored in the TD.
A TD-relative link may included to indicate the location of this
information is in the TD but this can also be the default value.
Units by default are drawn from QUDT but it is also possible to 
specify the unit using other systems.
Note that latitude and longitude are encoded as positive and negative
numbers rather than strings with N/S and E/W designators.
This is to allow for more efficient binary encoding e.g. with CBOR.
Accuracy and units are optional.  
If accuracy is omitted it is to be considered unknown (but treated as
0 for the purposes of queries).  Units have metric defaults generally.
Depth is relative to the elevation above sea level given by
WGS85.  If elevation is omitted it is assumed that the consumer will
infer if from mapping data and the 2D position. In this case depth is
required (e.g. one or both of depth and elevation must be given).
Depth and elevation can also use different units.
Accuracy can be specified in units different from that of the 
item to which it is attached.   For latitude and longitude,
accuracy is given as a distance perpendicular to the gravity vector
at that location, i.e. the region of uncertainty is a cylinder.
```
{
  "@context": [
    "https://www.w3.org/2019/wot/td/v1",
    {
      ...
      "g": "https://www.w3.org/2019/wot/td/geo/v1"
    }
  ],
  ...
  "links": [
     {
         "href": "./g:geolocation",
         "rel": "g:geolocationOf"
     }
  ],
  "g:geolocation": {
     "position": {
        "longitude": 47.3814,
        "latitude": -68.323,
        "accuracy": 5,
        "accuracyUnit": "m"
     },
     "altitude": {
        "elevation": 238.049,
        "elevationUnit": "m"
        "depth": -1.3,
        "depthUnit": "ft"
        "accuracy": 2.5,
        "accuracyUnit": "cm"
     }
  },
  ...
  "properties": {
    ...
  }
}
```

#### Dynamic Location
When location is dynamic, i.e. for a vehicle, then it may be 
better to use a property on the actual device to retrieve this
information.  In this case the link is updated to point at the
property of the device that can be used to retreive location and
orientation.
Note that such a property could be internal to a Thing, or
could be a service referenced by other Things as in the next section.
```json
{
  "@context": ["https://www.w3.org/2019/wot/td/v1",
               {
                 ...
                 "g": "https://www.w3.org/2019/wot/td/geo/v1",
                 "qudt": "http://www.qudt.org/qudt/owl/1.0.0/quantity/"
               }
  ],
  ...
  "links": [
     {
        "href": "./properties/location",
        "rel": "g:geolocationOf"
     }
  ],
   ...
  "properties": {
    "location": {
      "title": "Get current location",
      "description": "Use sensor fusion to estimate location, orientation, and motion",
      "observable": true,
      "readOnly": true,
      "type": "object",
      "properties": {
         "position": {
            "longitude": {
                "type": number,
                "unit": "qudt:Angle"
            },
            "latitude": {
                "type": number,
                "unit": "qudt:Angle"
            },
            "accuracy": {
                "type": number
            },
            "accuracyUnit": {
                "type": "qudt:Length"
            }
         },
         "altitude": {
            "elevation": {
                "type": number,
                "unit": "qudt:Length"
            },
            "elevationUnit": {
                "type": "qudt:Length"
            },
            "depth": {
                "type": number,
                "unit": "qudt:Length"
            },
            "depthUnit": {
                "type": "qudt:Length"
            },
            "accuracy": {
                "type": number,
                "unit": "qudt:Length"
            },
            "accuracyUnit": {
                "type": "qudt:Length"
            }
         },
         "velocity": {
            "x": {
                "type": number,
                "type": "qudt:Speed"
            },
            "y": {
                "type": number,
                "type": "qudt:Speed"
            },
            "z": {
                "type": number,
                "type": "qudt:Speed"
            },
            "velocityUnit": {
                "type": "qudt:Speed"
            },
            "accuracy": {
                "type": number,
                "type": "qudt:Speed"
            },
            "accuracyUnit": {
                "type": "qudt:Speed"
            }
         },
         "acceleration": {
            "x": {
                "type": number,
                "type": "qudt:Acceleration"
            },
            "y": {
                "type": number,
                "type": "qudt:Acceleration"
            },
            "z": {
                "type": number,
                "type": "qudt:Acceleration"
            },
            "accelerationUnit": {
                "type": "qudt:Acceleration"
            },
            "accuracy": {
                "type": number,
                "type": "qudt:Acceleration"
            },
            "accuracyUnit": {
                "type": "qudt:Acceleration"
            }
         },
      },
      "forms": [
        {
          "href": "http://geolocator.thing/api/location",
          "contentType": "application/json"
        }
      ]
    }
  }
}

```

#### External Geolocation Device
A Thing may not have a built-in capability to determine its location but
may be associated with an external device, e.g. a tracker in a car.  In this
case the link can refer to a properties in an external Thing.
```json
{
  "@context": ["https://www.w3.org/2019/wot/td/v1",
               {
                 ...
                 "g": "https://www.w3.org/2019/wot/td/geo/v1"
               }
  ],
  ...
  "links": [
     {
        "href": "https://geolocator/properties/location",
        "rel": "g:geolocationOf"
     }
  ],
```

### Discovery

#### Directory Zone of Responsiblity

#### Filtered Directory Queries

#### Notifications and Geofencing

### Query Filters

#### Cylindrical Region
Latitute and longitude and radius plus and elevation interval.

#### Field of View Frustum
Flat boundaries on all six sides.
Compatible with projective geometry.

#### Logical Regions and Relationships

#### Time Intervals
Both one-side and two-sided.

### Security and Privacy
* User should not be required to reveal own location when doing a query
* Inferencing of location from directory location
* Control of data lifetimes (e.g. history)
* Protection of queries

### References
* AR GeoPose
* Indoor GML
