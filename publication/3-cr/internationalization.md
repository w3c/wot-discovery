# Results of localization self-review for Web of Things (WoT) Discovery

Answers to short i18n review checklist [(from here)](http://w3c.github.io/i18n-activity/reviews/shortchecklist).

1. [x] _If the spec (or its implementation) contains any natural language text that will be read by a human (this includes error messages or other UI text, JSON strings, etc, etc),_

    * Error details are related using Problem Details format (RFC7807) but in general error types are indicated with codes.
    * We depend on the mapping from the error codes and the internationalization capabilities of RFC7807.
    * Potential issues with text in errors are marked with i18n-tracker in the wot-discovery repository.
    * A directory can also return TDs or TD fragments as the result of a query and TDs can contain natural language, but we
       cover issues related to internationalization within TDs in the TD 1.1 specification (also under review).
    * One issue is that TD fragments may not retain the context, such as the default language.  However this can be resolved
       by issuing queries that also fetch the context from the source TD.
    
2. [ ] _If the spec (or its implementation) allows content authors to produce typographically appealing text, either in its own right, or in association with graphics._

    Not applicable.

3. [ ] _If the spec (or its implementation) allows the user to point into text, creates text fragments, concatenates text, allows the user to select or step through text (using a cursor or other methods), etc._

    Not applicable.

    There is a mechanism to page through results but this is for entire JSON-LD TDs, not text.

4. [ ] _If the spec (or its implementation) allows searching or matching of text, including syntax and identifiers_

    * Various query mechanisms are supported, including JSON Path, XML Path, and SPARQL; these in turn support string comparisons and matching.
    * We depend on mechanisms in those query standards to support internationalization.

5. [x] _If the spec (or its implementation) sorts text_

    * Discovery results can be sorted, either by id or based on a specified field.
    * Sorting order is based on UTF-8 lexicographical order

6. [ ] _If the spec (or its implementation) captures user input_

    Not applicable.

7. [x] _If the spec (or its implementation) deals with time in any way that will be read by humans and/or crosses time zone boundaries_

    * Time is used, but requires ISO standard Zulu time and use of the [dateTime](https://www.w3.org/TR/2012/REC-xmlschema11-2-20120405/#dateTime) format.

8. [ ] _If the spec (or its implementation) allows any character encoding other than UTF-8._

    * UTF-8 is required generally for text and JSON content that may include text.

9. [ ] _If the spec (or its implementation) defines markup._

    Not applicable.

10. [x] _If the spec (or its implementation) deals with names, addresses, time & date formats, etc_

    Only dateTime is used, as noted above.

11. [ ] _If the spec (or its implementation) describes a format or data that is likely to need localization._

    * The TD data returned is defined in separate document where localization issues are addressed.
    * Enriched TDs are defined by the current specification that add some metadata relating to time, but
       the localization issues are addressed as noted above through the use of dateTime.

12. [ ] _If the spec (or its implementation) makes any reference to or relies on any cultural norms_

    Not applicable.
    
    Scans for sensitive terms, e.g. in the TDD API definition, will be done as part of the publication process.
