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
This usage pattern may include periodic but infrequent updates.

In this case, location and orientation can be embedded in the TD.

#### Dynamic
In this usage pattern location and orientation are changing over time 
at a frequency incompatible with updating data in the TD.
Data associated with particular times implies need for timestamps,
and history may also be useful in order to
estimate or predict trajectories.
Due to changes over time,
when predicting trajectories,
accuracy becomes a cone of uncertainty projected into the future.

In this case, location and orientation may be accessible as
a property, or a combination of low-accuracy information in the TD updated 
at a low rate combined with more accurate data available from the Thing 
directly.  The latter can be used to support geospatial queries
in directories, then the consumer would have to access the more
accurate and up-to-date information from the Thing itself as needed.

### Information Model
Note: This information model is designed only to be used on the surface of
the Earth.  Extraterrestrial applications will have to use a different
information model.

Geolocation is given in a "geolocation record" that is either 
embedded in the TD, returned by a property, or both (in the hybrid 
low-accuracy/high-accuracy scheme mentioned above for dynamic location).

In general, each geolocation record will be an object with a set of
fields for different aspects of geolocation.  Each field has 
additional elements specifying properties of that aspect such as
accuracy and units.  Some elements have default values.  If an element
does not have a default value, then it is mandatory.  
However, aspects themselves may be optional.
Some numerical elements have upper and lower
bounds.  
An element may also have no bounds or only one of the two bounds.

