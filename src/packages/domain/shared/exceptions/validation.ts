export default class ValidationException extends Error {
  public constructor(private target: string, private errors?: string[]) {
    super(errors?.join(', '));
  }
}
