# React Native Intermittent Network Request Failure

This repository demonstrates a bug where a fetch API call in React Native intermittently fails with a 'Network request failed' error, even when the API and network are functioning correctly.  The issue is inconsistent; sometimes the request works fine, other times it fails.  The solution involves implementing robust error handling and retry logic.

## Problem

The provided `bug.js` file shows a component making a fetch call to an external API. The call will sometimes succeed and display data, while other times it will throw a 'Network request failed' error without any clear cause.

## Solution

The `bugSolution.js` file demonstrates a solution that incorporates the following:

* **Exponential Backoff Retry Strategy:** Retries the request multiple times with increasing delays between attempts to handle temporary network glitches.
* **Improved Error Handling:** Provides more specific error handling that distinguishes between network errors, server errors, and other issues.
* **Clearer Error Messages:** Displays more user-friendly error messages to the user.
