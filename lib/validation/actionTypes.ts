/**
 * Type for actions that have an ID
 */
export type ActionWithId = {
  id: number;
};

/**
 * Type guard to check if an action has an ID
 */
export function isActionWithId(input: unknown): input is ActionWithId {
  return typeof input === 'object' && input !== null && 'id' in input && typeof (input as ActionWithId).id === 'number';
}

/**
 * Type for actions that have a hospital ID
 */
export type ActionWithHospitalId = {
  hospital_id: number;
};

/**
 * Type guard to check if an action has a hospital ID
 */
export function isActionWithHospitalId(input: unknown): input is ActionWithHospitalId {
  return (
    typeof input === 'object' &&
    input !== null &&
    'hospital_id' in input &&
    typeof (input as ActionWithHospitalId).hospital_id === 'number'
  );
}
