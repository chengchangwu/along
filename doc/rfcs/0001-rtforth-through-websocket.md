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

因為 websocket 是個 async 的行為，除了 Redux 本身的文件，以下文件更清楚地說明了 Redux async 的作法。

http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout

依據此文件， async call 可以
* 直接在 components 中執行
* 在執行 connect 的 container 中定義，再由 components 執行。
* 在 actions/index.js 中定義，並接受一 dispatcher 做為參數。最後由 components 執行。此一作法因為統一由一 function 執行，因此可以配給每一個新建立的 action 一個 id，能用來處理更複雜的情況。使用 dispatcher 參數是為了要避免 store singleton，這使得同樣的程式可以用於 server side rendering。此一 function 不再是一個 action creater，因為它不會回傳 action，而是直接 dispatch。這使得它不能用於 connect。各一個缺點是不易區分哪些 action 是 synchrounous，哪些是 asynchrounous。
* 在更複雜的情形以可以使用 thunk middleware，避免前一作法要傳 dispatcher 帶來的因不是 action creater 而無法用於 connect 的情況。

參考文件中的分析，決定在 container 中定義。

* `WS_CONNECT`
* `WS_SET_URL`

A new component `Connection` should be designed for URL input and Websocket connection.
The websocket connection created is kept in the redux store.

Component `Repl` get the Websocket connection from the store, sends input to rtForth
only if the connection is open.

Store content:
    {
      connection: {
        url: "ws://127.0.0.1:3012",
        socket: null,
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
