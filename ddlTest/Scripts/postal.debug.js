// postal.js (v1.0.11)
// A JavaScript implementation of the publish/subscribe pattern
// Copyright (c) 2011 Claudio Levinas
// MIT License (http://opensource.org/licenses/mit-license)
// https://github.com/clevinas/postal.js

/*global navigator, window */

/*
 *  Singleton object to access the publish/subscribe functionality.
 */
var postal = (function () {
    "use strict";
    /*
    *  Private members
    */
    var messages = [], queue = [], dispatcherId = 0, ie = getIEVersion();
    function getIEVersion() {
        var rv = -1;
        if (navigator.appName === "Microsoft Internet Explorer") {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            if (re.exec(ua) !== null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    }
    function sortAssocArray(input) {
        var temp = [], output = [], valA, valB, message, i;
        for (message in input) {
            if (input.hasOwnProperty(message)) {
                temp.push([message, input[message]]);
            }
        }
        // sort alphanumerically
        temp.sort();
        // NB: IE6-IE8 only sorts alphabetically
        if ((ie >= 6.0) && (ie <= 8.0)) {
            // sort numerically
            temp.sort(function (a, b) {
                valA = Number(a[0]);
                if (isNaN(valA)) {
                    return 0;
                }
                valB = Number(b[0]);
                if (isNaN(valB)) {
                    return 0;
                }
                return valA - valB;
            });
        }
        for (i = 0; i < temp.length; i += 1) {
            output[temp[i][0]] = temp[i][1];
        }
        return output;
    }
    function hasValue(value) {
        return ((value !== null) && (typeof value !== "undefined"));
    }
    function noValue(value) {
        return !hasValue(value);
    }
    function notNumber(value) {
        return (typeof value !== "number");
    }
    function notNumOrStr(value) {
        return ((typeof value !== "string") && (typeof value !== "number"));
    }
    function notObjNumOrStr(value) {
        return ((typeof value !== "object") && (typeof value !== "string") && (typeof value !== "number"));
    }
    function isObject(value) {
        return (typeof value === "object");
    }
    function notFunction(value) {
        return (typeof value !== "function");
    }
    function notObjOrFun(value) {
        return ((typeof value !== "object") && (typeof value !== "function"));
    }
    function publisher(message, data, caller, oncomplete) {
        var scope, replies;
        replies = postal.notify(message, data, caller);
        if (hasValue(oncomplete)) {
            scope = window;
            if (isObject(caller)) {
                scope = caller;
            }
            oncomplete.call(scope, replies);
        }
    }
    function dispatcher() {
        var data, block, currTime, replies, scope;
        data = queue.shift();
        if (hasValue(data)) {
            block = false;
            if (hasValue(data.timeout)) {
                currTime = new Date().getTime();
                block = currTime - data.timestamp > data.timeout;
            }
            if (!block) {
                replies = postal.notify(data.message, data.data, data.caller);
                if (hasValue(data.oncomplete)) {
                    scope = window;
                    if (isObject(data.caller)) {
                        scope = data.caller;
                    }
                    data.oncomplete.call(scope, replies);
                }
            }
        }
    }
    /*
    *  Public members
    */
    return {
        /*
        *  Subscribe to a given message
        *
        *  message [string|number]             - The message to subscribe to.
        *  subscriber [object|number|string]   - The id of the subscriber (use it to unsubscribe).
        *                                        NOTE: If the subscriber is an object, then a parameter named [message]Id 
        *                                        or subscriberId must be defined in the subscriber object.
        *  callback [nothing|function]         - The callback function to subscribe to the message. The function is passed an
        *                                        input data parameter and a caller parameter (if set). An output parameter can
        *                                        be returned from the callback, which is collected and delivered to the caller.
        *                                        NOTE: If the callback is not passed, the subscriber must be an object, and
        *                                        must contain a function called [message] defining the callback.
        *  blocker [nothing|function]          - The blocker function to use to control the calling or blocking of the callback.
        *                                        The function is passed an input data parameter and a caller parameter (if set).
        *                                        It must return true to block the callback or false to allow it. 
        *                                        NOTE: If the blocker is not passed and the subscriber is an object containing
        *                                        the function called _[message] then this function is used as the blocker.
        */
        subscribe: function (message, subscriber, callback, blocker) {
            var scope, id;
            if (noValue(message)) {
                throw new Error("You must provide a message to subscribe to.");
            }
            if (notNumOrStr(message)) {
                throw new Error("The message must be a string or a number.");
            }
            if (noValue(subscriber)) {
                throw new Error("You must provide a subscriber to the message.");
            }
            if (notObjNumOrStr(subscriber)) {
                throw new Error("The subscriber must be an object, a string or a number.");
            }
            if (hasValue(callback) || hasValue(subscriber[message])) {
                if (noValue(messages[message])) {
                    messages[message] = [];
                }
                id = subscriber[message + "Id"];
                if (noValue(id)) {
                    id = subscriber.subscriberId;
                    if (noValue(id)) {
                        id = subscriber;
                    }
                }
                if (notNumOrStr(id)) {
                    throw new Error("The id must be a number or a string.");
                }
                if (noValue(callback)) {
                    callback = subscriber[message];
                    if (noValue(callback)) {
                        throw new Error("You must provide a callback to subscribe to the message.");
                    }
                }
                if (notFunction(callback)) {
                    throw new Error("The callback must be a callable function.");
                }
                if (noValue(blocker)) {
                    blocker = subscriber["_" + message];
                }
                if (hasValue(blocker) && notFunction(blocker)) {
                    throw new Error("The blocker must be a callable function.");
                }
                scope = null;
                if (isObject(subscriber)) {
                    // Set 'this' in the callback to be the subscriber object.
                    scope = subscriber;
                }
                // Overwrite the id if it already exists (allows for updating).
                messages[message][id] = { callback: callback, blocker: blocker, scope: scope };
                // Keep subscribers to messages sorted by id.
                messages[message] = sortAssocArray(messages[message]);
            }
            else {
                throw new Error("You must provide a callback to subscribe to the message.");
            }
        },
        /*
        *  Unsubscribe a callback or a message
        *
        *  message [nothing|string|number]             - The message to unsubscribe to.
        *  subscriber [nothing|object|number|string]   - The id of the subscriber to unsubscribe.
        *
        *  NOTE: If the message and the subscriber are both defined, the subscriber will be removed
        *        from the message. If the message is null or undefined, then the subscriber will be 
        *        removed from all messages it is subscribed to. If the subscriber is null or undefined, 
        *        the message itself will be removed.
        */
        unsubscribe: function (message, subscriber) {
            var id, messageId, m;
            if (hasValue(message)) {
                if (notNumOrStr(message)) {
                    throw new Error("The message must be a string or a number.");
                }
                if (hasValue(messages[message])) {
                    if (hasValue(subscriber)) {
                        if (notObjNumOrStr(subscriber)) {
                            throw new Error("The subscriber must be an object, a string or a number.");
                        }
                        id = subscriber[message + "Id"];
                        if (noValue(id)) {
                            id = subscriber.subscriberId;
                            if (noValue(id)) {
                                id = subscriber;
                            }
                        }
                        if (notNumOrStr(id)) {
                            throw new Error("The id must be a number or a string.");
                        }
                        // If the subscriber is not subscribed, do nothing.
                        delete messages[message][id];
                        if (messages[message].length === 0) {
                            delete messages[message];
                        }
                    }
                    else {
                        // Remove all the subscribers from the message, and delete the message.
                        delete messages[message];
                    }
                }
            }
            else if (hasValue(subscriber)) {
                if (notObjNumOrStr(subscriber)) {
                    throw new Error("The subscriber must be an object, a string or a number.");
                }
                id = subscriber.subscriberId;
                if (noValue(id)) {
                    id = subscriber;
                }
                for (m in messages) {
                    // Attempt to get a [message]Id (it takes precedence).
                    if (messages.hasOwnProperty(m)) {
                        messageId = subscriber[m + 'Id'];
                        if (hasValue(messageId)) {
                            id = messageId;
                        }
                        if (notNumOrStr(id)) {
                            throw new Error("The id must be a number or a string.");
                        }
                        delete messages[m][id];
                        if (messages[m].length === 0) {
                            delete messages[m];
                        }
                    }
                }
            }
            else {
                throw new Error("You must provide a message or subscriber to unsubscribe.");
            }
        },
        /*
        *  Trigger the delivery of a message to all the subscribers
        *
        *  options [object]                           - The options object consisting of the following parameters:
        *
        *  options.method [string]                    - The method to use to deliver the messages (notify, publish or
        *                                               dispatch). notify is synchronous, publish is asynchronous after a 
        *                                               'delay', and dispatch is asynchronous by polling from a queue at
        *                                               fixed intervals.
        *  options.message [string|number]            - The message to notify.
        *  options.data [nothing|anything]            - The data to be passed to all the subscribers.
        *  options.caller [nothing|object|function]   - The caller object or a callback function to be passed to the
        *                                               subscribers.
        *  options.delay [nothing|number]             - Delay in milliseconds required to publish the message, when method 
        *                                               is 'publish'.
        *  options.timeout [nothing|number]           - Timeout in milliseconds required to stop dispatch of the message, 
        *                                                when method is 'dispatch'.
        *  options.oncomplete [nothing|function]      - Callback function called when publish or dispatch complete processing.
        *                                               The function receives a parameter 'replies' with all the collected
        *                                               returned values from the message callbacks.
        *
        *  returns [nothing|anything]                 - If the method is 'notify', then callback functions can return an 
        *                                               output parameter each, which is collected and returned as an array
        *                                               to the caller. For 'publish' or 'dispatch' methods, replies from 
        *                                               callbacks are passed to the oncomplete callback.
        *
        *  NOTE: 'this' in the subscribers callbacks will be automatically set to either the subscriber itself (if it is an
        *        object), or to the current window object.
        *  NOTE: before every callback is called, a matching blocker function is called, which (if defined) controls whether
        *        the given callback is actually called or dropped.
        */
        trigger: function (options) {
            if (noValue(options)) {
                throw new Error("You must provide an options object to trigger.");
            }
            if (noValue(options.method)) {
                throw new Error("You must provide a method to deliver the message.");
            }
            switch (options.method) {
                case "notify":
                    return this.notify(options.message, options.data, options.caller);
                case "publish":
                    this.publish(options.message, options.data, options.caller, options.delay, options.oncomplete);
                    break;
                case "dispatch":
                    this.dispatch(options.message, options.data, options.caller, options.timeout, options.oncomplete);
                    break;
                default:
                    throw new Error("The method provided does not exist.");
            }
        },
        /*
        *  Notify a message synchronously to all the subscribers
        *
        *  message [string|number]            - The message to notify.
        *  data [nothing|anything]            - The data to be passed to all the subscribers.
        *  caller [nothing|object|function]   - The caller object or a callback function to be passed to the subscribers.
        *
        *  returns [nothing|anything]         - The callback functions can return one output parameter each, which is 
        *                                       collected and returned as an array to the caller.
        *
        *  NOTE: 'this' in the subscribers callbacks will be automatically set to either the subscriber itself (if it is an
        *        object), or to the current window object.
        *  NOTE: before every callback is called, a matching blocker function is called, which (if defined) controls whether
        *        the given callback is actually called or dropped.
        */
        notify: function (message, data, caller) {
            var replies = [], subscribers, id, callback, blocker, scope, block, reply;
            if (noValue(message)) {
                throw new Error("You must provide a message to deliver.");
            }
            if (notNumOrStr(message)) {
                throw new Error("The message must be a string or a number.");
            }
            if (hasValue(caller) && notObjOrFun(caller)) {
                throw new Error("The caller must be an object or a function.");
            }
            subscribers = messages[message];
            for (id in subscribers) {
                if (subscribers.hasOwnProperty(id)) {
                    callback = subscribers[id].callback;
                    blocker = subscribers[id].blocker;
                    scope = subscribers[id].scope || window;
                    block = false;
                    if (hasValue(blocker)) {
                        block = blocker.call(scope, data, caller);
                    }
                    if (!block) {
                        reply = callback.call(scope, data, caller);
                        if (hasValue(reply)) {
                            replies.push(reply);
                        }
                    }
                }
            }
            return replies;
        },
        /*
        *  Publish a message asynchronously to all the subscribers
        *
        *  message [string|number]            - The message to notify.
        *  data [nothing|anything]            - The data to be passed to all the subscribers.
        *  caller [nothing|object|function]   - The caller object or a callback function to be passed to the subscribers.
        *  delay [nothing|number]             - Delay in milliseconds required to publish the message.
        *  oncomplete [nothing|function]      - Callback function called when publish or dispatch complete processing. The
        *                                       function receives a parameter 'replies' with all the collected returned
        *                                       values from the message callbacks.
        *
        *  NOTE: 'this' in the subscribers callbacks will be automatically set to either the subscriber itself (if it is an
        *        object), or to the current window object.
        *  NOTE: before every callback is called, a matching blocker function is called, which (if defined) controls whether
        *        the given callback is actually called or dropped.
        */
        publish: function (message, data, caller, delay, oncomplete) {
            if (hasValue(delay)) {
                if (notNumber(delay)) {
                    throw new Error("The delay must be a number.");
                }
            }
            else {
                delay = 500; // default is half a second
            }
            if (hasValue(oncomplete) && notFunction(oncomplete)) {
                throw new Error("The oncomplete callback must be a callable function.");
            }
            window.setTimeout(function () { publisher(message, data, caller, oncomplete); }, delay);
        },
        /*
        *  Dispatch a message asynchronously via a polling queue to all the subscribers
        *
        *  message [string|number]            - The message to notify.
        *  data [nothing|anything]            - The data to be passed to all the subscribers.
        *  caller [nothing|object|function]   - The caller object or a callback function to be passed to the subscribers.
        *  timeout [nothing|number]           - Timeout in milliseconds required to stop the dispatch of the message.
        *  oncomplete [nothing|function]      - Callback function called when publish or dispatch complete processing. The
        *                                       function receives a parameter 'replies' with all the collected returned
        *                                       values from the message callbacks.
        *
        *  NOTE: 'this' in the subscribers callbacks will be automatically set to either the subscriber itself (if it is an
        *        object), or to the current window object.
        *  NOTE: before every callback is called, a matching blocker function is called, which (if defined) controls whether
        *        the given callback is actually called or dropped.
        */
        dispatch: function (message, data, caller, timeout, oncomplete) {
            var timestamp;
            if (hasValue(timeout) && notNumber(timeout)) {
                throw new Error("The timeout must be a number.");
            }
            if (hasValue(oncomplete) && notFunction(oncomplete)) {
                throw new Error("The oncomplete callback must be a callable function.");
            }
            timestamp = new Date().getTime();
            queue.push({ message: message, data: data, caller: caller, timestamp: timestamp, timeout: timeout, oncomplete: oncomplete });
            if (dispatcherId === 0) {
                this.startPoll();
            }
        },
        /*
        *  Start polling the queue to process dispatchable messages
        *
        *  interval [number]   - The interval in milliseconds to poll the queue.
        */
        startPoll: function (interval) {
            if (hasValue(interval)) {
                if (notNumber(interval)) {
                    throw new Error("The interval must be a number.");
                }
            }
            else {
                interval = 1000; // default is one second
            }
            if (dispatcherId !== 0) {
                this.stopPoll();
            }
            dispatcherId = window.setInterval(function () { dispatcher(); }, interval);
        },
        /*
        *  Stop polling the queue and clear all dispatchable messages remaining
        */
        stopPoll: function () {
            if (dispatcherId > 0) {
                window.clearInterval(dispatcherId);
                dispatcherId = 0;
                // Clear all messages in the queue
                queue = [];
            }
        },
        /*
        *  Verify the existence of a given message
        *
        *  message [string|number]   - The message to verify its existence.
        */
        exists: function (message) {
            if (noValue(message)) {
                throw new Error("You must provide a message to verify its existence.");
            }
            if (notNumOrStr(message)) {
                throw new Error("The message must be a string or a number.");
            }
            return (hasValue(messages[message]));
        },
        /*
        *  Count the number of subscribers to a given message
        *
        *  message [string|number]   - The message to count its subscribers.
        */
        count: function (message) {
            var count, i;
            if (noValue(message)) {
                throw new Error("You must provide a message to count its subscribers.");
            }
            if (notNumOrStr(message)) {
                throw new Error("The message must be a string or a number.");
            }
            count = 0;
            for (i = 0; i < messages[message].length; i += 1) {
                if (hasValue(messages[message][i])) {
                    count += 1;
                }
            }
            return count;
        },
        /*
        *  Remove all messages and subscribers
        */
        reset: function () {
            messages = [];
            queue = [];
        }
    };
} ());
