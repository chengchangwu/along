- Feature Name: rtforth_through_websocket
- Start Date: 2016-03-06
- RFC PR: (leave this empty)
- Issue: (leave this empty)

# Summary
[summary]: #summary

Support rtForth through Websocket.

# Motivation
[motivation]: #motivation

Use rtForth as first example of Along. Should support the following
use cases:

* Connect to rtForth at a URL.
* REPL sends input to rtForth and prints its output.

# Detailed design
[design]: #detailed-design

Redux actions for connection:

* `WS_CONNECTING`
* `WS_OPEN`
* `WS_CLOSING`
* `WS_CLOSED`

Redux actions for communication:

* `WS_SENDING`
* `WS_RECEIVED`

A new component `Connection` should be designed for URL input and Websocket connection.
The websocket connection created is kept in the redux store.

Component `Repl` get the Websocket connection from the store, sends input to rtForth
only if the connection is open.

Store content:
    {
      connection: {
        url: "ws://127.0.0.1:3012",
        ws: null,
        status: 0 // 0 for idle; 1 for connecting, 2 for sending; 3 for received;
        message: "" // message sent or received
      }
    }

# Drawbacks
[drawbacks]: #drawbacks

Why should we *not* do this?

# Alternatives
[alternatives]: #alternatives

What other designs have been considered? What is the impact of not doing this?

# Unresolved questions
[unresolved]: #unresolved-questions

What parts of the design are still TBD?
