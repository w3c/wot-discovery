# Results of accessibility self-review for Web of Things (WoT) Discovery

Answers to accessibility (FAST) review checklist [(from here)](https://w3c.github.io/apa/fast/checklist.html).

## If technology allows visual rendering of content
### [ ] There is a defined way for a non-visual rendering to be created.	
### [ ] Content can be resized.	
### [ ] Luminosity and hue contrast can adapt to user requirements.	
### [ ] Text presentation attributes can be changed.
### [ ] Visual presentation of pointers and cursors can be adjusted.
### [ ] Changing content presentation does not render it unreadable.
### [ ] Technology does not allow blinking or flashing of content, or provides a feature for users to quickly turn it off or permanently disable it.
### [ ] It is possible to make navigation order correspond to the visual presentation.

## If technology provides author control over color
### [ ] There is a mechanism for users to override colors of text and user interface components.	
### [ ] There is a feature for authors to define semantically available "color classes" that users can easily map to custom colors, and give preference to this vs. coloring objects individually.
### [ ] There is a feature for users to choose color schemata that work for them.	
### [ ] The foreground and background color of an object can be reported to the user via AT.	
### [ ] There are ways to set foreground and background colors separately for all objects.	
### [ ] Compositing rules for foreground and background colors are well defined.	

## If technology provides features to accept user input 
### [ ] There is a mechanism to label user input controls in an unambiguous and clear manner.
### [ ] Authors can associate extended help information with a control.
### [ ] If there is an input error, it is possible to associate the error message clearly with the specific control that is in error.
### [ ] There is a mechanism to report and set the state or value of controls programmatically.
### [ ] Authors can address multiple types of input hardware (keyboard, pointing device, touch screen, voice recognition, etc.), or the technology supports hardware-agnostic input methods.
### [ ] User input does not require specific physical characteristics (e.g., fingerprint readers).
### [ ] Authors can ensure a "meaningful" order of controls exists regardless of presentation.	

## If technology provides user interaction features
### [ ] For every user interface object type, the "type" of object can be exposed as a role to accessibility APIs.
### [ ] For every user interface object type, there is a clearly defined mechanism for authors to provide and / or user agents determines the "accessible name" for accessibility APIs.	
### [ ] For user interface objects that can have states, properties, or values, authors can set these and these can be exposed to accessibility APIs.	
### [ ] When providing imperative mechanisms to implement technology features (e.g., scripts), authors can expose accessibility information to accessibility APIs.
### [ ] User can obtain help information about the widget.

## If technology defines document semantics
### [ ] Authors can title Web pages.	
### [ ] Authors can title sections of content.	
### [ ] Authors can clearly indicate the target of a hyperlink and function of a control.
### [ ] Authors can indicate content language, for the page as a whole and for blocks of content.	
### [ ] Authors can support understanding of abbreviations / acronyms / initialisms, idioms, jargon, etc.
### [ ] Authors can support correct machine pronunciation of ambiguously spelled terms (e.g., in the phrase "I am content with this content" there are different correct pronunciations of the lexeme "content").
### [ ] Authors can identify regions of content, particularly the "main" region.	
### [ ] Declarative mechanisms (that have accessibility semantics pre-defined in the spec) are used to implement technology features whenever possible.
### [ ] There are unambiguous ways to express relationships between units of content, such as object nesting, ID referencing, etc.
### [ ] Prefer structural semantics to presentational semantics.
### [ ] When providing presentational semantics, they can be easily mapped to structural semantics, e.g., to support restyling or meaningful exposure to accessibility APIs.
### [ ] Support a comprehensive set of authoring use cases to minimize the need for alternative content. (e.g., don't make authors resort to text in images to get the style they want).
### [ ] Semantics allow precise and replicable location information in the document to be determined.
### [ ] Semantics exist to convey meaning that is commonly conveyed via presentation.	

## If technology provides time-based visual media (see also the Media Accessibility Checklist)
### [ ] It is possible for authors to provide detailed text descriptions, audio descriptions, or both of the important content in the media.
### [ ] It is possible for authors to synchronize descriptions with the visual content.
### [ ] It is possible for to provide descriptions even when the content is live.	
### [ ] User can pause, stop, replay media.
### [ ] Users can send output to alternate device.

## If technology provides audio
### [ ] It is possible for authors to provide transcriptions.	
### [ ] It is possible for authors to provide synchronized captions, either open (on by default for all users).
### [ ] User can adjust volume level.	
### [ ] Contrast between foreground and background audio is sufficient.
### [ ] Unnecessary background audio can be muted separately from the foreground audio.
### [ ] Technology does not include triggers for audiosensitive seizures or allows those triggers to be disabled.

## If technology allows time limits
### [ ] A feature exists to allow time limits to be extended.
### [ ] Time limits for different parts of a task, such as reading instructions vs providing input, can be set separately.

## If technology allows text content
### [ ] Authors can define non-text alternatives for text content.
### [ ] Authors can define non-text alternatives for non-text content.	

## If technology creates objects that don't have an inherent text representation
### [ ] There is a mechanism to create short text alternatives that label the object.
### [ ] There is a mechanism to create extended text alternatives for fallback content.
### [ ] Text alternatives can be semantically "rich" e.g., with page structure, text style, hyperlinks, etc.

## If technology provides content fallback mechanisms, whether text or other formats
### [ ] Authors can explicitly mark content as not needing alternative content because it does not perform an important role.	
### [ ] Content can explicitly indicate when author declined to provide alternative content.	
### [ ] Content can explicitly indicate that authoring tool is unable to generate or obtain alternative content.	
### [ ] Authors can explicitly associate alternative content with the primary content.	
### [ ] Authors can associate multiple types and instances of alternative content with primary content.
### [ ] Alternate content can be easily found from the initial content.	

## If technology provides visual graphics
This is a developing area, being explored by the SVG Accessibility Task Force.	

## If technology provides internationalization support
### [ ] Accessibility features can be internationalized to the same degree as other features.

## If technology defines accessible alternative features
### [ ] Accessible alternatives themselves meet the same bar of accessibility.

## If technology provides content directly for end-users
### [ ] Content can be encoded in a manner that allows machine transformation into accessible output.

## If technology defines an API
### [ ] If the API can be used for structured content, it provides features to represent all aspects of the content including hidden accessibility features.
### [ ] If the API relies on user agents to generate a user interface, the specification provides guidance about accessibility requirements needed to enable full interaction with the API.

## If technology defines a transmission protocol
### [ ] Use of the protocol does not cause any aspect of the content, including metadata which could contain important accessibility information, to be removed.	
### [ ] It is possible to use third-party accessibility enhancement services while using the protocol.	
