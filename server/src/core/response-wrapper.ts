import {Error} from "../common/error";

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

    static error<T>(error: Error): ResponseWrapper<T> {
        const responseWrapper = new ResponseWrapper<T>();
        responseWrapper.error = error;
        return responseWrapper;
    }

    public isSuccessful(): boolean {
        if (!this.error) return true;
    }
}