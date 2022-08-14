/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull firebase-functions'
 *
 * Required dependencies: @amplitude/node@^1.10.0
 * Tracking Plan Version: 5
 * Build: 1.0.0
 * Runtime: node.js:typescript-ampli
 *
 * [View Tracking Plan](https://data.amplitude.com/strift/Sulfuron%20Guilds/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/strift/Sulfuron%20Guilds/implementation/firebase-functions)
 */

import { Identify as AmplitudeIdentify } from '@amplitude/identify';
import { init as initNodeClient, NodeClient, Response, Status } from '@amplitude/node';
import {
  BaseEvent, Event, EventOptions, GroupOptions, IdentifyEvent, IdentifyOptions, Options, MiddlewareExtra,
} from '@amplitude/types';

export type Environment = 'development' | 'production';

export const ApiKey: Record<Environment, string> = {
  development: '',
  production: 'ccd672a208e44643d6dbb610b3fb9f16'
};

/**
* Default NodeClient Options. Contains tracking plan information.
*/
export const DefaultOptions: Partial<Options> = {
  plan: {
    version: '5',
    branch: 'main',
    source: 'firebase-functions',
    versionId: 'e78e8dfc-e22d-4be9-aa7c-ca8d46311c99'
  }
};

export interface LoadOptions {
  environment?: Environment;
  disabled?: boolean;
  client?: {
    apiKey?: string;
    options?: Partial<Options>;
    instance?: NodeClient;
  }
}

export interface IdentifyProperties {
  /**
   * Date of user sign up
   */
  signUpDate?: string;
}

export class Identify implements BaseEvent {
  event_type = 'Identify';

  constructor(
    public event_properties?: IdentifyProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class Group implements BaseEvent {
  event_type = 'Group';
}

export class SignIn implements BaseEvent {
  event_type = 'SignIn';
}

export class SignUp implements BaseEvent {
  event_type = 'SignUp';
}

const getDefaultPromiseResponse = () => Promise.resolve<Response>({
  status: Status.Skipped,
  statusCode: 200,
});

function getIdentifyEvent(amplitudeIdentify: AmplitudeIdentify, userId?: string, deviceId?: string): IdentifyEvent {
  const identifyEvent = amplitudeIdentify.identifyUser('tmp-user-id-to-pass-validation');
  identifyEvent.user_id = userId;
  identifyEvent.device_id = deviceId;

  return identifyEvent;
}

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude: NodeClient | undefined;

  get client(): NodeClient {
    this.isInitializedAndEnabled();
    return this.amplitude!;
  }

  get isLoaded(): boolean {
    return this.amplitude != null;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.isLoaded) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options?: LoadOptions): void {
    this.disabled = options?.disabled ?? false;

    if (this.isLoaded) {
      console.warn('WARNING: Ampli is already initialized. Ampli.load() should be called once at application startup.');
      return;
    }

    const env = options?.environment ?? 'development';
    const apiKey = options?.client?.apiKey || ApiKey[env];
    if (options?.client?.instance) {
      this.amplitude = options?.client?.instance;
    } else if (apiKey) {
      this.amplitude = initNodeClient(apiKey, { ...DefaultOptions, ...options?.client?.options });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }
  }

  identify(
    userId: string | undefined,
    properties?: IdentifyProperties,
    options?: IdentifyOptions,
    extra?: MiddlewareExtra,
  ) {
    const identify = new AmplitudeIdentify();
    const eventProperties = properties;
    if (eventProperties != null) {
      for (const [key, value] of Object.entries(eventProperties)) {
        if (value !== undefined) {
          identify.set(key, value);
        }
      }
    }
    const identifyEvent = getIdentifyEvent(identify, userId || options?.user_id, options?.device_id);
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...identifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  setGroup(
    userId: string | undefined,
    name: string,
    value: string,
    options?: GroupOptions,
    extra?: MiddlewareExtra,
  ) {
    const identify = new AmplitudeIdentify().setGroup(name, value);
    const identifyEvent = getIdentifyEvent(identify, userId || options?.user_id, options?.device_id);
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...identifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  groupIdentify(
    groupType: string,
    groupName: string,
    options?: GroupOptions,
    extra?: MiddlewareExtra,
  ) {
    const identify = new AmplitudeIdentify();
    const groupIdentifyEvent = identify.identifyGroup(groupType, groupName);

    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...groupIdentifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  track(userId: string | undefined, event: Event, options?: EventOptions, extra?: MiddlewareExtra) {
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...event,  user_id: userId }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  flush() {
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.flush()
      : getDefaultPromiseResponse();

    return { promise };
  }

  /**
   * SignIn
   *
   * [View in Tracking Plan](https://data.amplitude.com/strift/Sulfuron%20Guilds/events/main/latest/SignIn)
   *
   * A user sign in
   *
   * Owner: Laurent Cazanove
   *
   * @param userId The user's ID.
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  signIn(
    userId: string | undefined,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new SignIn(), options, extra);
  }

  /**
   * SignUp
   *
   * [View in Tracking Plan](https://data.amplitude.com/strift/Sulfuron%20Guilds/events/main/latest/SignUp)
   *
   * A user sign up
   *
   * Owner: Laurent Cazanove
   *
   * @param userId The user's ID.
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  signUp(
    userId: string | undefined,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new SignUp(), options, extra);
  }
}

/**
 * Export 'ampli' the default instance of Ampli.
 *
 * More instances can be created with 'const a = new Ampli()'
 */
export const ampli = new Ampli();
