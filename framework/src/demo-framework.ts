
// expose the Npm "namespace"
import * as npm from "./npm/npm";
export { npm };

// expose the System "namespace"
import * as System from "./system/system";
export { System };

// Global Framework members

// This is our framework version
export const VERSION = "1.0.0";

export function getCurrentPackage() : npm.Package {
    return new npm.Package(__dirname + "/../");
}