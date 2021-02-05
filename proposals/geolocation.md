# WoT Discovery
## Geolocation
Geolocation support for discovery includes two loosely-coupled
specifications: an information model for geolocation data itself,
which might be encoded in TDs or returned as data from properties,
and a query mechanism to filter such data by location and time.

Note: filtering by time of last update potentially could be broken out
as a separate proposal since it is applicable to data other than
location.  However, location is special since the Directory needs to
track it to provide geolocation queries.  Queries over other kinds of
data would require additional requirements in the Directory e.g. a 
time-series database, and this is currently out of scope.

### Use Cases
The following use cases are relevant to geolocation.  Details 
are in the [WoT Use Cases and Requirements](link) document, we
only summarize here.
#### Smart City Dashboard
A Smart City dashboard locates infrastructure data and data from sensors
together on a map.  This has many applications:
* City planning 
* Emergency response
* Pollution monitoring
* Sensor placement and orientation during installation
* Building permits - "call before digging"
#### AR Guide
* Situational awareness
* Tourism
* Maintenance and Repair
#### Accessibility
* Location of accessible services
* Navigational assistance

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

#### 2D Position
Latitude and longitude (spherical Cartesian), following WGS85.
Values are given as signed numbers with north being positive for
latitude, and east being positive for longitude.

#### Altitude
Altitude is given relative to the Earth's surface using WGS85.
It can be given either absolutely, relative to the mean sea level
at that point, or relative to the actual surface.  
* Height above mean sealevel (elevation, WGS85)
* Height above or below surface (depth)

Depth is easier to measure when a device is installed and allows the 
true elevation to be computed with a device with more geographical information.
Depth is also more convenient when trying to locate a device.
If depth is given at a location on land, it means above/below the ground surface.
If depth is given at a location over water, it means above/below the surface of the water.
Negative numbers indicate locations below the surface.
This should be relative to the "natural" surface before man-made excavations.
For example, a location in a basement should have a negative depth.

If an elevation is also given, then the depth is relative to that elevation
instead of the surface.

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

#### Feature of Interest
The location of a sensor and the location of the thing being
measured may not be the same.  If only one location is given they
are assumed to be coincident.  However, for all values
versions with "foi" prepended, e.g. "foiLocation" may be used
in which case this is considered to be the location of the point
being measured, and the corresponding "plain" value,
e.g. "location", is the location of the sensor.

#### Accuracy
Clear about radius vs. interval e.g. for lat/long.
Probability of inclusion in region.
Alternatives variance, prob distribution (eg. Gaussian).
Can apply accuracy to any of the above measurements.

#### Units
Need to be able to specify units but should also have clear defaults.

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
See Indoor GML.

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
