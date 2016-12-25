import {Error} from "../common/error";

/**
 * A wrapper for responses returned in an observable
 *
 * Errors thrown in a node callback aren't caught by the observable.
 * This means the app crashes when there are errors, while it should not.
 *
 * We're using a wrapper to return a package containing either the response or the error.
 *
 * This also follows RxJava best practices where only critical errors should result in an error for the subscriber.
 *
 */
export class ResponseWrapper<T> {
    public response: T;
    public error: Error;

    private constructor() {

    }

    static success<T>(response: T): ResponseWrapper<T> {
        const responseWrapper = new ResponseWrapper<T>();
        responseWrapper.response = response;
        return responseWrapper;
    }

    static successNoResult(): ResponseWrapper<void> {
        return new ResponseWrapper<void>();
    }

    static error<T>(error: Error): ResponseWrapper<T> {
        const responseWrapper = new ResponseWrapper<T>();
        responseWrapper.error = error;
        return responseWrapper;
    }

    public isSuccessful(): boolean {
        if (!this.error) return true;
    }
}