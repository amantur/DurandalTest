// postal.js (v1.0.11)
// A JavaScript implementation of the publish/subscribe pattern
// Copyright (c) 2011 Claudio Levinas
// MIT License (http://opensource.org/licenses/mit-license)
// https://github.com/clevinas/postal.js

var postal = {
    /// <summary>
    /// Singleton object to access the publish/subscribe functionality.
    /// </summary>
    subscribe: function (message, subscriber, callback, blocker) {
        /// <summary>
        /// Subscribe to a given message
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [string|number]</para>
        /// <para>      The message to subscribe to.</para>
        /// <para></para>
        /// <para>subscriber [object|number|string]</para>
        /// <para>      The id of the subscriber (use it to unsubscribe).</para>
        /// <para>      NOTE: If the subscriber is an object, then a parameter named [message]Id</para>
        /// <para>      or subscriberId must be defined in the subscriber object.</para>
        /// <para></para>
        /// <para>callback [nothing|function]</para>
        /// <para>      The callback function to subscribe to the message. The function is passed an</para>
        /// <para>      input data parameter and a caller parameter (if set). An output parameter can</para>
        /// <para>      be returned from the callback, which is collected and delivered to the caller.</para>
        /// <para>      NOTE: If the callback is not passed, the subscriber must be an object, and</para>
        /// <para>      must contain a function called [message] defining the callback.</para>
        /// <para></para>
        /// <para>blocker [nothing|function]</para>
        /// <para>      The blocker function to use to control the calling or blocking of the callback.</para>
        /// <para>      The function is passed an input data parameter and a caller parameter (if set).</para>
        /// <para>      It must return true to block the callback or false to allow it.</para>
        /// <para>      NOTE: If the blocker is not passed and the subscriber is an object containing</para>
        /// <para>      the function called _[message] then this function is used as the blocker.</para>
        /// </summary>
    },
    unsubscribe: function (message, subscriber) {
        /// <summary>
        /// Unsubscribe a callback or a message
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [nothing|string|number]</para>
        /// <para>      The message to unsubscribe to.</para>
        /// <para></para>
        /// <para>subscriber [nothing|object|number|string]</para>
        /// <para>      The id of the subscriber to unsubscribe.</para>
        /// <para></para>
        /// <para>NOTE: If the message and the subscriber are both defined, the subscriber will</para>
        /// <para>      be removed from the message. If the message is null or undefined, then the</para>
        /// <para>      subscriber will be removed from all messages it is subscribed to. If the</para>
        /// <para>      subscriber is null or undefined, the message itself will be removed.</para>
        /// </summary>
    },
    trigger: function (options) {
        /// <summary>
        /// Trigger the delivery of a message to all the subscribers
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>options [object]</para>
        /// <para>      The options object consisting of the following parameters:</para>
        /// <para></para>
        /// <para>options.method [string]</para>
        /// <para>      The method to use to deliver the messages (notify, publish or dispatch).</para>
        /// <para>      notify is synchronous, publish is asynchronous after a 'delay', and</para>
        /// <para>      dispatch is asynchronous by polling from a queue at fixed intervals.</para>
        /// <para></para>
        /// <para>options.message [string|number]</para>
        /// <para>      The message to notify.</para>
        /// <para></para>
        /// <para>options.data [nothing|anything]</para>
        /// <para>      The data to be passed to all the subscribers.</para>
        /// <para></para>
        /// <para>options.caller [nothing|object|function]</para>
        /// <para>      The caller object or a callback function to be passed to the subscribers.</para>
        /// <para></para>
        /// <para>options.delay [nothing|number]</para>
        /// <para>      Delay in milliseconds required to publish the message, when method is</para>
        /// <para>      'publish'.</para>
        /// <para></para>
        /// <para>options.timeout [nothing|number]</para>
        /// <para>      Timeout in milliseconds required to stop dispatch of the message, when</para>
        /// <para>      method is 'dispatch'.</para>
        /// <para></para>
        /// <para>options.oncomplete [nothing|function]</para>
        /// <para>      Callback function called when publish or dispatch complete processing.</para>
        /// <para>      The function receives a parameter 'replies' with all the collected returned</para>
        /// <para>      values from the message callbacks.</para>
        /// <para></para>
        /// <para>returns [nothing|anything]</para>
        /// <para>      If the method is 'notify', then callback functions can return an output</para>
        /// <para>      parameter each, which is collected and returned as an array to the caller.</para>
        /// <para>      For 'publish' or 'dispatch' methods, replies from callbacks are passed</para>
        /// <para>      to the oncomplete callback.</para>
        /// <para></para>
        /// <para>NOTE: 'this' in the subscribers callbacks will be automatically set to either the</para>
        /// <para>      subscriber itself (if it is an object), or to the current window object.</para>
        /// <para>NOTE: before every callback is called, a matching blocker function is called,</para>
        /// <para>      which (if defined) controls whether the given callback is actually called</para>
        /// <para>      or dropped.</para>
        /// </summary>
    },
    notify: function (message, data, caller) {
        /// <summary>
        /// Notify a message synchronously to all the subscribers
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [string|number]</para>
        /// <para>      The message to notify.</para>
        /// <para></para>
        /// <para>data [nothing|anything]</para>
        /// <para>      The data to be passed to all the subscribers.</para>
        /// <para></para>
        /// <para>caller [nothing|object|function]</para>
        /// <para>      The caller object or a callback function to be passed to the subscribers.</para>
        /// <para></para>
        /// <para>returns [nothing|anything]</para>
        /// <para>      The callback functions can return one output parameter each, which is</para>
        /// <para>      collected and returned as an array to the caller.</para>
        /// <para></para>
        /// <para>NOTE: 'this' in the subscribers callbacks will be automatically set to either the</para>
        /// <para>      subscriber itself (if it is an object), or to the current window object.</para>
        /// <para>NOTE: before every callback is called, a matching blocker function is called,</para>
        /// <para>      which (if defined) controls whether the given callback is actually called</para>
        /// <para>      or dropped.</para>
        /// </summary>
    },
    publish: function (message, data, caller, delay, oncomplete) {
        /// <summary>
        /// Publish a message asynchronously to all the subscribers
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [string|number]</para>
        /// <para>      The message to notify.</para>
        /// <para></para>
        /// <para>data [nothing|anything]</para>
        /// <para>      The data to be passed to all the subscribers.</para>
        /// <para></para>
        /// <para>caller [nothing|object|function]</para>
        /// <para>      The caller object or a callback function to be passed to the subscribers.</para>
        /// <para></para>
        /// <para>delay [nothing|number]</para>
        /// <para>      Delay in milliseconds required to publish the message.</para>
        /// <para></para>
        /// <para>oncomplete [nothing|function]</para>
        /// <para>      Callback function called when publish or dispatch complete processing.</para>
        /// <para>      The function receives a parameter 'replies' with all the collected returned</para>
        /// <para>      values from the message callbacks.</para>
        /// <para></para>
        /// <para>NOTE: 'this' in the subscribers callbacks will be automatically set to either the</para>
        /// <para>      subscriber itself (if it is an object), or to the current window object.</para>
        /// <para>NOTE: before every callback is called, a matching blocker function is called,</para>
        /// <para>      which (if defined) controls whether the given callback is actually called</para>
        /// <para>      or dropped.</para>
        /// </summary>
    },
    dispatch: function (message, data, caller, timeout, oncomplete) {
        /// <summary>
        /// Dispatch a message asynchronously via a polling queue to all the subscribers
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [string|number]</para>
        /// <para>      The message to notify.</para>
        /// <para></para>
        /// <para>data [nothing|anything]</para>
        /// <para>      The data to be passed to all the subscribers.</para>
        /// <para></para>
        /// <para>caller [nothing|object|function]</para>
        /// <para>      The caller object or a callback function to be passed to the subscribers.</para>
        /// <para></para>
        /// <para>timeout [nothing|number]</para>
        /// <para>      Timeout in milliseconds required to stop the dispatch of the message.</para>
        /// <para></para>
        /// <para>oncomplete [nothing|function]</para>
        /// <para>      Callback function called when publish or dispatch complete processing.</para>
        /// <para>      The function receives a parameter 'replies' with all the collected returned</para>
        /// <para>      values from the message callbacks.</para>
        /// <para></para>
        /// <para>NOTE: 'this' in the subscribers callbacks will be automatically set to either the</para>
        /// <para>      subscriber itself (if it is an object), or to the current window object.</para>
        /// <para>NOTE: before every callback is called, a matching blocker function is called,</para>
        /// <para>      which (if defined) controls whether the given callback is actually called</para>
        /// <para>      or dropped.</para>
        /// </summary>
    },
    startPoll: function (interval) {
        /// <summary>
        /// Start polling the queue to process dispatchable messages
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>interval [number]</para>
        /// <para>      The interval in milliseconds to poll the queue.</para>
        /// </summary>
    },
    stopPoll: function () {
        /// <summary>
        /// Stop polling the queue and clear all dispatchable messages remaining
        /// </summary>
    },
    exists: function (message) {
        /// <summary>
        /// Verify the existence of a given message
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [string|number]</para>
        /// <para>      The message to verify its existence.</para>
        /// </summary>
    },
    count: function (message) {
        /// <summary>
        /// Count the number of subscribers to a given message
        /// <para>---------------------------------------------------------------------------------</para>
        /// <para>message [string|number]</para>
        /// <para>      The message to count its subscribers.</para>
        /// </summary>
    },
    reset: function () {
        /// <summary>
        /// Remove all messages and subscribers
        /// </summary>
    }
};