In general, aspects are designed to correspond to existing standards.
This proposal does not map exactly onto an existing standard but is
designed to allow data from other standard to be expressed using
the information model proposed.
Useful references:
* [OGC GeoPose Announcement](https://www.ogc.org/pressroom/pressreleases/3132)
* [OGC GeoPose Draft](https://github.com/opengeospatial/GeoPose)
* [OGC GeoSPARQL](https://www.ogc.org/standards/geosparql)

In particular it is very likely that we will update the following to align with
the OGC GeoPose JSON encoding, as well as the OGC GeoSPARQL geospatial
query extensions and vocabulary for SPARQL and RDF, 
both of which have goals aligned with this proposal.
Therefore this data model should be considered merely a provisional
strawman to gather requirements and to perform tests.

However, the OGC GeoPose draft currently only specifies position (based on
latitude, longitude, and height) and orientation (either Euler angles or
quaternion) and does not deal with other elements we have considered here,
such as velocity, heading, or accuracy.  Also, the OGC spec uses UNIX epoch for
timestamps as opposed to ISO times and dates as used in the rest of the 
WoT Thing Description.
Finally, we want to be able to support geospatial filters in
conjunction with JSON Path and XPath queries, not just SPARQL.

The following sections detail the various aspects of
geolocation supported by the information model.

In all aspects "accuracy" elements are to be interpreted in
alignment with the definition given in the W3C SSN Recommendation.
Accuracy defines a region (typically using a radius or an interval centered on
a reference point) that the true value has a probability of being contained
within at a 90% or greater probability.

#### Position
*Object name:* `position`

*Description:* Latitude and longitude (spherical Cartesian coordinates)
are given together
following [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System).
Values are given as signed floating point numbers with north being positive for
latitude, and east being positive for longitude.
Units for latitude and longitude are always degrees.
Accuracy is also given but as a distance,
so the area of uncertainty is a cylinder perpendicular to the Earth's surface.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `latitude`     | number |  -90 |   90 |         | Degrees north of the equator; negative numbers used for south of the equator |
| `longitude`    | number | -180 |  180 |         | Degrees east of the meridian; negative numbers used for west of the meridian |
| `accuracy`     | number |    0 |      |       0 | Distance from point tangent to Earth's surface; the true location has at least a 90% probability of being within this distance.  A value of 0 implies the accuracy is not actually known. |
| `accuracyUnit` | qudt:Length |     |      | qudt:m | The units of accuracy; must be a linear length. |

We will actually be using the term "position" as shorthand for "2D position".
In particular, 
in the data encoding the "position" aspect is just the 2D element of
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
If depth is given at a location on land,
it means above/below the ground surface.
If depth is given at a location over water,
it means above/below the mean surface level of the water.
Negative numbers indicate locations below the surface.
This should be relative to the "natural" surface before man-made excavations.
For example, a location in a basement should have a negative depth.
Elevations may also be negative, 
in which case the reference is to a point below
mean sea level.

One of either elevation or depth must be given.
If both are given,
then the depth is relative to that elevation
instead of the surface.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `elevation`    | number |      |      | local surface altitude | Altitude above mean sea level as defined by WGS84                           |
| `elevationUnit`  | qudt:Length |     |      | qudt:m | The units of elevation; must be a linear length. |
| `elevationAccuracy`     | number |    0 |      |       0 | Radius of interval around given elevation value; the true elevation has at least a 90% probability of being within this radius.  A value of 0 implies the accuracy is not actually known. |
| `elevationAccuracyUnit` | qudt:Length |     |      | qudt:m | The units of elevation accuracy; must be a linear length. |
| `depth`        | number |      |      |       0 | Altitude above elevation |
| `depthUnit`  | qudt:Length |     |      | qudt:m | The units of depth; must be a linear length. |
| `depthAccuracy`     | number |    0 |      |       0 | Radius of interval around given depth value; the true depth has at least a 90% probability of being within this radius.  A value of 0 implies the accuracy is not actually known. |
| `depthAccuracyUnit` | qudt:Length |     |      | qudt:m | The units of depth accuracy; must be a linear length. |

*Note:* OGC GeoPose uses "height" but this is relative to a frame, and it's not clear
if that frame is at sealevel or at surface level.  In the future, if we can resolve
this, we may update one of "elevation" or "depth" to "height".

#### Orientation
To fully specify a pose in addition to location we need the
three-dimensional orientation relative to the Earth's surface.
There are two key ways to 
specify this: Euler angles (rotations, in sequence, around coordinate system axes) and quaternions
(essentially a vector and a twist angle around that vector).
To be consistent with OGC GeoPose
we can allow either, but only one should be given.

Note that both are in fact specified with respect to the local tangent frame and as such will
inherit the singularities of that frame.
In particular, at the poles the Z rotation (heading)
will be ambiguous.
To resolve the ambiguity, the poles will be treated as a special case with 
the meridian being treated as a heading of 0.
This is not a continuous mapping.

##### Rotations
*Object name:* `rotations`

*Description:* Rotations around the coordinate system axes given by the local surface tangent frame.
Rotations should be applied in Z, Y, X order, corresponding respectively to
Yaw, Pitch, and Roll.  
Note that the rotation around Z is consistent with "heading" used in
the Web Geolocation API.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `x`            | number |      |      |       0 | Euler angles as defined in OGC GeoPose (X axis), in degrees                  |
| `xAccuracy`    | number |      |      |       0 | 90% confidence radii for each X axis angle                                   |
| `y`            | number |      |      |       0 | Euler angles as defined in OGC GeoPose (Y axis), in degrees                  |
| `yAccuracy`    | number |      |      |       0 | 90% confidence radii for each Y axis angle                                   |
| `z`            | number |      |      |       0 | Euler angles as defined in OGC GeoPose (Z axis), in degrees                  |
| `zAccuracy`    | number |      |      |       0 | 90% confidence radii for each Z axis angle                                   |

*Notes:* 
1. This is semantically consistent with Euler angle specification of orientation in OCG GeoPose,
   but the object structure is a little different so the angles can be differentiated from the 
   accuracy and unit information in a consistent way.
2. Note the Web API for Geolocation only mentions heading, corresponding to the "z" element.   
   If we have to translate from 
   data given by the Web API, values for the other two elements should be omitted and treated as unknown.  

##### Quaternion
*Object name:* `quaternion`

*Description:* A 3D orientation specified as a unit quaternion relative to the local surface
tangent frame.

*Elements:*
| Element Name   |               Type |  Min |  Max |   Default | Description                                          |
|----------------|--------------------|------|------|-----------|------------------------------------------------------|
| `elements`     | array of 4 numbers |      |      | [1,0,0,0] | Unit quaternion                                      |
| `accuracy`     | number             |      |      |         0 | 90% confidence radius on surface of 4-sphere         |

*Notes:* 
1. Consistent with quaternion specification of orientation in OCG GeoPose.
2. Quaternions are (mostly, except for point 4 below) mathematically equivalent to 
   a unit vector and a twist angle around that vector.
3. Even though there are four numbers, there are only three degrees of freedom as 
   a unit quaternion must have a length of 1 in 4-space.
4. There are two possible unit quaternions specifying each possible 3D orientation.
   Algebraically, unit quaternions do not map exactly the same algebraic structure
   as 3D orientation.
   Without loss of generality, the unit quaternion with the first element positive 
   should be used.
5. The default value corresponds to no rotation.
6. Quaternions are unitless.  
7. The way accuracy is specified is consistent with the way accuracy is specified
   for position, as a "distance" on the surface of a 4-sphere (hypersphere).

#### Velocity
*Object name:* `velocity`

*Description:* While velocity can be estimated from two successive positions,
if known directly at particular point in time (e.g. via a wheel tachometer on a robot) it can be reported.
This is a 3D vector value defined relative to the coordinate system
given by the orientation.
If the orientation is not given, the default
implies that the velocity will be relative to the local surface tangent frame.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `x`            | number |      |      |       0 | X component of velocity                                                      |
| `y`            | number |      |      |       0 | Y component of velocity                                                      |
| `z`            | number |      |      |       0 | Z component of velocity                                                      |
| `unit`         | qudt:Speed |  |      | qudt:M-PER-SEC | The units of all elements; must be length per unit time (speed).      |
| `accuracy`     | number |      |      |       0 | 90% confidence radius for velocity vector                                    |
| `accuracyUnit` | qudt:Speed |  |      | qudt:M-PER-SEC | unit of accuracy radius for velocity vector                           |

*Notes:*
1. Only one of velocity or speed should be given.
2. Alternative design: have a single "velocity" object, but have mutually exclusive vector and scalar fields.

#### Speed
*Object name:* `speed`

*Description:* An alternative simple specification of velocity when the 
velocity vector is the same as the orientation.  In this case
only a scalar providing the length of the velocity vector is given.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `value`        | number |    0 |      |       0 | length of velocity vector in direction provided by orientation               |
| `unit`         | qudt:Speed |  |      | qudt:M-PER-SEC | The units of value; must be length per unit time (speed).             |
| `accuracy`     | number |      |      |       0 | 90% confidence radius                                                        |
| `accuracyUnit` | qudt:Speed |  |      | qudt:M-PER-SEC | unit of accuracy radius                                               |

#### Acceleration
*Object name:* `acceleration`

*Description:* While this can be estimated from two successive velocity vectors
or three locations, if it can be measured at a point it can be 
reported directly.  It is useful for projecting trajectories
into the future.  Reported accelerations should subtract a 
constant of 9.80665 m/s^2 from the reported values to account
for the effect of gravity, independent of the actual value of
gravity at the location.  For applications that need additional
precision, this known constant can be added back in and a
more accurate estimate of gravity at that location subtracted
instead.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `x`            | number |      |      |       0 | X component of acceleration                                                  |
| `y`            | number |      |      |       0 | Y component of acceleration                                                      |
| `z`            | number |      |      |       0 | Z component of acceleration                                                      |
| `unit`         | qudt:Acceleration |  |      | qudt:M-PER-SEC2 | The units of all elements; must be length per unit time squared (acceleration).      |
| `accuracy`     | number |      |      |       0 | 90% confidence radius for acceleration vector                                    |
| `accuracyUnit` | qudt:Acceleration |  |      | qudt:M-PER-SEC2 | unit of accuracy radius for acceleration vector                           |

*Notes:* 
1. Similar scalar/vector design choices.

#### Time
*Object name:* `time`

*Description:* For dynamic data, a timestamp should be provided along with the 
data so that the time of last update is known.  In combination
with motion information (velocity, acceleration) this can be used
to project uncertainty into the future.

*Elements:*

| Element Name   | Type   |  Min |  Max | Default | Description                                                                  |
|----------------|--------|------|------|---------|------------------------------------------------------------------------------|
| `value`        | xsd:timedate |     |      |        | time in ISO timedate format               |
| `accuracy`     | number |      |      |       0 | 90% confidence radius in seconds                                                    |

*Notes:* 
1. This is a complex subject and half the OGC Geopose draft is on management of
   time and timeseries.
2. OGC Geopose uses the Unix epoch for time but this is inconsistent with the 
   use of ISO timedate in the rest of the WoT specification.  For consistency
   we will probably want to use ISO timedate.

*Useful references:*
* [ISO 8601 Time and Date Format](https://en.wikipedia.org/wiki/ISO_8601)
* [OWL Time](https://www.w3.org/TR/owl-time/)

#### Feature of Interest
The location of a sensor and the location of the thing being
measured may not be the same.  If only one location is given they
are assumed to be coincident.  However, for all values
versions with "foi" prepended, e.g. "foiPosition" may be used
in which case this is considered to be the position of the point
being measured, and the corresponding "plain" value,
e.g. "position", is the position of the sensor.

*Useful references:*
* [SSN Ontology](https://www.w3.org/TR/vocab-ssn/)
* [SOSA Ontology](https://www.w3.org/2015/spatial/wiki/SOSA_Ontology)

#### Accuracy
Can apply accuracy to any of the above measurements, and
should be consistent (if possible) with the Web Geolocation API
and SSN.

*Useful references:*
* [SSN Ontology](https://www.w3.org/TR/vocab-ssn/)

#### Units
Need to be able to specify units but should also have clear defaults.
QUDT is just one of several possible choices for a unit ontology as well.

*Useful references:*
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

*Useful references:*
* [Indoor GML](http://www.indoorgml.net/)
* [An approach based on the ifcOWL ontology to support indoor navigation](https://www.sciencedirect.com/science/article/pii/S1110866520301122)

In general, BIMs (Building Information Management systems) define ontologies for
logical relationships indoors.

### Links
Data may be encoded in the TD, as a property, or both.
To make it easier to find geolocation data a link can (must?) be given
with the relation type "geolocationOf" that consistents of a URL pointing 
at a TD and a JSON fragment specifier given as a JSON pointer.  If only
the fragment identifier is given (the URL starts with a "#") the reference 
is to be interpreted as being within the current TD.
More than one geolocation link can be given.  The specific use case for
this is when low-frequency, low-accuracy information is given in the TD (used by
a TD Directory service to perform geospatial queries) but the Thing itself provides
high-quality information in a property.  It is also possible to use a link
to refer from a Thing to another associated Thing that provides geolocation
information.

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
Note that the "geolocation" link points to the TD itself.
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
         "href": "#/g:geolocation",
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
property of the device that can be used to retrieve location and
orientation.
Note that such a property could be internal to a Thing, or
could be a service referenced by other Things as in the next section.
In this case there may also be low-accuracy information (updated at
a lower rate) embedded in the TD itself.
Two links can be used to refer to both sources of location information.
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
        "href": "#/geolocation",
        "rel": "g:geolocationOf"
     },
     {
        "href": "#/properties/location",
        "rel": "g:geolocationOf"
     }
  ],
   ...
  "g:geolocation": {
     ...
  },
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
In this case the URL has a non-empty base value (here "https://geolocator.thing/td",
but it should be a URL that resolves to an actual TD) followed by a JSON pointer
fragment identifier.
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
        "href": "https://geolocator.thing/td#/properties/location",
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
* [WGS84](https://apps.dtic.mil/sti/pdfs/ADA280358.pdf)
* [W3C SSN](https://www.w3.org/TR/2017/REC-vocab-ssn-20171019/)
* [OGC GeoPose](https://www.ogc.org/projects/groups/geoposeswg) 
   - Draft
* [Indoor GML](https://www.ogc.org/standards/indoorgml)
* [City GML](https://www.ogc.org/standards/citygml)
   - see also [City JSON](https://docs.ogc.org/cs/20-072r2/20-072r2.html)
* [GML (ISO 191136:2007)](https://www.iso.org/standard/32554.html) 
   - used by GeoSPARQL
   - see also [OGC site](https://www.ogc.org/standards/gml)
* [GeoSPARQL](https://www.ogc.org/standards/geosparql)
* [IETF JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901)
* [OCG EDR](https://www.ogc.org/standards/ogcapi-edr)
* [Owltime](https://www.w3.org/TR/owl-time/)
* [Brick Schema](https://brickschema.org/ontology/)
* [SDW Best Practices](https://www.w3.org/TR/sdw-bp/)
* [WKT-CRS](https://www.ogc.org/standards/wkt-crs)
* [Simple Features](https://www.ogc.org/standards/sfa)
   - also used by GeoSPARQL

