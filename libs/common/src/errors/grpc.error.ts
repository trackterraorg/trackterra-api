import { ServiceError as GrpcServiceError } from 'grpc';

// Copied from apollo-server-errors
export class ServiceError extends Error implements GrpcServiceError {
  public extensions: Record<string, any>;
  readonly name;
  readonly locations;
  readonly path;
  readonly source;
  readonly positions;
  readonly nodes;
  public originalError;

  [key: string]: any;

  constructor(
    message: string,
    code?: string,
    extensions?: Record<string, any>,
  ) {
    super(message);
    if (extensions) {
      Object.keys(extensions)
        .filter((keyName) => keyName !== 'message' && keyName !== 'extensions')
        .forEach((key) => {
          this[key] = extensions[key];
        });
    }

    if (!this.name) {
      Object.defineProperty(this, 'name', { value: 'ServiceError' });
    }

    this.extensions = { ...extensions, code };
  }
}
