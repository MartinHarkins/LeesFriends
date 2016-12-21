import {Observable} from "rxjs";

export class RxUtils {
  private constructor() {
  }

  /**
   * Delay the output of a source observable
   * <p>
   *     This is to prevent events occurring too fast, causing glitch looking changes in the UI (too fast for human to see)
   * </p>
   * @param obs the source observable
   * @param minDuration the duration in milliseconds
   * @returns {Observable<T>} an observable emitting the same output as the source
   */
  public static ensureMinDuration<T>(obs: Observable<T>, minDuration: number): Observable<T> {
    return Observable.zip(obs, Observable.timer(minDuration))
      .map(vals => vals[0]);
  }
}
