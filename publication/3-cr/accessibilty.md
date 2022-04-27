# Results of accessibility self-review for Web of Things (WoT) Discovery

Answers to accessibility (FAST) review checklist [(from here)](https://w3c.github.io/apa/fast/checklist.html).

## If technology allows visual rendering of content
1. [ ] There is a defined way for a non-visual rendering to be created.	
2. [ ] Content can be resized.	
3. [ ] Luminosity and hue contrast can adapt to user requirements.	
4. [ ] Text presentation attributes can be changed.
5. [ ] Visual presentation of pointers and cursors can be adjusted.
6. [ ] Changing content presentation does not render it unreadable.
7. [ ] Technology does not allow blinking or flashing of content, or provides a feature for users to quickly turn it off or permanently disable it.
8. [ ] It is possible to make navigation order correspond to the visual presentation.

## If technology provides author control over color
1. [ ] There is a mechanism for users to override colors of text and user interface components.	
2. [ ] There is a feature for authors to define semantically available "color classes" that users can easily map to custom colors, and give preference to this vs. coloring objects individually.
3. [ ] There is a feature for users to choose color schemata that work for them.	
4. [ ] The foreground and background color of an object can be reported to the user via AT.	
5. [ ] There are ways to set foreground and background colors separately for all objects.	
6. [ ] Compositing rules for foreground and background colors are well defined.	

## If technology provides features to accept user input 
1. [ ] There is a mechanism to label user input controls in an unambiguous and clear manner.
2. [ ] Authors can associate extended help information with a control.
3. [ ] If there is an input error, it is possible to associate the error message clearly with the specific control that is in error.
4. [ ] There is a mechanism to report and set the state or value of controls programmatically.
5. [ ] Authors can address multiple types of input hardware (keyboard, pointing device, touch screen, voice recognition, etc.), or the technology supports hardware-agnostic input methods.
6. [ ] User input does not require specific physical characteristics (e.g., fingerprint readers).
7. [ ] Authors can ensure a "meaningful" order of controls exists regardless of presentation.	

## If technology provides user interaction features
1. [ ] For every user interface object type, the "type" of object can be exposed as a role to accessibility APIs.
2. [ ] For every user interface object type, there is a clearly defined mechanism for authors to provide and / or user agents determines the "accessible name" for accessibility APIs.	
3. [ ] For user interface objects that can have states, properties, or values, authors can set these and these can be exposed to accessibility APIs.	
4. [ ] When providing imperative mechanisms to implement technology features (e.g., scripts), authors can expose accessibility information to accessibility APIs.
5. [ ] User can obtain help information about the widget.

## If technology defines document semantics
1. [ ] Authors can title Web pages.	
2. [ ] Authors can title sections of content.	
3. [ ] Authors can clearly indicate the target of a hyperlink and function of a control.
4. [ ] Authors can indicate content language, for the page as a whole and for blocks of content.	
5. [ ] Authors can support understanding of abbreviations / acronyms / initialisms, idioms, jargon, etc.
6. [ ] Authors can support correct machine pronunciation of ambiguously spelled terms (e.g., in the phrase "I am content with this content" there are different correct pronunciations of the lexeme "content").
7. [ ] Authors can identify regions of content, particularly the "main" region.	
8. [ ] Declarative mechanisms (that have accessibility semantics pre-defined in the spec) are used to implement technology features whenever possible.
9. [ ] There are unambiguous ways to express relationships between units of content, such as object nesting, ID referencing, etc.
10. [ ] Prefer structural semantics to presentational semantics.
11. [ ] When providing presentational semantics, they can be easily mapped to structural semantics, e.g., to support restyling or meaningful exposure to accessibility APIs.
12. [ ] Support a comprehensive set of authoring use cases to minimize the need for alternative content. (e.g., don't make authors resort to text in images to get the style they want).
13. [ ] Semantics allow precise and replicable location information in the document to be determined.
14. [ ] Semantics exist to convey meaning that is commonly conveyed via presentation.	

## If technology provides time-based visual media (see also the Media Accessibility Checklist)
1. [ ] It is possible for authors to provide detailed text descriptions, audio descriptions, or both of the important content in the media.
2. [ ] It is possible for authors to synchronize descriptions with the visual content.
3. [ ] It is possible for to provide descriptions even when the content is live.	
4. [ ] User can pause, stop, replay media.
5. [ ] Users can send output to alternate device.

## If technology provides audio
1. [ ] It is possible for authors to provide transcriptions.	
2. [ ] It is possible for authors to provide synchronized captions, either open (on by default for all users).
3. [ ] User can adjust volume level.	
4. [ ] Contrast between foreground and background audio is sufficient.
5. [ ] Unnecessary background audio can be muted separately from the foreground audio.
6. [ ] Technology does not include triggers for audiosensitive seizures or allows those triggers to be disabled.

## If technology allows time limits
1. [ ] A feature exists to allow time limits to be extended.
2. [ ] Time limits for different parts of a task, such as reading instructions vs providing input, can be set separately.

## If technology allows text content
1. [ ] Authors can define non-text alternatives for text content.
2. [ ] Authors can define non-text alternatives for non-text content.	

## If technology creates objects that don't have an inherent text representation
1. [ ] There is a mechanism to create short text alternatives that label the object.
2. [ ] There is a mechanism to create extended text alternatives for fallback content.
3. [ ] Text alternatives can be semantically "rich" e.g., with page structure, text style, hyperlinks, etc.

## If technology provides content fallback mechanisms, whether text or other formats
1. [ ] Authors can explicitly mark content as not needing alternative content because it does not perform an important role.	
2. [ ] Content can explicitly indicate when author declined to provide alternative content.	
3. [ ] Content can explicitly indicate that authoring tool is unable to generate or obtain alternative content.	
4. [ ] Authors can explicitly associate alternative content with the primary content.	
5. [ ] Authors can associate multiple types and instances of alternative content with primary content.
6. [ ] Alternate content can be easily found from the initial content.	

## If technology provides visual graphics
This is a developing area, being explored by the SVG Accessibility Task Force.	

## If technology provides internationalization support
1. [ ] Accessibility features can be internationalized to the same degree as other features.

## If technology defines accessible alternative features
1. [ ] Accessible alternatives themselves meet the same bar of accessibility.

## If technology provides content directly for end-users
1. [ ] Content can be encoded in a manner that allows machine transformation into accessible output.

## If technology defines an API
1. [ ] If the API can be used for structured content, it provides features to represent all aspects of the content including hidden accessibility features.
2. [ ] If the API relies on user agents to generate a user interface, the specification provides guidance about accessibility requirements needed to enable full interaction with the API.

## If technology defines a transmission protocol
1. [ ] Use of the protocol does not cause any aspect of the content, including metadata which could contain important accessibility information, to be removed.	
2. [ ] It is possible to use third-party accessibility enhancement services while using the protocol.	
