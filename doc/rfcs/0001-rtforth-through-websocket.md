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

* WsConnecting
* WsOpen
* WsClosing
* WsClosed

Redux actions for communication:

* WsSending
* WsReceived

A new component WsURL for URL input and Websocket connection should be designed.
The websocket connection created is kept in redux store.

Component Repl get the Websocket connection from the store, sends input to rtForth
only if the connection is open.

Store content:
    {
      connection: {
        url: "127.0.0.1:3012",
        ws: null,
        status: 0 // 0 for idle; 1 for Sending; 2 for Received;
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
