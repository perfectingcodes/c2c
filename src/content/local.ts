/**
 * Local context helper.
 *
 * The site no longer builds a page per city — it is a home base, not a
 * long-tail SEO tree — but the coverage map and the service-area page still
 * describe each city's real coastal exposure, because it genuinely changes how
 * a roof and an AC system are specified and serviced on the Gulf Coast.
 *
 * Nothing here invents a claim: each entry restates a documented condition
 * from `Location.conditions`.
 */
import type { Location, SaltExposure } from "./site";

const SALT: Record<SaltExposure, { short: string; detail: string }> = {
  canal: {
    short: "canal-front salt exposure",
    detail:
      "Homes here sit close to brackish water, and salt in the air shortens the life of roof fasteners, flashing and condenser coils alike.",
  },
  gulf: {
    short: "gulf-front salt air",
    detail:
      "Salt carried in off the Gulf is hard on roofs and outdoor equipment, and the same humidity loads condensate systems harder than inland homes.",
  },
  inland: {
    short: "inland humidity rather than salt",
    detail:
      "Set back from open water, roofs and equipment here escape the worst of the salt corrosion — humidity, UV and storm wind are what wear things out.",
  },
};

export const saltNote = (loc: Location) => SALT[loc.conditions.salt];
